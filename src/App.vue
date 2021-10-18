<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <!-- 우와! 이런 방법이 있네 -->
        <router-link class="navbar-brand" :to="{ name: 'Home' }">Kossie Coder</router-link>

        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <!-- 그러나 /todos는 /todos/:id 를 입력하는 부분이 있어서 {name: } 따위의 형식으로는 여기에 사용하기에는 제한됨 -->
                <router-link class="nav-link" to="/todos">
                    Todos <span class="sr-only">(current)</span></router-link
                >
            </li>
        </ul>
    </nav>
    <div class="container">
        <router-view />
    </div>
    <toast />
</template>

<script>
import Toast from '@/components/Toast.vue';

export default {
    components: {
        Toast,
    },
};
</script>

<style scoped></style>
