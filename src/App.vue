<template>
    <div class="name">{{ name }}</div>
    <button class="btn btn-primary" v-on:click="updateName">Click</button>
</template>

<script>
export default {
    setup() {
        let name = 'Kossie Coder😁';

        // const consoleLog = () => {
        //     console.log('Hello world!');
        // };

        const updateName = () => {
            name = 'Kossie Coder'; // 상태변경은 이루어졌지만 화면에는 반영되지 않았음.
            console.log(name);
        };

        return {
            name,
            // consoleLog,
            updateName,
        };
    },
};
</script>

<style>
.name {
    color: red;
}
</style>
