### Prerequisites

- Node 16
- MongoDB 5
- Serverless

### Installation

1. Install the serverless CLI via NPM:
   ```sh
   npm install -g serverless
   ```
1. Install NPM packages
   ```sh
   npm install
   ```
1. Rename or copy the `.env.dev` file to `.env`
1. Set your database credentials in your `.env` file
1. Run the following command on your DB to create the delete index
   ```sh
   db.tokens.createIndex({ "created_at": 1 }, { expireAfterSeconds: 900 })
   ```

## Running the app

```bash
# development
$ npm run start
```

## Build the app

```bash
# development
$ npm run sls:package
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
