var apiURL = 'https://api.github.com/repos/vuejs/vue/commits?per_page=3&sha='


var demo = new Vue({
  el: '#GithubCommits',
  data: {
    branches: ['master', 'dev'],
    currentBranch: 'master',
    commits: null
  },

  created: function() {
    this.fetchData()
  },

  watch: {
    currentBranch: 'fetchData'
  },

  methods: {
    fetchData: function() {
      self = this
      $.ajax({url: apiURL + self.currentBranch, method: 'get'})
      .done(function(data){
        self.commits = data;
      })
    }
  }
})
