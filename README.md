## Installation

* Clone this repo and run `npm install`

## Create database

* Import the database sql/prueba.sql

## Configure .env

```bash
MSQLHOST=
MSQLUSER=
MSQLDATABASE=
MSQLPASSWORD=
MSQLPORT=

SWAPI_URL=https://swapi.py4e.com/api/

NODE_ENV=local
```


## Test locally

* `npm run dev` will run the function directly without serverless framework for fast test on your local machine

## Deploy

* `serverless config credentials --provider aws --key <TU_ACCESS_KEY> --secret <TU_SECRET_KEY>` configure credentials
* `serverless deploy` will deploy on production and load your .env.production environment variables


## Contribution

Feel free to fork, commit and submit pull request if you find a bug, or you want to add support to a new environment. Contributions are very welcome.

## License

MIT
