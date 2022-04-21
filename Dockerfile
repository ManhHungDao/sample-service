FROM msx/node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY tsconfig.json /usr/src/app/
COPY .env.* /usr/src/app/
# Bundle app source
COPY ./dist /usr/src/app/dist
# COPY ./src /usr/src/app/src
# COPY ./documentation /usr/src/app/documentation
# COPY ./src/protos /usr/src/app/dist/protos
COPY ./src/template-files /usr/src/app/dist/template-files
COPY ./src/generated-files /usr/src/app/dist/generated-files

RUN yarn
# RUN yarn build
# RUN npm install --no-optional

# COPY ./certs/mycert.pem /usr/src/app/certs/mycert.pem
# COPY ./certs/privateKey.pem /usr/src/app/certs/privateKey.pem

COPY wait-for-it.sh /usr/src/app/
RUN chmod +x ./wait-for-it.sh


EXPOSE 3050
# CMD [ "npm", "start" ]
# CMD [ "npm", "run", "start:prod" ]
# CMD [ "yarn", "start:prod" ]
# CMD ["./wait-for-it.sh", "msx-sts:3200", "rabbitmq:15672",  "-t", "120","--", "yarn", "start:prod"]