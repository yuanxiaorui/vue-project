<template>
  <section class="todoapp">
    <!-- header -->
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo"
        autofocus
        autocomplete="off"
        placeholder="What needs to be done?"
        v-model="newTodo"
        @keyup.enter="addTodo"
        >
    </header>
    <!-- main section -->
    <section class="main" v-show="todos.length">
      <input type="checkbox" class="toggle-all" id="toggle-all">
      <label for="toggle-all"></label>
      <ul class="todo-list">
        <TodoItem
        v-for="(todo, index) in filteredTodos"
        :key="index"
        :todo="todo"
        @remove="removeTodo"
        @editDone="editDone"
        ></TodoItem>
      </ul>
    </section>
    <!-- footer -->
    <footer class="footer" v-show="todos.length">
      <span class="todo-count">
        <strong>{{remaining}}</strong>
        {{remaining|pluralize}} left
      </span>
      <ul class="filters">
            <li v-for="(val, key) in filters" :key="key">
              <a :href="'#/' + key" :class="{selected: visibility == key}"
                @click="visibility=key">
              {{key}}
              </a>
            </li>
      </ul>
      <button class="clear-completed" @click="removeCompleted">
        Clear completed
      </button>
    </footer>
  </section>
</template>

<script>
import TodoItem from './TodoItem';

const filterss = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.completed),
  completed: todos => todos.filter(todo => todo.completed)
}
export default {
  name: 'HelloWorld',
  components: { TodoItem },
  data() {
    return {
      newTodo:'',
      todos: [],
      visibility: 'all',
      filters: filterss
    };
  },
  computed: {
    filteredTodos: function() {
      return filterss[this.visibility](this.todos)
    },
    remaining: function() {
      return filterss.active(this.todos).length
    }
  },
  filters: {
    pluralize: function(n) {
      return n===1 ? 'item': 'items'
    }
  },
  methods: {
    addTodo: function () {
      var value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      this.todos.push({
        title: value,
        completed: false
      })
      this.newTodo = ''
    },
    removeCompleted: function () {
      this.todos = filterss.active(this.todos)
    },
    removeTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },
    editDone(todo,newValue) {
      this.todos.splice(this.todos.indexOf(todo), 1,newValue)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
