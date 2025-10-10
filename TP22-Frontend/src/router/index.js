import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import SocialPage from '../components/social/SocialPage.vue'
import EnvironmentPage from '../components/environment/EnvironmentPage.vue'
import PasswordGate from '../components/PasswordGate.vue'
import InfrastructurePage from '@/components/infrastructure/InfrastructurePage.vue'
import ExtralService from '@/components/extralservice/ExtralService.vue'
import AIChatbox from '@/components/aichatbox/AIChatbox.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/password',
      name: 'password',
      component: PasswordGate
    },
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
    },
    {
      path: '/infrastructure',
      name: 'infrastructure',
      component: InfrastructurePage
    },
    {
      path: '/extraservice',
      name: 'extraservice',
      component: ExtralService
    },
    {
      path: '/aichatbox',
      name: 'aichatbox',
      component: AIChatbox
    },
  ],
  scrollBehavior(to, from, savedPosition) {
      if (to.hash) {
        return{ el: to.hash, behavior: 'smooth' };
      }
      return { top: 0 };
    },
})

router.beforeEach((to, from, next) => {
  const access = localStorage.getItem("siteAccess")
  if (!access && to.path !== "/password") {
    next("/password")
  } else {
    next()
  }
})


    
export default router
