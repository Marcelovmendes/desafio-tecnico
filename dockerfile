##BUILD IMAGE
# image node s
FROM node:alpine

# Create app directory

WORKDIR /app/desafio

COPY . .

RUN npm install
RUN npm run build 

EXPOSE 3000

CMD ["npm", "start"]