FROM alpine

RUN apk add --no-cache nodejs-npm
RUN npm install mapport

CMD /node_modules/.bin/mapport 1234 localhost:$PORT
