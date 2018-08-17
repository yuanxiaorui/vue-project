<template>
  <li class="todo" :class="{completed: todo.completed,editing: editing}">
    <div class="view">
      <input class="toggle"
        type="checkbox"
        v-model="todo.completed">
      <label v-text="todo.title" @dblclick="editing=true"></label>
      <button class="destroy" @click="removeTodo(todo)"></button>
    </div>
     <input class="edit" type="text"
          v-show="editing"
          v-focus="editing"
          v-model="todo.title"
          @keyup.enter="doneEdit"
          @keyup.esc="cancelEdit"
          @blur="doneEdit"
     />
  </li>
</template>
<script>
export default {
  props: ['todo'],
  data() {
    return {
      editing: false
    }
  },
  methods: {
    removeTodo(todo) {
      this.$emit('remove',todo)
    },
    doneEdit(e) {
      const value = e.target.value.trim()
      if (!value) {
        this.removeTodo(this.todo)
      } else if (this.editing) {
        //todo.title=value
        // debugger
        let newValue = {
          'title': value,
          'completed': this.todo.completed
        }
        this.$emit('editDone',this.todo,newValue)
        this.editing = false
      }
    },
    cancelEdit(e) {
      e.target.value = this.todo.text
      this.editing = false
    }
  },
  directives: {
    focus (el, { value }, { context }) {
      if (value) {
        context.$nextTick(() => {
          el.focus()
        })
      }
    }
  }
}
</script>
