FROM node:13.14.0-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD https://www.google.com /time.now
COPY ./package.json /usr/src/app
COPY ./package-lock.json /usr/src/app
COPY ./index.js /usr/src/app/index.js
COPY ./src /usr/src/app/src
RUN npm install
ENV NODE_ENV production
ENV PORT 80
EXPOSE 80
CMD npm start
