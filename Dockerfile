FROM node:20-alpine

WORKDIR /app

COPY package*.json pnpm-lock.yaml* .

RUN npm install -g pnpm && pnpm install

COPY . .
ENV DATABASE_URL=postgres://postgres:postgres@postgres:5432/my_postgres

RUN npx prisma generate
RUN pnpm run build

EXPOSE 3000

CMD ["npm", "run", "dev:docker"]