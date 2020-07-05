import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = true


import '@/assets/styles/style.scss';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
