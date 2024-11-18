FROM node:22.7-slim
WORKDIR /shop-stock-action-history
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 3500
