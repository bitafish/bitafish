FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json .

RUN npx nx run admin-dashboard:build --prod

COPY --from=builder /app/dist/apps/admin-dashboard ./

EXPOSE 3000

CMD npm run dev