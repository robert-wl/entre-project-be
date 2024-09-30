FROM node:18

WORKDIR /usr/src/app

ARG DATABASE_URL
ARG JWT_SECRET
ARG PORT

ENV DATABASE_URL=$DATABASE_URL
ENV JWT_SECRET=$JWT_SECRET
ENV PORT=$PORT

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "dist/main.js" ]
