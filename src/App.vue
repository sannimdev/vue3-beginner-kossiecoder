<template>
    <!-- fragment 개념 도입됨 -->
    <div class="name">{{ name }}</div>
    <div>Hi</div>
</template>

<script>
export default {
    setup() {
        const name = 'Kossie Coder😁';

        return {
            name,
        };
    },
};
</script>

<style>
.name {
    color: red;
}
</style>
