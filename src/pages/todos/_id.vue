<template>
    <h1>To-do Page</h1>
    <div v-if="loading">
        Loading...
    </div>
    <form v-else @submit.prevent="onSave">
        <div class="row mb-4">
            <div class="col-6">
                <div class="form-group">
                    <label>Todo Subject</label>
                    <input v-model="todo.subject" type="text" class="form-control" />
                </div>
            </div>
            <div class="col-6">
                <label>Completed</label>
                <div>
                    <button
                        type="button"
                        class="btn"
                        :class="todo.completed ? 'btn-success' : 'btn-danger'"
                        @click="toggleTodoStatus"
                    >
                        {{ todo.completed ? 'Completed' : 'Incomplete' }}
                    </button>
                </div>
            </div>
        </div>
        <button type="submit" class="btn btn-primary" :disabled="!todoUpdated">Save</button>
        <button class="btn btn-outline-dark ml-2" @click="moveTodoListPage">Cancel</button>
    </form>
    <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType" />
    <div id="kossie">Coder</div>
</template>

<script>
import { ref, computed, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';

export default {
    components: {
        Toast,
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const todo = ref(null);
        const originalTodo = ref(null);
        const loading = ref(true);
        const id = route.params.id;
        const showToast = ref(false);
        const toastAlertType = ref('');
        const toastMessage = ref('');
        const timeout = ref(null);

        onUnmounted(() => {
            console.log('unmounted');
            clearTimeout(timeout.value);
        });

        const getTodo = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/todos/${id}`);

                // 사용자가 조작할 수 있는 todo객체와 원본 todo객체의 값을 서로 공유하지 않도록 복사하기
                todo.value = { ...res.data };
                originalTodo.value = { ...res.data };

                loading.value = false;
            } catch (error) {
                triggerToast('Something went wrong...😅', 'danger');
                console.error(error);
            }
        };

        const todoUpdated = computed(() => {
            return !_.isEqual(todo.value, originalTodo.value);
        });

        const toggleTodoStatus = () => {
            todo.value.completed = !todo.value.completed;
        };

        const moveTodoListPage = () => {
            router.push({
                name: 'Todos',
            });
        };

        const triggerToast = (message, type = 'success') => {
            toastAlertType.value = type;
            toastMessage.value = message;
            showToast.value = true;
            timeout.value = setTimeout(() => {
                console.log('toast initialized');
                // 3초 뒤 사라지기
                toastMessage.value = '';
                toastAlertType.value = '';
                showToast.value = false;
            }, 3000);
        };

        const onSave = async () => {
            try {
                const res = await axios.put(`http://localhost:3000/todos/${id}`, {
                    subject: todo.value.subject,
                    completed: todo.value.completed,
                });
                console.log(res);
                originalTodo.value = { ...todo.value };
                triggerToast('Successfully saved!');
            } catch (error) {
                console.error(error);
                triggerToast('Something went wrong!');
            }
        };

        getTodo();
        return {
            todo,
            loading,
            toggleTodoStatus,
            moveTodoListPage,
            onSave,
            todoUpdated,
            showToast,
            toastMessage,
            toastAlertType,
        };
    },
};
</script>

<style></style>
