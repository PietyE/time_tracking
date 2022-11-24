FROM node:18

COPY . /app

WORKDIR /app

RUN npm install && npm install && \

    npm run prettier && \

    npm run eslint && \

    npm run build:development

