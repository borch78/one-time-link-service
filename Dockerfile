FROM node:20.15-alpine

WORKDIR /code

COPY node_modules ./node_modules
COPY migrations ./migrations
COPY package.json postgrator-runner.mjs ./

COPY . .
