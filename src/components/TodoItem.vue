<template>
    <div class="todo-item" v-bind:class="{'is-complete':todo.completed}">
        <input type="checkbox" v-model="todo.completed" v-on:change="$emit('change-todo',todo)"/>
            {{todo.title}}
        <b-btn @click="$emit('del-todo', todo.id)" class="del"> X </b-btn>    
    </div>
</template>

<script>
export default {
    name: "TodoItem",
    props: ["todo"],
    methods: {
        
    }
}
</script>

<style scoped>
    .todo-item {
        background: #f4f4f4;
        padding: 10px;
        border-bottom: 1px #ccc dotted;
    }
    .is-complete {
        text-decoration: line-through;
    }
    .del {
        background: #ff0000;
        color: #fff;
        border: none;
        padding: 3px 9px;
        border-radius: 50%;
        cursor: pointer;
        float: right;
    }
</style>
