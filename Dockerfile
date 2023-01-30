FROM node:16.17.1-alpine
WORKDIR /usr/src/app
COPY . ./
RUN npm i
RUN npm run build
CMD [ "node", "dist/src/main.js" ]
EXPOSE 3000
