<template>
    <div class="container">
        <h2>To-Do List</h2>
        <form @submit.prevent="onSubmit">
            <div class="d-flex">
                <div class="flex-grow-1 mr-2">
                    <input
                        class="form-control"
                        type="text"
                        v-model="todo"
                        placeholder="Type new to-do"
                    />
                </div>
                <div>
                    <button class="btn btn-primary" type="submit">Add</button>
                </div>
            </div>
            <div v-show="hasError" style="color: red;">This field cannot be empty</div>
        </form>
        {{ todos }}
        <div class="card mt-2" v-for="todo in todos" :key="todo.id">
            <div class="card-body p-2">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="todo.completed" />
                    <label class="form-check-label">{{ todo.subject }}</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
export default {
    setup() {
        const todo = ref('');
        const todos = ref([
            {
                id: 1,
                subject: '휴대폰 사기',
                completed: false,
            },
            {
                id: 2,
                subject: '장보기',
                completed: false,
            },
        ]);
        const hasError = ref(false);

        const onSubmit = () => {
            if (todo.value === '') {
                hasError.value = true;
                return;
            } else {
                hasError.value = false;
                // e.preventDefault(); template에서 .prevent로 대체
                todos.value.push({
                    id: Date.now(),
                    subject: todo.value,
                    completed: false,
                });
                todo.value = '';
            }
        };

        /*
v-if: 토글 시 비용이 많이 듦. 조건을 만족하지 않으면 DOM Elements에서 삭제됨
- 런타임 동안 자주 바뀌는 요소가 아닌 경우
v-show: 초기 렌더링 비용이 많이 듦. (style의 display 속성을 none으로 변경하여 비활성화함)
- Toggle이 자주 필요할 때
        */

        return {
            todo,
            todos,
            onSubmit,
            hasError,
        };
    },
};
</script>

<style>
.name {
    color: red;
}
</style>
