#build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VUE_APP_OPENWEATHER_API_KEY
ARG VUE_APP_API
ENV VUE_APP_OPENWEATHER_API_KEY=${VUE_APP_OPENWEATHER_API_KEY}
ENV VUE_APP_API=${VUE_APP_API}
RUN npm run build


#production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html


CMD ["nginx","-g","daemon off;"]