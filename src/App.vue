<template>
    <div class="container">
        <h2>To-Do List</h2>
        <input
            class="form-control"
            type="text"
            v-model="searchText"
            placeholder="Search"
            @keyup.enter="searchTodo"
        />
        <hr />
        <TodoSimpleForm @add-todo="addTodo" />
        <div style="color: red;">{{ error }}</div>
        <div v-if="!todos.length">
            There is nothing to display
        </div>
        <TodoList :todos="todos" @toggle-todo="toggleTodo" @delete-todo="deleteTodo" />
        <hr />
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" v-if="currentPage !== 1" @click="getTodos(currentPage - 1)">
                    <a class="page-link" href="#">Previous</a>
                </li>
                <li
                    class="page-item"
                    v-for="page in numberOfPages"
                    :key="page"
                    :class="currentPage === page ? 'active' : ''"
                >
                    <a class="page-link" href="#" @click="getTodos(page)">{{ page }}</a>
                </li>
                <li v-if="numberOfPages !== currentPage" class="page-item">
                    <a class="page-link" href="#" @click="getTodos(currentPage + 1)">Next</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
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
        const numberOfTodos = ref(0);
        const limit = 5;
        const currentPage = ref(1);
        const searchText = ref('');

        // const a = reactive({
        //     b: 1,
        //     c: 3,
        // });

        // watch(
        //     () => [a.b, a.c],
        //     (current, prev) => {
        //         console.log(current, prev);
        //     }
        // );

        // a.b = 2;

        const numberOfPages = computed(() => {
            return Math.ceil(numberOfTodos.value / limit);
        });

        const todoStyle = {
            textDecoration: 'line-through',
            color: 'gray',
        };

        const getTodos = async (page = currentPage.value) => {
            currentPage.value = page;
            try {
                const response = await axios.get(
                    `http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
                );
                numberOfTodos.value = response.headers['x-total-count'];
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

                // todos.value.push(response.data);
                console.log(response);
                getTodos(1);
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

        let timeout = null;
        const searchTodo = () => {
            clearTimeout(timeout);
            getTodos();
        };
        watch(searchText, (/*current, prev*/) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                getTodos(1);
            }, 2000);
        });

        // const filteredTodos = computed(() => {
        //     if (searchText.value) {
        //         return todos.value.filter((todo) => {
        //             return todo.subject.includes(searchText.value);
        //         });
        //     }
        //     return todos.value;
        // });

        return {
            todos,
            todoStyle,
            addTodo,
            deleteTodo,
            toggleTodo,
            searchText,
            searchTodo,
            // filteredTodos,
            error,
            numberOfPages,
            currentPage,
            getTodos,
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
