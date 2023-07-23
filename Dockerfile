FROM node:14

WORKDIR /nuxtProject/
COPY ./package.json /nuxtProject/
COPY ./yarn.lock /nuxtProject/


RUN yarn install


COPY . /nuxtProject/



CMD yarn dev