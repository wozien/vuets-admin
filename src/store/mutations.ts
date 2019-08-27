import jwt_decode from 'jwt-decode';
import { deepCopy } from '../assets/js/utils';
import { asyncRoutes } from '../router';

const mutations = {
  SET_USER(state: any, user: any) {
    user = user ? jwt_decode(user) : '';
    state.user = user;

    // 根绝角色权限设置路由
    const { key } = user;
    if (key) {
      // 这里需要深拷贝一份路由数据
      const copyRoutes = deepCopy(asyncRoutes);
      const myRoutes = filterRoutes(key, copyRoutes);
      state.myRoutes = myRoutes;
    }
  }
};

// 根据当前登录角色过滤路由规则数组
function filterRoutes(role: string, routes: any) {
  const myRoutes = routes.filter((route: any) => {
    if (hasPermission(role, route)) {
      if (route.children && route.children.length) {
        route.children = filterRoutes(role, route.children);
      }
      return true;
    }
    return false;
  });
  return myRoutes;
}

// 是否有改路由的权限
function hasPermission(role: string, route: any) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.some((item: string) => item === role);
  }
  return true;
}

export default mutations;
