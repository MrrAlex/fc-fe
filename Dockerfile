FROM nginx:alpine

RUN mkdir /data
RUN mkdir /data/nginx
RUN mkdir /data/nginx/cache

COPY conf/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist/fc-fe /usr/share/nginx/html
