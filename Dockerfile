FROM node:11.10.1 AS build

WORKDIR /opt/app

COPY . .

RUN npm install node-sass --sass-binary-name=linux-x64-67
RUN npm install && npm run build-storybook

# --------------------------------------------

FROM nginx:1.17-alpine

COPY --from=build /opt/app/storybook-static /var/www
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
