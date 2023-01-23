# personal-website

My personal website built in React to display my resume and portfolio

## Getting Started

### Create .env file

```
REACT_APP_GRAPHQL_URI=http://localhost:3001/graphql

REACT_APP_AWS_BUCKET_NAME=****

REACT_APP_S3_CLOUDFRONT=****

REACT_APP_API_ENDPOINT=****

REACT_APP_AWS_ACCESS_KEY_ID=****

REACT_APP_AWS_SECRET_ACCESS_KEY=****
```

### Installation

```bash
$ npm install --legacy-peer-deps
```

### Running the app locally

```bash
$ npm start
```

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### Setting up the backend

Before setting up the backend you can expect to see an error page on website pages that rely on data from the backend for rendering.

To set up the backend please follow the documentation [here](https://github.com/OTTTO/personal-website-backend).

### Logging in

You can log in as admin with the email/password found in the backend .env file [here](https://github.com/OTTTO/personal-website-backend)
