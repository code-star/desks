Run locally:

```
ts-node index.ts
```

Build Docker image:

```
docker build -t desks-db .
```

Run Docker container:

```
docker run -it --init --rm --name desks-api -p 3001:3001 -v $(pwd)/docker_db/:/home/node/code/db/ desks-db
curl http://localhost:3001/api/desk/1
```

Deploy to Azure:

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
docker run --name desks-api --domainname ordina-smartdesk-api -p 3001:3001 -v sacloudstudyfe/mve-volume:/home/node/code/db/ codestarcloudstudyfe.azurecr.io/desks-db:v1 # volume is missing
# When "run" fails, try restarting with: docker start desks-api
docker ps -a
curl http://ordina-smartdesk-api.westeurope.azurecontainer.io:3001/api/desk/1
```