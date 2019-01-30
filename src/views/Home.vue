<template>
  <div id="app">
    <AddTodo v-on:add-todo="addTodo" />
    <Todos v-bind:todos="todos" v-on:del-todo="deleteTodo" />
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
    },
    addTodo(newTodo){
      const { title, completed } = newTodo
      const createdAt = new Date()
      db.collection('todos').add({ title, completed, createdAt })
      .then(function(doc) {
        console.log(doc);
      })
      .catch(function(error) {
          alert(error);
      });
    }
  },
  created(){
      db.collection('todos').orderBy('completed').orderBy('title').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            data.id = doc.id;
            this.todos.push(data);
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
