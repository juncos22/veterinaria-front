FROM node:20.13.1-alpine
WORKDIR /app
COPY package.json .
COPY . .
RUN npm install -g pnpm@latest
RUN pnpm install
RUN pnpm run build
CMD [ "pnpm", "run", "preview" ]
EXPOSE 4173