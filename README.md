
# Node.js Todo JWT REST API

This is a simple Todo API secured behind JWT authentication from a Redis cache
The Todo items themselves and system users are stored in MongoDB

# Installation

## Perquisites

A number of perquisites must be satisifed to run todo-jwt:
 - NPM package manger installed
 - Redis server installed
 - MongoDb server installed


1. First clone the GIT Repo and install components:
```bash
$ git clone https://github.com/Maltronic/todo-jwt.git
$ cd todo-jwt
$ npm install
```

2. Now generate some SSL keys (requires OpenSSL):
```bash
$ mkdir var
$ openssl genrsa -out var/private.pem -aes256 4096
$ openssl rsa -pubout -in var/private.pem -out var/public.pem
```

__(certificate must be password protected)__

3. Modify relevant server credentials in the *ecosystem.json* & *config.json* files.

4. Choose whether to use the angularjs or reactjs web app by renaming directory "public_angularjs" or "public_reactjs" to just "public".

5. Start the node.js server using a process manager like [pm2] (http://pm2.keymetrics.io/):
```bash
$ pm2 startOrRestart ecosystem.json --env dev
```

## Troubleshooting

After starting the pm2 process manager you can monitor server logs using:
```bash
$ pm2 logs
```

## Security

Access to the todo list requires a valid JWT [https://jwt.io/](Java Web Token)

The header should be formatted as follows as per the [https://tools.ietf.org/html/rfc6750#section-2.1](Internet Engineering Task Force) (IETF)'s  The OAuth 2.0 Authorization Framework: Bearer Token Usage) preferred Authorization Header Field syntax:
Authorisation: Bearer _TOKEN_





