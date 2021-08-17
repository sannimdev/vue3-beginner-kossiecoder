<template>
    <div class="container">
        <h2>To-Do List</h2>
        <TodoSimpleForm />
        <div v-if="!todos.length">
            추가된 Todo가 없습니다.
        </div>
        <div class="card mt-2" v-for="(todo, index) in todos" :key="todo.id">
            <div class="card-body p-2 d-flex align-items-center">
                <div class="form-check flex-grow-1">
                    <input class="form-check-input" type="checkbox" v-model="todo.completed" />
                    <!-- 🐯 스타일 바인딩 유심히 살펴보기 -->
                    <!-- <label class="form-check-label" :style="todo.completed ? todoStyle : {}">{{ -->
                    <label class="form-check-label" :class="{ todo: todo.completed }">{{
                        todo.subject
                    }}</label>
                </div>
                <div>
                    <button class="btn btn-danger btn-sm" @click="deleteTodo(index)">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';

export default {
    components: {
        TodoSimpleForm,
    },
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
        const todoStyle = {
            textDecoration: 'line-through',
            color: 'gray',
        };

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

        const deleteTodo = (index) => {
            console.log('delete todo', index);
            todos.value.splice(index, 1);
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
            todoStyle,
            onSubmit,
            hasError,
            deleteTodo,
        };
    },
};
</script>

<style>
.todo {
    color: gray;
    text-decoration: line-through;
}
</style>
