FROM nginx:alpine
COPY conf/nginx.conf /etc/nginx/nginx.conf
COPY ./dist/fc-fe /usr/share/nginx/html
