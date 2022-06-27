FROM node:alpine3.16

COPY . .
RUN npm install

CMD npm start