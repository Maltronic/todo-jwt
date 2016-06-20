
# Todo JWT REST API

This is a simple Todo API secured behind JWT authentication from a Redis cache
The Todo items themselves and system users are stored in MongoDB

# Installation

First clone the GIT Repo and install components:
```bash
$ git clone todo1.git
$ cd todo1
$ npm install
```

Now generate some SSL keys (requires OpenSSL):

```bash
$ mkdir var
$ openssl genrsa -out var/private.pem -aes256 4096
$ openssl rsa -pubout -in var/private.pem -out var/public.pem
```

Certificates must be password protected for security
====================================================



## Security

Access to the todo list requires a valid JWT [https://jwt.io/]{Java Web Token)

The header should be formatted as follows as per the [hhttps://tools.ietf.org/html/rfc6750#section-2.1](Internet Engineering Task Force (IETF)'s  The OAuth 2.0 Authorization Framework: Bearer Token Usage) preferred Authorization Header Field syntax:
Authorisation: Bearer _TOKEN_





