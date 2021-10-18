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
    <toast v-if="showToast" :message="toastMessage" :type="toastAlertType" />
</template>

<script>
import Toast from '@/components/Toast.vue';
import { useStore } from 'vuex';

export default {
    components: {
        Toast,
    },
    setup() {
        const store = useStore();
        const { showToast, toastMessage, toastAlertType, triggerToast } = store.state;

        console.log(showToast.value);

        return {
            showToast,
            toastMessage,
            toastAlertType,
            triggerToast,
        };
    },
};
</script>

<style></style>
