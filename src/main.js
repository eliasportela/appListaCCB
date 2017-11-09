import Vue from 'vue'
import App from './App.vue'
import Vue2Filters from 'vue2-filters'

import router from './router'
 
Vue.use(Vue2Filters)

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})

