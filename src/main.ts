import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/styles/style.scss';
import * as types from '@/@types/global.d.ts';

Vue.config.productionTip = true


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
