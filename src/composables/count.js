import { reactive, toRefs } from 'vue';
// composables에서 함수명을 use로 시작하는 것이 일반적(리액트 같은 느낌)
export const useCount = () => {
    const state = reactive({
        count: 0,
    });

    return toRefs(state); // toRefs로 wrapping하여 반응성을 잃지 않도록 설정하기
};
