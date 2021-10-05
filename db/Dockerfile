FROM node:16

USER node

WORKDIR /home/node/code

COPY --chown=node:node . .

RUN yarn --frozen-lockfile

CMD ["npm", "start"]
