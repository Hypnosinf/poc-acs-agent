import Vue from 'vue'
import VueRouter from 'vue-router'
import LocalPreview from '../views/LocalPreview.vue'
import HomeScreen from '../views/HomeScreen.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeScreen',
    component: HomeScreen
  },
  {
    path: '/local-preview',
    name: 'LocalPreview',
    component: LocalPreview
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
