FROM node:12

ENV NODE_CONTAINER_VERSION=1.0.0

# Create directory for application
WORKDIR /data/bot-app

# Install dependencies
COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "index.js" ]
