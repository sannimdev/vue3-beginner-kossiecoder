import { computed } from 'vue';
import { useStore } from 'vuex';
export const useToast = () => {
    //Toast
    const store = useStore();
    const toastMessage = computed(() => store.getters.toastMessageWithSmile);
    const toastAlertType = computed(() => store.state.toastAlertType);
    const showToast = computed(() => store.state.showToast);

    const triggerToast = (message, type = 'success') => {
        store.dispatch('triggerToast', message, type);
    };

    return {
        showToast,
        toastMessage,
        toastAlertType,
        triggerToast,
    };
};
