var STORAGE_KEY = 'kantodos-vuejs-2';
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    todos.forEach(function(todo, index){
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

todosData = [
  {
    id: 1,
    title: 'Learn Vuejs',
    completed: true
  },
  {
    id: 2,
    title: 'Learning Hiragana',
    completed: true
  },
  {
    id: 3,
    title: 'Learning Katakana',
    completed: false
  },
  {
    id: 4,
    title: 'Learning React Native',
    completed: false
  }
];

var app = new Vue({
  data: {
    todos: todoStorage.fetch(),
    newTodo: '',
    editedTodo: null,
    visibility: 'all'
  },

  watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  },

  computed: {
    filteredTodos: function () {
      return filters[this.visibility](this.todos)
    },
    remaining: function () {
      return filters.active(this.todos).length
    },
    allDone: {
      get: function () {
        return this.remaining === 0
      },
      set: function (value) {
        this.todos.forEach(function(todo) {
          todo.completed = value
        })
      }
    }
  },

  methods: {
    addTodo: function () {
      var value = this.newTodo && this.newTodo.trim()
      if (!value) { return }
      this.todos.push({
        id: this.todos.length,
        title: value,
        completed: false
      })
      this.newTodo = ''
    },

    editTodo: function(todo) {
      this.beforeEditCache = todo.title
      this.editedTodo = todo
    },

    doneEdit: function(todo) {
      if (!this.editedTodo) {
        return
      }
      this.editedTodo = null
      todo.title = todo.title.trim()
      if (!todo.title) {
        this.removeTodo(todo)
      }
    },

    removeTodo: function(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },

    cancelEdit: function (todo) {
      this.editedTodo = null
      todo.title = filters.active(this.todos)
    },

    removeCompleted: function (todo) {
      this.todos = filters.active(this.todos)
    }

  },

  directives: {
    'todo-focus': function(el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }
})

var filters = {
  all: function (todos) {
    return todos
  },
  active: function (todos) {
    return todos.filter(function(todo){
      return !todo.completed
    })
  },
  completed: function (todos) {
    return todos.filter(function(todo){
      return todo.completed
    })
  }
}

function onHashChange () {
  var visibility = window.location.hash.replace(/#\/?/, '')
  if (filters[visibility]) {
    app.visibility = visibility
  } else {
    window.location.hash = ''
    app.visibility = 'all'
  }
}


window.addEventListener('hashchange', onHashChange)
onHashChange()

app.$mount('.kanTodos')
