<template>
    <div class="name">{{ name }}</div>
    <div>{{ obj.id }}</div>
    <div>{{ phone }}</div>
    <button class="btn btn-primary" v-on:click="updateName">Click</button>
</template>

<script>
import { reactive, ref } from 'vue';
export default {
    setup() {
        // 일반 변수를 사용한다면 상태의 변경이 이루어지더라도 변경된 값이 반영되지 않는다는 것에 유의하자.
        // let name = 'Kossie Coder😁';

        // ref를 이용하여야 화면단까지 변경사항이 반영된다.
        let name = ref('Kossie Coder😲');
        // 단, 객체의 경우에는 `이름.value.프로퍼티명` 식으로 적어야 한다.
        let phone = ref({
            number: '010-0000-0000',
        });
        // 그러나 객체(배열, object 등)는 ref가 아니라 vue가 제공하는 reactive를 사용해도 된다.
        // 객체에서 ref를 이용하여 정의한 것과 다르게 바로 `참조이름.프로퍼티명` 식으로만 적어도 된다.
        // 단, 기본자료형(숫자, 문자)는 reactive와 조합하여 사용할 수 없다.
        let obj = reactive({
            id: 1,
        });

        // const consoleLog = () => {
        //     console.log('Hello world!');
        // };

        const updateName = () => {
            // ref의 value 속성에 있는 값을 변경해야 reactive한 상태의 변경이 이루어진다 (화면 단까지 변경사항이 반영됨)
            name.value = 'Kossie Coder... ';
            phone.value.number = '010-1234-9999';
            obj.id = 2;
            phone.value.id = console.log(name);
        };

        return {
            name,
            // consoleLog,
            updateName,
            phone,
            obj,
        };
    },
};
</script>

<style>
.name {
    color: red;
}
</style>
