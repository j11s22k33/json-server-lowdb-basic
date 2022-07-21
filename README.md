# JSON-SERVER-LOWDB-BASIC

- https://www.npmjs.com/package/lowdb

```
lowdb 1.0.0 - const low = require('lowdb')
lowdb 2.0.0 이후 부터 - import { Low, JSONFile } from 'lowdb'

require() -> package.json type: commonjs
import from -> package.json type: module
```

```
+-- [json-server-lowdb] - 테스트 용도
+----- [common] - 공통사용
+----- [lowdb] - db.json, lowdb초기화
+----- [middlewares] - 미들웨어 모음
+----- [public] - static files
+----- [routes] - 라우트경로
+----- [uploads] - static files
+----- app.js - 
+----- env.js - 환경설정파일
+----- nodemon.json - nodemon설정파일
```

