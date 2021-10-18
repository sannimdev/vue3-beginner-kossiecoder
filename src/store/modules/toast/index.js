export default {
    namespaced: true,
    state: {
        toastMessage: '',
        toastAlertType: '',
        showToast: false,
        timeout: null,
    },
    mutations: {
        UPDATE_TOAST_MESSAGE(state, payload) {
            state.toastMessage = payload;
        },
        UPDATE_TOAST_ALERT_TYPE(state, payload) {
            state.toastAlertType = payload;
        },
        UPDATE_TOAST_STATUS(state, payload) {
            state.showToast = payload;
        },
        UPDATE_TOAST_TIMEOUT(state, payload) {
            state.timeout = payload;
        },
    },
    actions: {
        triggerToast({ commit }, message, type = 'success') {
            commit('UPDATE_TOAST_MESSAGE', message);
            commit('UPDATE_TOAST_ALERT_TYPE', type);
            commit('UPDATE_TOAST_STATUS', true);
            setTimeout(() => {
                commit('UPDATE_TOAST_MESSAGE', '');
                commit('UPDATE_TOAST_ALERT_TYPE', '');
                commit('UPDATE_TOAST_STATUS', false);
            }, 3000);
        },
    },
    // getters: vuex에서 사용하는 computed라고 생각하면 된다.
    getters: {
        toastMessageWithSmile(state) {
            // state.항목명 => 반응형을 가진다.
            return state.toastMessage + '😄';
        },
    },
};
