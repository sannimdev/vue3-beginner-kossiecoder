<template>
    <!-- fragment 개념 도입됨 -->
    <div class="name">{{ greet }}</div>
</template>

<script>
export default {
    setup() {
        const name = 'Kossie Coder😁';

        // Setup Function에서 여러 개의 함수를 정의하여 사용할 수도 있다.

        const greeting = (name) => {
            return 'Hello, ' + name + '?';
        };

        const greet = greeting(name);

        return {
            greet,
        };
    },
};
</script>

<style>
.name {
    color: red;
}
</style>
