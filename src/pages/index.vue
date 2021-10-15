<template>
    <div>Home Page Component</div>
    <div>{{ count }}</div>
    <button @click="count++">Add</button>
</template>

<script>
import { useCount } from '@/composables/count';

export default {
    setup() {
        const { count } = useCount(); // toRefs를 사용하지 않았으면 반응성을 잃는다.
        console.log(count);
        return { count };
    },
};
</script>

<style></style>
