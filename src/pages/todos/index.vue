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
        <pagination
            v-if="todos.length"
            :numberOfPages="numberOfPages"
            :currentPage="currentPage"
            @click="getTodos"
        />
    </div>
</template>

<script>
import axios from '@/axios';
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import TodoList from '@/components/TodoList.vue';
import { useToast } from '@/composables/toast';
import Pagination from '@/components/Pagination.vue';

export default {
    components: {
        TodoList,
        Pagination,
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
                    `todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
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
                const response = await axios.post('todos', {
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

        const deleteTodo = async (id) => {
            error.value = '';
            try {
                await axios.delete('todos/' + id);
                getTodos(1);
            } catch (error) {
                console.error(error);
                triggerToast('Something went wrong!', 'danger');
            }
        };

        const toggleTodo = async (index, checked) => {
            error.value = '';
            const id = todos.value[index].id;
            try {
                await axios.patch('todos/' + id, {
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
