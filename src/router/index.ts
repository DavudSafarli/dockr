import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

export enum Routes {
  Home = 'home',
  Details = 'details',
}

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: Routes.Home,
    component: require('@/views/Home.vue').default,
  },
  {
    path: '/container/:id',
    name: Routes.Details,
    component: require('@/views/Details.vue').default,
  },
]

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
