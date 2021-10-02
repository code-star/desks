from the api folder:

docker build -t desks-api .
docker run --init --publish 3001:3001 desks-api
docker run --init --publish 3001:3001 --mount type=bind,source="$(pwd)"/localStore,target=/home/node/code/localStore desks-api

# Publishing to Azure
* from your default docker context, in the api folder:

    docker build . -t codestarcloudstudyfe.azurecr.io/desks-api:vN (or :latest)
    docker push codestarcloudstudyfe.azurecr.io/desks-api:vN (or :latest)

* from the root project folder (make sure you update the container image name in the script:

    ./create-azure-container.sh
