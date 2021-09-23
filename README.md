# vue3-beginner-kossiecoder

프로젝트로 배우는 Vue.js 3

## json-server 설치하기

-   개발을 위해 DB역할을 하기 위한 [json-server](https://www.npmjs.com/package/json-server)를 설치하기
    ```
    npm install -g json-server
    ```
-   임시 json 파일
    ```json
    {
        "posts": [{ "id": 1, "title": "json-server", "author": "typicode" }],
        "comments": [{ "id": 1, "body": "some comment", "postId": 1 }],
        "profile": { "name": "typicode" }
    }
    ```
-   개발서버 실행하기
    ```
    json-server --watch db.json
    ```

## 서버에서 받아올 때

-   app.js: 작성한 vue 컴포넌트 등 앱 구동에 필요한 js코드 압축
-   chunk-vendors: 사용한 패키지(node-modules)와 관련된 파일
