FROM node:22 AS BUILD


WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm rebuild bcrypt

COPY . .

RUN npm run build

EXPOSE 8000

CMD ["npm", "start"]
