import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Layout from '@/views/Layout.vue'
import List from '@/views/List.vue'

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home,
  //   meta: { requireAuth: true },
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Home,
        meta: { title: '首页', icon: 'dashboard' },
      },
      {
        path: 'list',
        name: 'List',
        component: List,
        meta: { title: '列表' },
      },
      {
        path: 'user-list',
        name: 'UserList',
        component: () => import('@/views/UserList.vue'),
        meta: { title: '用户列表' },
      },
      {
        path: 'excel-to-json',
        name: 'ExcelToJson',
        component: () => import('@/views/ExcelToJson.vue'),
        meta: { title: 'ExcelToJson' },
      },
      {
        path: 'box-manager',
        name: 'BoxManager',
        component: () => import('@/views/BoxManager/index.vue'),
        meta: { title: 'BoxManager' },
      },
      {
        path: 'box-manager/update',
        name: 'BoxUpdate',
        component: () => import('@/views/BoxManager/Update.vue'),
        meta: { title: 'BoxUpdate' },
      },
      {
        path: 'box-manager/add',
        name: 'BoxAdd',
        component: () => import('@/views/BoxManager/Add.vue'),
        meta: { title: 'BoxAdd' },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { requireAuth: false },
  },
  {
    path: '/reg',
    name: 'register',
    component: Register,
    meta: { requireAuth: false },
  },
  {
    path: '/niu-boxs',
    name: 'NiuBoxs',
    component: () => import('@/views/NiuBoxs/index.vue'),
    meta: { requireAuth: false },
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('./views/404.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    const token = localStorage.getItem('token')
    const token_exp = localStorage.getItem('token_exp')
    const now_time = new Date().getTime()
    console.log(now_time - token_exp)
    if (token && now_time - token_exp <= 1000 * 60 * 60 * 2) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
