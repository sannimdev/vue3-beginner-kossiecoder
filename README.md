# vue3-beginner-kossiecoder

프로젝트로 배우는 Vue.js 3

-   [Vue3 Devtools (Beta) for Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg)
    -   `2021. 10. 14.` 기준 vue3 환경은 beta버전만 디버깅 툴이 활성화된다.

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

## Vue3 라이프사이클

```js
import { onMounted, onUpdated, onUnmounted } from 'vue';
export default {
    setup() {

        //beforeCreate, create는 setup() 함수 안에 그대로 기술하면 된다.

        onMounted(()=> {
            console.log('onMounted');
        })

        onUpdated(()=>{
            console.log('onUpdated)
        })

        onUnmounted(()=>{
            console.log('onUnmounted')
        })
    }
};
```

## Vue2와 작업할 때의 차이점

-   실습 코드 중에서 `Toast`관련 선언 변수(상수), 함수가 많았다.
-   Vue2라면 Options API는 `computed`, `watch`, `methods` 등의 구역이 나뉘어 있어 스크롤을 하며 왔다갔다 하며 봐야 했다.

    ```js
    export default {
        data() {
            return {
                //Toast에 관한 부분
                toastId: 1,
                toastName: 'abcde',
                toastNickname: '00700',
                // 기타
                systemId: 1,
                systemOut: 2,
                systemName: 3,
                ComputerId: 1,
                ComputerOut: 2,
                ComputerName: 4,
                ComputerIn: 5,
            };
        },
        computed: {
            // Toast
            toastValue() {
                return 0;
            },
            toastValueOfValue() {
                return 0;
            },
            toastValueVvalue() {
                return 0;
            },
            // 기타
            systemValue() {
                return 1;
            },
            systemValueOut() {
                return 2;
            },
            systemValueName() {
                return 3;
            },
            computerIdValue() {
                return 1;
            },
            computerOutValue() {
                return 2;
            },
            computerNameValue() {
                return 3;
            },
            computerInValue() {
                return 4;
            },
        },
        methods: {
            // Toast
            clearToastTimeout() {},
            setToastTimeoutId() {},
            setToastId() {},
            setToastName() {},
            // 기타
            setSystemId() {},
            setSystemOut() {},
            setSystemName() {},
            setComputerId() {},
            setComputerOut() {},
            setComputerName() {},
            setComputerIn() {},
        },
    };
    ```

-   Vue3에서는 setup() 함수에서는 논리적으로 유사한 것들을 짝지어 한데 모아둘 수 있는 장점이 있다.
    이렇게 정돈된 인상을 줄 수 있다. (오..........😮)

    ```js
    import { ref, onUnmounted } from 'vue';
    export default {
        setup() {
            // Toast
            const toastId = ref(null);
            const toastTimtout = () => {};
            const toastValue = 333;
            const initializeToast = () => {};

            onUnmounted(() => {
                clearTimeout(toastTimeout);
            });

            // System
            const systemId = ref(null);
            const systemTimeout = () => {};
            const systemValue = 444;

            // Computer
            const computerId = ref(null);
            const computerValue = () => {};
            const computerValueValue = () => {};
        },
    };
    ```

## 기타 공지

현재 뷰 버전 3.1에서 useContext가 deprecated 되었고

다음 마이너 버전 업데이트(3.2 일 가능성이 높음)에서 useContext가 삭제 될 예정입니다.
그래서 emit 하실때 전에 설명드린 setup(props, {emit})를 통해서 emit을 쓰시거나 useContext 대신에 getCurrentInstance를 사용하시면 됩니다.
