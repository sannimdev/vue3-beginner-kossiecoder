<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item" v-if="currentPage !== 1" @click="onClick(currentPage - 1)">
                <a class="page-link" href="#">Previous</a>
            </li>
            <li
                class="page-item"
                v-for="page in numberOfPages"
                :key="page"
                :class="currentPage === page ? 'active' : ''"
            >
                <a class="page-link" href="#" @click="onClick(page)">{{ page }}</a>
            </li>
            <li v-if="numberOfPages !== currentPage" class="page-item">
                <a class="page-link" href="#" @click="onClick(currentPage + 1)">Next</a>
            </li>
        </ul>
    </nav>
</template>

<script>
import { getCurrentInstance } from 'vue';

export default {
    props: {
        numberOfPages: { type: Number, required: true },
        currentPage: { type: Number, required: true },
    },
    emits: ['click'],
    setup() {
        const { emit } = getCurrentInstance();
        const onClick = (page) => {
            emit('click', page);
        };

        return {
            onClick,
        };
    },
};
</script>

<style></style>
