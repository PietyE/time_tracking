FROM node:18

ARG MAX_OLD_SPACE_SIZE=8192
ENV NODE_OPTIONS=--max-old-space-size=$(MAX_OLD_SPACE_SIZE)

COPY . /app

WORKDIR /app

RUN npm install && npm install && \

    npm run prettier && \

    npm run eslint && \

    npm run build:development

