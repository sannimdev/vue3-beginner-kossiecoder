<template>
    <List :items="todos">
        <template #default="{item, index}">
            <div
                @click="moveToPage(item.id)"
                class="card-body p-2 d-flex align-items-center"
                style="cursor: pointer;"
            >
                <div class="flex-grow-1">
                    <!-- 자식컴포넌트가 된 이상 v-model로 양방향바인딩을 하는 것은 옳지 않다. (props로 받은 속성이니까) -->
                    <input
                        style="margin: 0 10px;"
                        type="checkbox"
                        :checked="item.completed"
                        @change="toggleTodo(index, $event)"
                        @click.stop
                    />
                    <!-- 혹은 @click.stop="toggleTodo(index)" 로 해도 된다.-->
                    <!-- 🐯 스타일 바인딩 유심히 살펴보기 -->
                    <!-- <label class="form-check-label" :style="item.completed ? todoStyle : {}">{{ -->
                    <span :class="{ todo: item.completed }">{{ item.subject }}</span>
                </div>
                <div>
                    <!-- 버블링  (클릭 이벤트가 발생하면 위로 전파 )-->
                    <button class="btn btn-danger btn-sm" @click.stop="openModal(item.id)">
                        Delete
                    </button>
                </div>
            </div>
        </template>
    </List>
    <teleport to="#modal">
        <Modal v-if="showModal" @close="closeModal" @delete="deleteTodo" />
    </teleport>
</template>

<script>
import { useRouter } from 'vue-router';
import Modal from '@/components/DeleteModal.vue';
import { getCurrentInstance, ref } from 'vue';
import List from '@/components/List.vue';

export default {
    components: {
        Modal,
        List,
    },
    // props: ['todos'],
    props: {
        todos: {
            type: Array,
            required: true,
        },
    },
    emits: ['toggle-todo', 'delete-todo'],
    setup() {
        const { emit } = getCurrentInstance();
        const router = useRouter();
        const showModal = ref(false);
        const todoDeleteId = ref(null);

        const toggleTodo = (index, event) => {
            emit('toggle-todo', index, event.target.checked);
        };

        const openModal = (id) => {
            showModal.value = true;
            todoDeleteId.value = id;
        };

        const closeModal = () => {
            showModal.value = false;
            todoDeleteId.value = null;
        };

        const deleteTodo = () => {
            emit('delete-todo', todoDeleteId.value);
            showModal.value = false;
        };

        const moveToPage = (todoId) => {
            console.log(todoId);
            // router.push('/todos/' + todoId);
            // route의 경로명이 언젠가 변경될 여지(ex: todos => todo)가 있을 때는 이러한 방법이 더 안정적이다.
            router.push({
                name: 'Todo',
                params: {
                    id: todoId,
                },
            });
        };

        return {
            toggleTodo,
            deleteTodo,
            moveToPage,
            showModal,
            openModal,
            closeModal,
        };
    },
};
</script>

<style></style>
