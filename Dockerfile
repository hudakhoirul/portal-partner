# build environment
FROM node:10.15.1 as builder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install -ddd
COPY . /usr/src/app
RUN npm run build-prod

# production environment
FROM nginx:1.13.9-alpine
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
EXPOSE 10101
CMD ["nginx", "-g", "daemon off;"]
