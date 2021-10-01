docker build -t desks-api .
docker run --init --publish 3001:3001 desks-api
docker run --init --publish 3001:3001 --mount type=bind,source="$(pwd)"/localStore,target=/home/node/code/localStore desks-api
