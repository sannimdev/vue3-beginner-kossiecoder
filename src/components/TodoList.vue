<template>
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
</template>

<script>
export default {
    // props: ['todos'],
    props: {
        todos: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style></style>
