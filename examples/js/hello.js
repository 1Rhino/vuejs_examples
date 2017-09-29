Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
});

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    title_message: 'This is title. ' + new Date().toLocaleString(),
    seen: true,
    todos: [
      {text: 'Learning Japanese'},
      {text: 'Learning English'},
      {text: 'Learning VueJS'},
    ],
    groceryList: [
      {id: 1, text: 'Learning Vue'},
      {id: 2, text: 'Learning Japanese'},
      {id: 3, text: 'Learning English'}
    ]
  },
  methods: {
    reverseMessage: function() {
      this.message = this.message.split('').reverse().join('')
    }
  }
});

