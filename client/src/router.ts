import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from "./pages/Home.vue"
import DocView from "./pages/doc/[id].vue"
import LoginView from "./pages/Login.vue"

const routes = [
  { path: '/', component: HomeView },
  { path: '/doc/:id', component: DocView },
  { path: '/login', component: LoginView },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})