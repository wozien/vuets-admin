import Vue from 'vue';
import Router from 'vue-router';
import Layout from './views/Layout/Index.vue';
import jwt_decode from 'jwt-decode';

Vue.use(Router);

export const asyncRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/Login.vue')
  },
  {
    path: '/password',
    name: 'password',
    component: () => import('@/views/Login/Password.vue')
  },
  {
    path: '/',
    name: 'dashboard',
    component: Layout,
    redirect: '/home',
    show: true,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: { title: '首页', icon: 'fa fa-home' },
        component: () => import('@/views/Home.vue')
      }
    ]
  },
  {
    path: '/dataManage',
    name: 'dataManage',
    component: Layout,
    redirect: '/tableData',
    show: true,
    meta: { title: '数据管理', icon: 'fa fa-database' },
    children: [
      {
        path: '/tableData',
        name: 'tableData',
        component: () => import('@/views/Data/TableData.vue'),
        meta: { title: '表格管理', icon: 'fa fa-table' }
      },
      {
        path: '/chartData',
        name: 'chartData',
        component: () => import('@/views/Data/ChartData.vue'),
        meta: { title: '图表管理', icon: 'fa fa-bar-chart' }
      },
      {
        path: '/formData',
        name: 'formData',
        component: () => import('@/views/Data/FormData.vue'),
        meta: {
          title: '表单管理',
          icon: 'fa fa-file-text-o',
          roles: ['admin', 'editor']
        }
      }
    ]
  },
  {
    path: '/userManage',
    name: 'userManage',
    component: Layout,
    redirect: '/accountData',
    show: true,
    children: [
      {
        path: '/accountData',
        name: 'accountData',
        component: () => import('@/views/User/AccountData.vue'),
        meta: { title: '账户管理', icon: 'fa fa-user-plus', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: Layout,
    redirect: '/userInfo',
    children: [
      {
        path: '/userInfo',
        name: 'userInfo',
        component: () => import('@/views/User/UserInfo.vue'),
        meta: { title: '个人中心' }
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue')
  },
  {
    path: '*',
    redirect: '/404'
  }
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: asyncRoutes
});

// 全局路由钩子
router.beforeEach((to: any, from: any, next: any) => {
  const isLogin = localStorage.tsToken ? true : false;
  if (to.path === '/login' || to.path === '/password') {
    next();
  } else {
    if (isLogin) {
      const { key } = jwt_decode(localStorage.tsToken);
      if (hasPermission(key, to)) {
        next();
      } else {
        next('/404');
      }
    } else {
      next('/login');
    }
  }
});

// 是否有改路由的权限
function hasPermission(role: string, route: any) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.some((item: string) => item === role);
  }
  return true;
}

export default router;
