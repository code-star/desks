node index.js

docker build -t desks-db .

docker run -it --init --rm -p 3001:3001 -v $(pwd)/foo/myDb.db:/home/node/myDb.db desks-db