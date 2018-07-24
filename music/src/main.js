// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import lazyload from 'vue-lazyload'
import store from './store'

// common是在webpack.base.config.js中的alias别名配置
import 'common/stylus/index.styl'

Vue.config.productionTip = false

fastclick.attach(document.body)

Vue.use(lazyload, {
  loading: 'common/image/default.png'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})