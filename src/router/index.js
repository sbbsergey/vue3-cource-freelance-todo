import { createRouter, createWebHistory } from 'vue-router'
import Tasks from '@/views/Tasks.vue'
import New from '@/views/New.vue'

const routes = [
  { path: '/', component: Tasks },
  { path: '/new', component: New }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
