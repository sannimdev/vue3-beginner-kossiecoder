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

## Javascript 객체 복사하기

### 원시타입

```js
const a = 4;
const b = 4;
console.log(a === b); // true
```

### 참조타입

```js
// 객체는 메모리의 주솟값을 할당
const c = { a: 1 };
const d = { a: 1 };
const e = d;
// 따라서 참조타입은 메모리의 내용물이 아니라 주솟값을 비교한다.
console.log(c === d); // false
console.log(d === e); // true

// 같은 객체의 주솟값을 가리키고 있으므로 값의 변화에 영향을 받는다.
e.a = 2;
console.log(d.a); // 2

// 객체를 새로운 공간에 할당하고 d가 가리키는 객체의 값을 복사하여 붙여넣었으므로 서로 다른 객체이다. (서로 같은 객체를 공유하지 않는다)
const f = { ...d };
f.a = 3;
console.log(d.a); // 2

// 객체의 내용을 확인하는 방법?
const g = { ...f };
console.log(JSON.stringify(f) === JSON.stringify(g)); // true
// 그러나 이 방법은 객체의 나열 순서가 동일할 때만 가능한 일이다.

// lodash를 사용하여 객체의 내용을 비교하도록 한다. (lib)
```
