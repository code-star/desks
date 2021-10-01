#!/usr/bin/env bash

ACI_RESOURCE_GROUP=rg-CloudStudyFe
CONTAINER_IMAGE=codestarcloudstudyfe.azurecr.io/hello-world-backend:v1
CONTAINER_NAME=happy-hawkings
STORAGE_ACCOUNT=sacloudstudyfe
SHARE_NAME=fileshare-cloudstudyfepersistentvolume

STORAGE_ACCESS_KEY=$(az storage account keys list --resource-group $ACI_RESOURCE_GROUP --account-name $STORAGE_ACCOUNT --query "[0].value" --output tsv)

az container create \
  --resource-group $ACI_RESOURCE_GROUP \
  --name $CONTAINER_NAME \
  --image $CONTAINER_IMAGE \
  --dns-name-label $CONTAINER_NAME \
  --ports 3001 \
  --azure-file-volume-account-name $STORAGE_ACCOUNT \
  --azure-file-volume-account-key $STORAGE_STORAGE_ACCESS_KEY \
  --azure-file-volume-share-name $SHARE_NAME \
  --azure-file-volume-mount-path /home/node/code/localStore
