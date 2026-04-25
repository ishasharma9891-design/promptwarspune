FROM node:20-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

# Cloud Run defaults to 8080, but the app can use PORT env var
EXPOSE 8080

CMD [ "node", "server.js" ]
