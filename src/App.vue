<template>
    <div class="name">{{ name }}</div>
    <!-- <input type="text" v-bind:value="name" @input="updateName" /> -->
    <input type="text" v-model="name" />
    <button class="btn btn-primary" @click="onSubmit">Click</button>
</template>

<script>
import { ref } from 'vue';
export default {
    setup() {
        // 일반 변수를 사용한다면 상태의 변경이 이루어지더라도 변경된 값이 반영되지 않는다는 것에 유의하자.
        // let name = 'Kossie Coder😁';

        // ref를 이용하여야 화면단까지 변경사항이 반영된다.
        const name = ref('Kossie');

        const onSubmit = () => {
            console.log(name.value);
        };

        // @input 으로 지정할 시
        // const updateName = (e) => {
        //     name.value = e.target.value;
        // };

        return {
            name,
            onSubmit,
            // updateName,
        };
    },
};
</script>

<style>
.name {
    color: red;
}
</style>
