# based on https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

FROM node:lts-alpine

# We must run as root, because otherwise the azure fileshare mounts do not work
# USER node

WORKDIR /home/node/code

# move package files into docker workdir
COPY --chown=node:node package*.json ./

RUN npm install

# add the application sources
COPY --chown=node:node . .

# create local folder outside /home (which uses CIFS, that does not handle SQLite locks) that can be used to mount azure fileshare
RUN mkdir -p /var/data/localStore
RUN chmod ugo=rwx /var/data/localStore

# make sure the app port is exposed
EXPOSE 3001

CMD ["node", "index.js"]
