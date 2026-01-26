import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/post/:id', // :id allows us to grab the specific post ID later
      name: 'post-detail',
      // Lazy Loading: This page only loads when the user clicks a post
      component: () => import('../views/PostDetail.vue'),
    },
    // This catches ANY path that isn't defined above (404 Error)
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFound.vue'),
    },
  ],
})

export default router
