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
        <hr />
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">Next</a></li>
            </ul>
        </nav>
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
        const totalPage = ref(0);
        const limit = 5;
        const page = ref(1);

        const todoStyle = {
            textDecoration: 'line-through',
            color: 'gray',
        };

        const getTodos = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/todos?_page=${page.value}&_limit=${limit}`
                );
                totalPage.value(response.headers['x-total-count']);
                todos.value = response.data;
            } catch (error) {
                console.error(error);
            }
        };

        getTodos();

        const addTodo = async (todo) => {
            // 데이터베이스에 Todo 항목을 저장하기
            error.value = '';
            try {
                const response = await axios.post('http://localhost:3000/todos', {
                    subject: todo.subject,
                    completed: todo.completed,
                });

                todos.value.push(response.data);
            } catch (error) {
                /*
                    경우의 수
                        - DB서버가 죽었을 때 (ERR_CONNECTION_REFUSED)
                */
                console.error(error);
                error.value = 'Something went wrong😅';
            }
        };

        const deleteTodo = async (index) => {
            const id = todos.value[index].id;
            try {
                const response = await axios.delete('http://localhost:3000/todos/' + id);
                todos.value.splice(index, 1);
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        };

        const toggleTodo = async (index) => {
            error.value = '';
            const id = todos.value[index].id;
            try {
                await axios.patch('http://localhost:3000/todos/' + id, {
                    completed: !todos.value[index].completed,
                });
                todos.value[index].completed = !todos.value[index].completed;
            } catch (error) {
                console.log(error);
                error.value = 'Something went wrong.';
            }
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
