FROM node:latest

RUN mkdir -p /usr/backend

WORKDIR /usr/backend

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 4000

CMD [ "node", "app.js"]