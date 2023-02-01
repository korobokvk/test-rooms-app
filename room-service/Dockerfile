FROM node:16-alpine as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i -only=production
COPY --from=builder /usr/src/app/public_key.pem ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/env ./env

EXPOSE 8082

CMD [ "npm", "start"]