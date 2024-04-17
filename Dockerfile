FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["bash", "-c", "npm install && npx sequelize-cli db:migrate && npm start"]
