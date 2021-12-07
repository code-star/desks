# Run locally

```
npm i
npm start
```

# Docker

Build Docker image:

```
docker build -t codestar/smartdesk-api .
```

Run Docker container:

```
docker run -it --init --rm --name smartdesk-api -p 3001:3001 -v $(pwd)/db/:/home/node/code/db/ codestar/smartdesk-api
curl http://localhost:3001/api/desk/b2.1
```

# TODO

* caddy/ssl
* manually test integration front-end and back-end
* fix volume(mount)
* alpine 
* multi stage build(?)

# Create local certificates

* brew install certbot
* brew install -dns_azure
* certbot certonly --manual --preferred-challenges http
* certbot certonly \
  --dns-azure-config ~/.secrets/certbot/azure.ini \
  -d ordina-smartdesk.westeurope.azurecontainer.io
* `cat ??? | base64` and copy to deploy-aci.yml

# Deploy to Azure

```
# build
docker build -t codestar/smartdesk-api .

# login
az login --tenant ??? # id from Azure Active Directory 

# publish to registry
az acr login --name codestarsmartdesk.azurecr.io
docker context use default
docker tag codestar/smartdesk-api codestarsmartdesk.azurecr.io/smartdesk-api:v1
docker push codestarsmartdesk.azurecr.io/smartdesk-api:v1

# get storageAccountKey, use "value" in next steps as STORAGE_ACCOUNT_KEY 
az storage account keys list \
  --resource-group rg-SmartDesk \
  --account-name sasmartdesk

# retrieve registry credentials, use in the next step as ACR_PASSWORD
az acr credential show --name codestarsmartdesk

# remove old containers
az container delete --name smartdesk-api-with-ssl --resource-group rg-SmartDesk

# deploy
STORAGE_ACCOUNT_KEY=??? ACR_PASSWORD=??? envsubst < deploy-aci.yml > deploy-aci-temp.yml && az container create \
    --resource-group rg-SmartDesk \
    --file deploy-aci-temp.yml

rm deploy-aci-temp.yml
az container show --name smartdesk-api-with-ssl --resource-group rg-SmartDesk

# smoke test
# -k is to allow self signed certificates
curl -k https://ordina-smartdesk.westeurope.azurecontainer.io/api/desk/b2.1

# integrated test
# open in browser: https://code-star.github.io/desks/checkin/?b2.1
```

Note: https://docs.microsoft.com/en-us/azure/container-instances/container-instances-reference-yaml

# OLD Deploy to Azure:

See 

* https://docs.docker.com/cloud/aci-integration/
* https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-portal#push-image-to-registry
* https://docs.microsoft.com/en-us/azure/storage/files/storage-how-to-create-file-share?tabs=azure-portal

```bash
az acr login --name codestarcloudstudyfe.azurecr.io
docker context use default
docker tag desks-db codestarcloudstudyfe.azurecr.io/desks-db:v1
docker push codestarcloudstudyfe.azurecr.io/desks-db:v1

docker context use cloudstudyAciContext
docker login azure --tenant-id ??? # id from Azure Active Directory
# Db creation should occur automatically on init, but it leads to this error "Error: SQLITE_BUSY: database is locked", because multiple threads are spawned or something
# * delete myDb.db from mve-volume if it was already created
# * manually upload existing local myDb.db to mve-volume
docker run --name desks-api --domainname ordina-smartdesk-api -p 3001:3001 -v sacloudstudyfe/mve-volume:/home/node/code/db/ codestarcloudstudyfe.azurecr.io/desks-db:v1 
docker ps -a
curl http://ordina-smartdesk-api.westeurope.azurecontainer.io:3001/api/desk/1
```
