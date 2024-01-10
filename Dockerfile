FROM node:21-bullseye-slim AS build

WORKDIR /usr/src/application       

COPY package*.json ./

RUN --mount=type=cache,target=/usr/src/application/.npm \
  npm set cache /usr/src/application/.npm && \
  npm install

COPY ./ ./

RUN npm run build

###################################

FROM nginxinc/nginx-unprivileged:1.25-alpine3.18-perl AS serve

COPY --link --from=build usr/src/application/build/ /usr/share/nginx/html

EXPOSE 8080

CMD [ "nginx", "-g", "daemon off;" ]