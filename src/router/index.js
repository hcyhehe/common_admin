import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'


/**
 * constantRouterMap： 代表那些不需要动态判断权限的路由，如登录页、404、等通用页面。
 * asyncRouterMap： 代表那些需求动态判断权限并通过 addRouters 动态添加的页面。
*/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  },
]

export const asyncRouterMap = [
  {
    path: '/base',
    component: Layout,
    redirect: '/base/info',
    meta: {roles: ['admin']},
    children: [
      {
        path: 'info',
        component: () => import('@/myviews/base/info'),
        name: 'baseInfo',
        meta: { title: '基础设置', icon: 'people', noCache: true }
      }
    ]
  },

  {
    path: '/genecode',
    component: Layout,
    redirect: '/genecode/list',
    meta: {roles: ['admin']},
    children: [
      {
        path: 'list',
        component: () => import('@/myviews/genecode/list'),
        name: 'genecodeList',
        meta: { title: '代码生成', icon: 'table', noCache: true },
      },
      {
        path: 'add',
        component: () => import('@/myviews/genecode/add'),
        name: 'genecodeAdd',
        meta: { title: '添加模块', icon: 'table', noCache: true },
        hidden: true,
      },
      {
        path: 'edit',
        component: () => import('@/myviews/genecode/edit'),
        name: 'genecodeEdit',
        meta: { title: '编辑模块', icon: 'table', noCache: true },
        hidden: true,
      },
    ]
  },
  
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/list',
    meta: { roles: ['admin'] },
    children: [
      {
        path: 'list',
        component: () => import('@/myviews/admin/list'),
        name: 'adminList',
        meta: { title: '平台账号管理', icon: 'peoples', noCache: true }
      }
    ]
  },
  
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
