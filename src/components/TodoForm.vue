<template>
    <div v-if="loading">
        Loading...
    </div>
    <form v-else @submit.prevent="onSave">
        <div class="row mb-4">
            <div class="col-6">
                <!-- <div class="form-group">
                    <label>Subject</label>
                    <input v-model="todo.subject" type="text" class="form-control" />
                    <div class="subjectError text-red" v-if="subjectError">
                        {{ subjectError }}
                    </div>
                </div> -->
                <Input label="Subject" :error="subjectError" v-model:subject="todo.subject" />
            </div>
            <div v-if="editing" class="col-6">
                <label>Completed</label>
                <div>
                    <button
                        type="button"
                        class="btn"
                        :class="todo.completed ? 'btn-success' : 'btn-danger'"
                        @click="toggleTodoStatus"
                    >
                        {{ todo.completed ? 'Completed' : 'Incompleted' }}
                    </button>
                </div>
            </div>
            <div class="col-12">
                <div class="form-group">
                    <label>Body</label>
                    <textarea
                        v-model="todo.body"
                        class="form-control"
                        cols="30"
                        rows="10"
                    ></textarea>
                </div>
            </div>
        </div>
        <button type="submit" class="btn btn-primary" :disabled="!todoUpdated">
            {{ editing ? 'Update' : 'Create' }}
        </button>
        <button class="btn btn-outline-dark ml-2" @click="moveTodoListPage">Cancel</button>
    </form>
</template>

<script>
import { ref, computed, onUpdated } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from '@/axios';
import _ from 'lodash';
import { useToast } from '@/composables/toast';
import Input from '@/components/Input.vue';

export default {
    components: {
        Input,
    },
    props: {
        editing: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const route = useRoute();
        const router = useRouter();
        const todo = ref({
            subject: '',
            completed: false,
        });

        onUpdated(() => {
            console.log(todo.value.subject, 'updated...');
        });

        const originalTodo = ref(null);
        const subjectError = ref('');
        const loading = ref(false);
        const id = route.params.id;

        const { showToast, toastMessage, toastAlertType, triggerToast } = useToast();

        const getTodo = async () => {
            loading.value = true;
            try {
                const res = await axios.get(`todos/${id}`);

                // 사용자가 조작할 수 있는 todo객체와 원본 todo객체의 값을 서로 공유하지 않도록 복사하기
                todo.value = { ...res.data };
                originalTodo.value = { ...res.data };

                loading.value = false;
            } catch (error) {
                loading.value = false;
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

        const onSave = async () => {
            subjectError.value = '';
            try {
                if (!todo.value.subject) {
                    subjectError.value = 'Subject is required';
                    return;
                }
                // eslint-disable-next-line no-unused-vars
                let res;
                const data = {
                    subject: todo.value.subject,
                    completed: todo.value.completed,
                    body: todo.value.body,
                };
                if (props.editing) {
                    res = await axios.put(`todos/${id}`, data);
                } else {
                    res = await axios.post(`todos`, data);
                    todo.value.subject = '';
                    todo.value.body = '';
                }

                originalTodo.value = { ...todo.value };
                const message = 'Successfully ' + (props.editing ? 'Updated' : 'Created');
                triggerToast(message);

                if (!props.editing) {
                    router.push({
                        name: 'Todos',
                    });
                }
            } catch (error) {
                console.error(error);
                triggerToast('Something went wrong!');
            }
        };

        if (props.editing) {
            getTodo();
        }

        return {
            todo,
            loading,
            subjectError,
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

<style scoped></style>
