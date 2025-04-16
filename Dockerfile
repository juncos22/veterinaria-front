FROM node:20.13.1-alpine
WORKDIR /app
COPY package.json .
COPY . .
RUN npm install
RUN npm run build
CMD [ "npm", "run", "dev" ]
EXPOSE 8080