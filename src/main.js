import Vue from 'vue'
import VueResource from 'vue-resource'
import router from './router'
import Layout from './components/layout'

Vue.use(VueResource)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { Layout },
  template: '<Layout/>'
})
