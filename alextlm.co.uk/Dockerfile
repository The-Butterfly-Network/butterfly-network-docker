FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 8009
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "8009"]