FROM node:latest

COPY . /api

WORKDIR /api

RUN npm install --only=production

EXPOSE 3000

ENTRYPOINT [ "npm", "start"]