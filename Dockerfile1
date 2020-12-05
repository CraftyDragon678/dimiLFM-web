FROM node

WORKDIR /app

COPY ./package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile  --production

COPY . .
RUN yarn build

FROM nginx
EXPOSE 3000
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
