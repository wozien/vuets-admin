import Vue from 'vue';
import Router from 'vue-router';
import Layout from './views/Layout/Index.vue';

Vue.use(Router);

export const routes = [
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
          icon: 'fa fa-file-text-o'
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
        meta: { title: '账户管理', icon: 'fa fa-user-plus' }
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
  routes
});

// 全局路由钩子
router.beforeEach((to: any, from: any, next: any) => {
  const isLogin = localStorage.tsToken ? true : false;
  if (to.path === '/login' || to.path === '/password') {
    next();
  } else {
    if (isLogin) {
      next();
    } else {
      next('/login');
    }
  }
});

export default router;
