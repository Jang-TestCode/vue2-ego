import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from '@/api'
import '@/utils/init.js'
import '@/utils/eventbus.js'
import '@/element-ui'
import '@/assets/css/reset.css'

Vue.prototype.$http = api
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
