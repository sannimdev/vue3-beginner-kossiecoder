<template>
    <div class="container">
        <h2>To-Do List</h2>
        <TodoSimpleForm @add-todo="addTodo" />
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
        const todoStyle = {
            textDecoration: 'line-through',
            color: 'gray',
        };

        const addTodo = (todo) => {
            todos.value.push(todo);
        };

        const deleteTodo = (index) => {
            console.log('delete todo', index);
            todos.value.splice(index, 1);
        };

        return {
            todos,
            todoStyle,
            addTodo,
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
