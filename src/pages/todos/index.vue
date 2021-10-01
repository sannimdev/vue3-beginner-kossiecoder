<template>
    <router-view />
    <div class="container">
        <div class="d-flex justify-content-between mb-3">
            <h2>To-Do List</h2>
            <button class="btn btn-primary" @click="moveToCreatePage">
                Create Todo
            </button>
        </div>
        <input
            class="form-control"
            type="text"
            v-model="searchText"
            placeholder="Search"
            @keyup.enter="searchTodo"
        />
        <hr />
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
    <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType" />
</template>

<script>
import axios from 'axios';
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import TodoList from '@/components/TodoList.vue';
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast';
export default {
    components: {
        TodoList,
        Toast,
    },
    setup() {
        const router = useRouter();
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

        const numberOfPages = computed(() => {
            return Math.ceil(numberOfTodos.value / limit);
        });

        const todoStyle = {
            textDecoration: 'line-through',
            color: 'gray',
        };

        const { showToast, toastMessage, toastAlertType, triggerToast } = useToast();

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
                triggerToast('Something went wrong!', 'danger');
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
                triggerToast('Something went wrong!', 'danger');
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
                triggerToast('Something went wrong!', 'danger');
            }
        };

        const toggleTodo = async (index, checked) => {
            error.value = '';
            const id = todos.value[index].id;
            try {
                await axios.patch('http://localhost:3000/todos/' + id, {
                    completed: checked,
                });
                todos.value[index].completed = checked;
            } catch (error) {
                console.log(error);
                error.value = 'Something went wrong.';
                triggerToast('Something went wrong!', 'danger');
            }
        };

        const moveToCreatePage = () => {
            router.push({
                name: 'TodoCreate',
            });
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
            moveToCreatePage,
            // filteredTodos,
            error,
            numberOfPages,
            currentPage,
            getTodos,
            // Toast
            showToast,
            toastAlertType,
            toastMessage,
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
