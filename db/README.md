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
