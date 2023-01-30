FROM node:16-alpine as builder
WORKDIR /app
COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build


FROM node:16-alpine as runtime

WORKDIR /app
COPY package*.json ./
RUN npm ci -only=production
COPY --from=0 /app/dist ./dist
COPY --from=0 /app/env* ./env

EXPOSE 8081

CMD [ "npm", "start"]