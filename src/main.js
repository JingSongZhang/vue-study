import Vue from 'vue'
import App from './App.vue'
import Notice from '@/components/Notice';
import extend from '@/utils/extend'
import router from './jrouter'
import store from './jstore'

Vue.config.productionTip = false

Vue.prototype.$notice = (props) => extend(Notice, props)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
