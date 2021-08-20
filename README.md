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
