<template>
    <div :class="nameClass">{{ name }}</div>
    <input :type="type" v-bind:value="name" />
    <button class="btn btn-primary" @click="updateName">Click</button>
</template>

<script>
import { ref } from 'vue';
export default {
    setup() {
        // 일반 변수를 사용한다면 상태의 변경이 이루어지더라도 변경된 값이 반영되지 않는다는 것에 유의하자.
        // let name = 'Kossie Coder😁';

        // ref를 이용하여야 화면단까지 변경사항이 반영된다.
        const name = ref('Kossie');
        const type = ref('number');
        const nameClass = ref('');

        const updateName = () => {
            // ref의 value 속성에 있는 값을 변경해야 reactive한 상태의 변경이 이루어진다 (화면 단까지 변경사항이 반영됨)
            name.value = 'Coder';
            type.value = 'text';
            nameClass.value = 'name';
        };

        return {
            name,
            updateName,
            type,
            nameClass,
        };
    },
};
</script>

<style>
.name {
    color: red;
}
</style>
