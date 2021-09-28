FROM node:16

WORKDIR /home/node

COPY . .

RUN yarn --frozen-lockfile

CMD ["node", "index.js"]

