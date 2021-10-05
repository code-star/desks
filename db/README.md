node index.js

docker build -t desks-db .

docker run -it --init --rm --name desks-api -p 3001:3001 -v $(pwd)/docker_db/:/home/node/code/db/ desks-db