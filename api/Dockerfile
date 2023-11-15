FROM --platform=linux/amd64 node:20-alpine as build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "start:prod"]