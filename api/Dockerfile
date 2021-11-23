FROM node:16

USER node

WORKDIR /home/node/code

COPY --chown=node:node . .

RUN npm ci

CMD ["npm", "start"]