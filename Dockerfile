FROM node:20.13.1-alpine

WORKDIR /app

COPY package.json .

RUN npm install -g pnpm@latest

COPY . .

RUN pnpm install
RUN pnpm run build

EXPOSE 8080

CMD [ "pnpm", "run", "preview" ]