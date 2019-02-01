<template>
  <div id="app">
    <AddTodo v-on:add-todo="addTodo" />
    <Todos v-bind:todos="todos" v-on:del-todo="deleteTodo" v-on:change-todo="updateTodo" />
  </div>
</template>

<script>
import Todos from '../components/Todos';
import AddTodo from '../components/AddTodo';
import { db } from '../config/db';

export default {
  name: 'Home',
  components: {
    Todos,
    AddTodo
  },
  data() {
    return {
      todos: []
    }
  },
  methods: {
    deleteTodo(id) {
      db.collection('todos').doc(id).delete()
      this.todos = this.todos.filter(function(value){
        return value.id !== id;
      });
    },
    addTodo(newTodo){
      const { title, completed } = newTodo
      const createdAt = new Date()
      let self = this;
      db.collection('todos').add({ title, completed, createdAt })
      .then(function(doc) {
        self.todos.unshift({id: doc.id, title, completed, createdAt});
      })
      .catch(function(error) {
          alert(error);
      });
    },
    updateTodo(todo){
      db.collection('todos').doc(todo.id).set(todo)
    }
  },
  created(){
      db.collection('todos').orderBy('completed').orderBy('createdAt', 'desc').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.todos.push({
              ...doc.data(),
              id: doc.id
            });
          });
      });
    }
}
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.4;
  }

  .btn {
    display: inline-block;
    border: none;
    background: #555;
    color: #fff;
    padding: 7px 20px;
    cursor: pointer;
  }
  .btn:hover {
    background: #666;
  }
</style>
