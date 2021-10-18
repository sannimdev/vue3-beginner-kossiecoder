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
    <transition name="slide">
        <toast v-if="showToast" :message="toastMessage" :type="toastAlertType" />
    </transition>
</template>

<script>
import Toast from '@/components/Toast.vue';
import { useToast } from './composables/toast';

export default {
    components: {
        Toast,
    },
    setup() {
        const { showToast, toastMessage, toastAlertType, triggerToast } = useToast();

        return {
            showToast,
            toastMessage,
            toastAlertType,
            triggerToast,
        };
    },
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: all 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateY(-30px);
}

.slide-enter-to,
.slide-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>
