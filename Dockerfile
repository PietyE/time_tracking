FROM node:18
# copy current project directory to container /app
COPY . /app
# change working directory in container
WORKDIR /app
RUN npm install
RUN npx lint-staged
# add `/app/node_modules/.bin` to $PATH
EXPOSE 5000
ENV PATH /app/node_modules/.bin:$PATH
RUN chmod -R +x scripts
CMD ["/app/scripts/run-local.sh"]
