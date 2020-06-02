import Vue from 'vue'
import App from './App.vue'
import Notice from '@/components/Notice';
import extend from '@/utils/extend'
import router from './jrouter'

Vue.config.productionTip = false

Vue.prototype.$notice = (props) => extend(Notice, props)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
