import { ref, onUnmounted } from 'vue';

export const useToast = () => {
    //Toast
    const showToast = ref(false);
    const toastAlertType = ref('');
    const toastMessage = ref('');
    const timeout = ref(null);
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
