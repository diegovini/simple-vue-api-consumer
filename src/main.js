import Vue from 'vue'
import App from './App.vue'
import repository from './repository'


Vue.config.productionTip = false
Vue.prototype.$http = repository;

new Vue({
  render: h => h(App),

}).$mount('#app')
