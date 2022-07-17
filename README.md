## AWS Lambda, JWT Auth, CRUD users, MongoDB DynamoDB

for the starter make sure to install:

- AWS cli → [https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- nodeJs → [https://nodejs.org/en/](https://nodejs.org/en/)
- serverless framework → [https://www.serverless.com/](https://www.serverless.com/)

```plaintext
npm i -g serverless
```

To start git clone this repo, then run

```plaintext
npm install
#OR
yarn
```

then run

```plaintext
sls deploy
```

to test AWS live

```plaintext
### test hello world and create superadmin users
POST https://s63wiiq38f.execute-api.ap-southeast-3.amazonaws.com/dev/hello
Content-Type: application/json;charset=UTF-8

{
  "name": "sancoLgates"
}

### login return token, unfortunately can't implement token in every API call yet
POST https://s63wiiq38f.execute-api.ap-southeast-3.amazonaws.com/dev/users/dev/auth/login
Content-Type: application/json;charset=UTF-8

{
  "name": "sancoLgates",
  "password": "password123"
}

### get all users
GET https://s63wiiq38f.execute-api.ap-southeast-3.amazonaws.com/dev/users

### create user
POST https://s63wiiq38f.execute-api.ap-southeast-3.amazonaws.com/dev/user
Content-Type: application/json;charset=UTF-8

{
  "name": "sanz",
  "password": "passwd",
  "status": true
}

### get user by id
GET https://s63wiiq38f.execute-api.ap-southeast-3.amazonaws.com/dev/user/9424fb24-914d-42f5-81c4-963cdc885d27
Content-Type: application/json;charset=UTF-8

### update user
PUT https://s63wiiq38f.execute-api.ap-southeast-3.amazonaws.com/dev/user/9424fb24-914d-42f5-81c4-963cdc885d27
Content-Type: application/json;charset=UTF-8

{
  "status": false
}

### delete user
DELETE https://s63wiiq38f.execute-api.ap-southeast-3.amazonaws.com/dev/user/9424fb24-914d-42f5-81c4-963cdc885d27
Content-Type: application/json;charset=UTF-8
```
