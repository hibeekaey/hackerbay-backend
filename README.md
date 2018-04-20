# HackerBay.io Backend Interview

HackerBay.io Backend Test using NodeJS, Express, Mocha for testing and Istanbul for code coverage.

## Local Setup

Run the following commands to setup for development:

```bash
npm install
npm start
```

This will install the necessary dependencies and start the express server at <http://localhost:8080.>

## Build Setup

Run the following commands to setup for production:

```bash
npm run build
npm run serve
```

This will build the project and run the distribution files.

**Note** Node.js is required! Here is the link [Node.js](https://nodejs.org/en/).

## Test

Run the following commands to test and generate code coverage (Mocha and Istanbul):

```bash
npm test
npm run cover
```

This will run the test suite and generate the code coverage.

## API Documentation

The API has three endpoints namely, `/login` endpoint for authentication using jwt and returning the token, `/jsonp` endpoint for getting json object and patch object and returning the json patch data, and `/thumb` endpoint for generating image thumbnail and returning the public url.

### Login Endpoint Request

- `POST` /login
- INPUT:

```json
{
  "username": String,
  "password": String
}
```

### Login Endpoint Response

- HTTP Status: `200: ok`
- JSON data:

```json
{
  "status": String,
  "message": String,
  "token": String
}
```

### Jsonp Endpoint Request

- `POST` /jsonp
- HEADERS:

```json
{
  "x-access-token": String
}
```

- INPUT:

```json
{
  "data": {
  "username": String,
  "password": String
  },
  "patch": Array
}
```

### Jsonp Endpoint Response

- HTTP Status: `201: created`
- JSON data:

```json
{
  "status": String,
  "message": String,
  "data": {
    "username": String,
    "role": String
  }
}
```

### Thumb Endpoint Request

- `POST` /thumb
- HEADERS:

```json
{
  "x-access-token": String
}
```

- INPUT:

```json
{
  "public_url": String
}
```

### Thumb Endpoint Response

- HTTP Status: `201: created`
- JSON data:

```json
{
  "status": String,
  "message": String,
  "data": {
    "public_url": String,
    "thumbnail_url": String
  }
}
```

## Additional Information

Well, Happy Coding!!

## LICENSE

[MIT](LICENSE)