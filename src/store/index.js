import { createStore } from 'vuex';
import modules from './modules';

export default createStore({
    // 폴더와 비슷한 개념으로 빼내어 관리할 수 있다.
    modules,
});
