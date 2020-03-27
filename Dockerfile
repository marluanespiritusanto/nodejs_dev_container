FROM node:latest

COPY . /api

WORKDIR /api

RUN npm install --only=production