FROM node:18

ENV NODE_OPTIONS=--max-old-space-size=8192

COPY . /app

WORKDIR /app

RUN npm install && npm install && \

    npm run prettier && \

    npm run eslint && \

    npm run build:development

