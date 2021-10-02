#!/usr/bin/env bash

echo "If az commands fail, make sure you have upgraded to the latest version. (use 'az upgrade' to upgrade)"

ACI_RESOURCE_GROUP=rg-CloudStudyFe
ACI_REGISTRY=codestarcloudstudyfe
CONTAINER_IMAGE=$ACI_REGISTRY.azurecr.io/desks-api:v3
CONTAINER_NAME=raging-rhino
STORAGE_ACCOUNT=sacloudstudyfe
SHARE_NAME=fileshare-cloudstudyfepersistentvolume

echo "Fetching storage access key..."
STORAGE_ACCESS_KEY=$(az storage account keys list --resource-group $ACI_RESOURCE_GROUP --account-name $STORAGE_ACCOUNT --query "[0].value" --output tsv)

echo "Fetching current user identity..."
CURRENT_USER_IDENTITY=$(az account show --query "id" -o tsv)
# According to the docs, one should be able to use --acr-identity in the az container create command, but it fails using version 2.28.0

echo "Fetching ACR access details..."
ACR_USER=$(az acr credential show --name $ACI_REGISTRY --query "username" -o tsv)
ACR_PASS=$(az acr credential show --name $ACI_REGISTRY --query "passwords[0].value" -o tsv)

echo "Creating container $CONTAINER_NAME..."
az container create \
  --resource-group $ACI_RESOURCE_GROUP \
  --name $CONTAINER_NAME \
  --image $CONTAINER_IMAGE \
  --dns-name-label $CONTAINER_NAME \
  --ports 3001 \
  --azure-file-volume-account-name $STORAGE_ACCOUNT \
  --azure-file-volume-account-key $STORAGE_ACCESS_KEY \
  --azure-file-volume-share-name $SHARE_NAME \
  --azure-file-volume-mount-path /home/node/code/localStore \
  --environment-variables WEBSITES_ENABLE_APP_SERVICE_STORAGE=TRUE \
  --registry-password $ACR_PASS \
  --registry-username $ACR_USER

echo "Done."