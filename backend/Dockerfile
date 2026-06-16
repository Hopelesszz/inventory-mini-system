FROM node:latest
WORKDIR /use/app
COPY package*.json .
RUN npm install
COPY prisma ./prisma/
RUN npx prisma generate
COPY . .
EXPOSE 5555
CMD npx prisma db push && npm run dev -- --host