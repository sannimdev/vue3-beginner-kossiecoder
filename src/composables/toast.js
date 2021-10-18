import { computed, onUnmounted } from 'vue';
import { useStore } from 'vuex';
export const useToast = () => {
    //Toast
    const store = useStore();
    const toastMessage = computed(() => store.state.toastMessage);
    const toastAlertType = computed(() => store.state.toastAlertType);
    const showToast = computed(() => store.state.showToast);
    const timeout = computed(() => store.state.timeout);
    const triggerToast = (message, type = 'success') => {
        toastAlertType.value = type;
        toastMessage.value = message;
        showToast.value = true;
        timeout.value = setTimeout(() => {
            console.log('toast initialized');
            // 3초 뒤 사라지기
            toastMessage.value = '';
            toastAlertType.value = '';
            showToast.value = false;
        }, 3000);
    };

    // 라이프사이클도 빼서 사용할 수 있다. 우와!!!!😃
    onUnmounted(() => {
        clearTimeout(timeout.value);
    });

    return {
        showToast,
        toastMessage,
        toastAlertType,
        triggerToast,
    };
};
