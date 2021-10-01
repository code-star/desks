# based on https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

FROM node:lts-alpine
WORKDIR /usr/src/app

# move package files into docker workdir
COPY package*.json ./

RUN npm install

# add the application sources
COPY . .

# make sure the app port is exposed
EXPOSE 3001

CMD ["node", "index.js"]
