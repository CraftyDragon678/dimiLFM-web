FROM node

WORKDIR /app

COPY ./package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

FROM nginx
EXPOSE 3000
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
