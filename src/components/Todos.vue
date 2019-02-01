<template>
    <div>
        <div v-for="(todo, idx) in todos" :key="idx">
            <TodoItem v-bind:todo="todo" v-on:del-todo="$emit('del-todo', todo.id)" v-on:change-todo="$emit('change-todo',todo)" />
        </div>
    </div>
</template>

<script>
import TodoItem from './TodoItem';

export default {
    name: "Todos",
    components: {
        TodoItem
    },
    props: ["todos"]
}
</script>

<style scoped>

</style>
