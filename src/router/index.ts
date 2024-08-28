import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalizedGeneric,
} from 'vue-router'

import AdminLayout from '@/layouts/AdminLayout.vue'
import { getTokenFromLocalStorage } from '@/utils/tokenManager'
import LoginView from '@/views/login/index.vue'

const authenticate = (
  to: RouteLocationNormalizedGeneric,
  from: RouteLocationNormalizedGeneric,
  next: NavigationGuardNext
) => {
  const token = getTokenFromLocalStorage()

  if (token) {
    if (to.path === '/' || to.path === '/login') {
      next('/biro-travel')
    } else {
      next()
    }
  } else {
    if (to.path !== '/login') {
      next('/login')
    } else {
      next()
    }
  }
}

const routes = [
  {
    path: '/login',
    name: 'login',
    beforeEnter: authenticate,
    meta: { title: 'Login' },
    component: LoginView,
  },
  // {
  //   path: '/coba',
  //   name: 'coba',
  //   meta: { title: 'Coba' },
  //   component: () => import('@/views/coba/index.vue'),
  // },
  {
    path: '/',
    component: AdminLayout,
    beforeEnter: authenticate,
    children: [
      {
        path: 'biro-travel',
        name: 'biro-travel',
        meta: { title: 'Biro Travel' },
        component: () => import('@/views/biro/index.vue'),
      },
      {
        path: 'biro-detail/:id',
        name: 'biro-detail',
        meta: { title: 'Biro Detail' },
        component: () => import('@/views/biro/detail/index.vue'),
      },
      {
        path: 'pesanan',
        name: 'pesanan',
        meta: { title: 'Pesanan' },
        component: () => import('@/views/pesanan/index.vue'),
      },
      {
        path: 'airports',
        name: 'airports',
        meta: { title: 'Airports' },
        component: () => import('@/views/airports/index.vue'),
      },
      // {
      //   path: 'airlines',
      //   name: 'airlines',
      //   meta: { title: 'Airlines' },
      //   component: () => import('@/views/airlines/index.vue'),
      // },
      // {
      //   path: 'package-type',
      //   name: 'package-type',
      //   meta: { title: 'Package Types' },
      //   component: () => import('@/views/packagesTypes/index.vue'),
      // },
      // {
      //   path: 'city',
      //   name: 'city',
      //   meta: { title: 'City' },
      //   component: () => import('@/views/city/index.vue'),
      // },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from) => {
  document.title = `${to.meta.title} | Gold to Mecca` || 'Admin Gold to Mecca'

  if (from.path !== '/') {
    localStorage.removeItem('skip')
    localStorage.removeItem('limit')
  }
})

export default router
