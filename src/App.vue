<template>
    <div class="container">
        <h2>To-Do List</h2>
        <input class="form-control" type="text" v-model="searchText" placeholder="Search" />
        <hr />
        <TodoSimpleForm @add-todo="addTodo" />
        <div style="color: red;">{{ error }}</div>
        <div v-if="!filteredTodos.length">
            There is nothing to display
        </div>
        <TodoList :todos="filteredTodos" @toggle-todo="toggleTodo" @delete-todo="deleteTodo" />
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
import axios from 'axios';

export default {
    components: {
        TodoSimpleForm,
        TodoList,
    },
    setup() {
        const todos = ref([
            // {
            //     id: 1,
            //     subject: '휴대폰 사기',
            //     completed: false,
            // },
            // {
            //     id: 2,
            //     subject: '장보기',
            //     completed: false,
            // },
        ]);
        const error = ref('');

        const todoStyle = {
            textDecoration: 'line-through',
            color: 'gray',
        };

        const addTodo = (todo) => {
            // 데이터베이스에 Todo 항목을 저장하기
            error.value = '';
            axios
                .post('http://localhost:3000/todos', {
                    subject: todo.subject,
                    completed: todo.completed,
                })
                .then((res) => {
                    console.log(res);
                    todos.value.push(todo);
                })
                .catch((err) => {
                    /*
                        경우의 수
                            - DB서버가 죽었을 때 (ERR_CONNECTION_REFUSED)
                    */
                    console.log(err);
                    error.value = 'Something went wrong😅';
                });
        };

        const deleteTodo = (index) => {
            console.log('delete todo', index);
            todos.value.splice(index, 1);
        };

        const toggleTodo = (index) => {
            todos.value[index].completed = !todos.value[index].completed;
        };

        const searchText = ref('');

        const filteredTodos = computed(() => {
            if (searchText.value) {
                return todos.value.filter((todo) => {
                    return todo.subject.includes(searchText.value);
                });
            }
            return todos.value;
        });

        return {
            todos,
            todoStyle,
            addTodo,
            deleteTodo,
            toggleTodo,
            searchText,
            filteredTodos,
            error,
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
