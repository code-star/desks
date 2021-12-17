# Smart Desk API

[![Deploy API to Azure Webapp](https://github.com/code-star/desks/actions/workflows/deployApi.yml/badge.svg)](https://github.com/code-star/desks/actions/workflows/deployApi.yml)

## Run locally

```
npm i
npm start
```

## Deploy as Azure Web App

```
npm run build
az login --tenant ??? # id from Azure Active Directory
# az webapp up --sku F1 --name ordina-smartdesk-api --resource-group rg-SmartDesk --location westeurope
az webapp up

# smoke test
az webapp log tail
https://ordina-smartdesk-api.azurewebsites.net/api/desk/b2.1

```

Source: https://docs.microsoft.com/en-us/azure/app-service/quickstart-nodejs?tabs=linux&pivots=development-environment-cli#create-your-nodejs-application

Note: the database is not persistent, because the filesystem on Azure Webapps is not writable! If it would be, it is valuable to know that the /home dir is persistent.

### Docker (unused)

Build Docker image:

```
docker build -t codestar/smartdesk-api .
```

Run Docker container:

```
docker run -it --init --rm --name smartdesk-api -p 3001:3001 -v $(pwd)/db/:/home/node/code/db/ codestar/smartdesk-api
curl http://localhost:3001/api/desk/b2.1
```
