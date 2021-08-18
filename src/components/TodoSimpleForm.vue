<template>
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
</template>

<script>
import { ref } from 'vue';

export default {
    /* context => 자식 컴포넌트에서 부모 컴포넌트로 보낼 때 필요한 객체 */
    setup(props, context) {
        const todo = ref('');
        const hasError = ref(false);
        const onSubmit = () => {
            if (todo.value === '') {
                hasError.value = true;
                return;
            } else {
                context.emit('add-todo', {
                    id: Date.now(),
                    subject: todo.value,
                    completed: false,
                });
                hasError.value = false;
                todo.value = '';
            }
        };

        return {
            todo,
            hasError,
            onSubmit,
        };
    },
};
</script>

<style scoped></style>
