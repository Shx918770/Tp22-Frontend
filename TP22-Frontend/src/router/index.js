import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import SocialPage from '../components/social/SocialPage.vue'
import EnvironmentPage from '../components/environment/EnvironmentPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/social',
      name: 'social',
      component: SocialPage
    },
    {
      path: '/environment',
      name: 'environment',
      component: EnvironmentPage
    }
  ],
})

export default router
