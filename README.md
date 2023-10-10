# Betting House

## Project Description

This project is a back-end application for a sports betting house. It allows users to place bets on the outcomes of various sports events.

## Technologies Used

- TypeScript
- Node.js with Express
- Prisma (ORM)
- PostgreSQL
- Jest and Supertest for testing
 
## Installation

To set up and run this project locally, follow these steps:

```bash
$ npm install
```

## Deploy

https://desafio-tecnico-6kh5.onrender.com 

## Environment Setup

Rename one of the files to .env.

Rename the other file to .env.test.

Be sure to modify the variables in the .env file as needed.

Ensure that the .env.test file has its dedicated database configuration.

```bash
#init prima
$ npx prisma migrate dev
$ npx prisma generate
```

## Run the app

# development
```bash
$ npm run dev
```

## Docker

### Repository and Image access

 https://hub.docker.com/repository/docker/marcelocortess/backend/general
