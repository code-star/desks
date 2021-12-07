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
docker run -it --init --rm --name smartdesk-api -p 3001:3001 -v $(pwd)/database.db:/home/node/code/database.db codestar/smartdesk-api
curl http://localhost:3001/api/desk/1
```

# TODO

* caddy/ssl
* manually test integration front-end and back-end
* alpine 
* multi stage

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

# deploy
az container create --resource-group rg-SmartDesk --file deploy-aci.yml
```

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
