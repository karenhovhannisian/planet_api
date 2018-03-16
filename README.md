# Planet App

Project is written in Node.js + Express with the following libs:
* Knex
* Objection
* Async
* Bcryptjs
* Cors
* Express-Rate-Limit
* Express-Validator
* Jsonwebtoken
* PostgreSQL
* Passport
* Passport-Jwt
* Moment

## Config

```console
cp .env.sample .env
cp .env.sample .env.test
```

## Setup

Install the project.

```console
npm i
```

Fill out the `.env` and `.env.test`.

```console
npm run migrate
```

### Run tests

*Terminal One*

```console
npm test
```

### Run in development mode

```
npm run start:dev
```
### Run in production mode

```
npm start
```

