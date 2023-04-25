import { createRouter, createWebHistory } from 'vue-router'
import DemoView from '../views/DemoView.vue'
import test from '../views/test.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DemoView
    },
    {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
})

export default router
