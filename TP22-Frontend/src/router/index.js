import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import SocialPage from '../components/social/SocialPage.vue'
import EnvironmentPage from '../components/environment/EnvironmentPage.vue'
import PasswordGate from '../components/PasswordGate.vue'
import InfrastructurePage from '@/components/infrastructure/InfrastructurePage.vue'
import ExtralService from '@/components/extralservice/ExtralService.vue'
import AIChatbox from '@/components/aichatbox/AIChatbox.vue'
import ComparePage from '@/components/compare/ComparePage.vue'

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
    {
      path: '/compare',
      name: 'compare',
      component: ComparePage
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
  const suburb = localStorage.getItem("selectedSuburb")

  if (to.path === "/") {
    localStorage.removeItem("selectedSuburb")
  }

  const restrictedPages = ["/social", "/environment", "/infrastructure"]

  if (restrictedPages.includes(to.path) && !suburb) {
    alert("⚠️ Please select a suburb on the homepage first.")
    next("/")
    return
  }
  next()
})


    
export default router
