<template>
    <div class="name">{{ name }}</div>
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
