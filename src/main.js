import Vue from 'vue'
import App from './App.vue'
import repository from './repository'
import axios from 'axios';

Vue.config.productionTip = false
Vue.prototype.$http = repository;

new Vue({
  render: h => h(App),

}).$mount('#app')
