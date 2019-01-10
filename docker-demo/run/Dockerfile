FROM arm32v7/node:10-slim as builder
RUN mkdir /app
ADD package* /app/
WORKDIR /app
RUN npm install
ADD index.js /app/index.js
