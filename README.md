# Codebadge Backend
Setup locally
1. install dependencies
```npm i```

2. you must have mongodb server running.

3. create oauth for codebadge app

#### Github oauth(presently supported)

**step 1:-** create github oauth app
```
App nam => Codebadge

home url => http://localhost:3000

callback url => http://localhost:3001/github/auth/callback
```
**step 2:-** create config.js in config folder by copyinf config-sample.js

**step 3:-** copy client id and client secret respectively in github keys for github oauth app

#### Google oauth

**step 1:-** create github oauth app
```
App nam => Codebadge

home url => http://localhost:3000

callback url => http://localhost:3001/google/auth/callback
```
**step 2:-** create config.js in config folder by copyinf config-sample.js

**step 3:-** copy client id and client secret respectively in github keys for github oauth app

4. start server
```npm start```
