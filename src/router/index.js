import { createRouter, createWebHistory } from 'vue-router'
import Tasks from '@/views/Tasks.vue'
import New from '@/views/New.vue'
import Task from '@/views/Task.vue'

const routes = [
  { path: '/', component: Tasks },
  { path: '/new', component: New },
  {
    path: '/task',
    component: Task,
    name: 'task',
    children: [
      { path: ':id?', component: Task, props: true }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes
})

export default router
