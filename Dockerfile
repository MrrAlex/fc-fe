FROM node:alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build-app

#STAGE 2
FROM nginx:alpine
COPY conf/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/fc-fe /usr/share/nginx/html
