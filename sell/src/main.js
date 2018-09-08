import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './common/stylus/index.styl'

Vue.config.productionTip = false
Vue.use(axios)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
