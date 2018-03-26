import Vue from 'vue'
import VueResource from 'vue-resource'
import router from './router'
import Layout from './components/layout'
import store from './store'

Vue.use(VueResource)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { Layout },
  template: '<Layout/>'
})
