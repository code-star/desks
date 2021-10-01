docker build -t desks-api .
docker run --init --publish 3001:3001 desks-api
