FROM node:18

WORKDIR /usr/src/app

ARG DATABASE_URL
ARG JWT_SECRET
ARG PORT
ARG BACKEND_BASE_URL

ENV DATABASE_URL=$DATABASE_URL
ENV JWT_SECRET=$JWT_SECRET
ENV PORT=$PORT
ENV BACKEND_BASE_URL=$BACKEND_BASE_URL

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

CMD [ "node", "dist/main.js" ]
