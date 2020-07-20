import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/styles/style.scss';
import * as types from '@/@types/global.d.ts';
import { store, mutations, actions } from './store';
import '@/global_components'

Vue.config.productionTip = true

const app = new Vue({
  router,
  render: h => h(App)
})

actions.loadContainers().then(() => {
  app.$mount('#app')
})

String.prototype.in = function(arr: Array<string>) {
  return arr.includes(this.toString())
}