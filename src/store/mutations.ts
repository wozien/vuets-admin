import jwt_decode from 'jwt-decode';
import { routes } from '../router';

const mutations = {
  SET_USER(state: any, user: any) {
    user = user ? jwt_decode(user) : '';
    state.user = user;

    // 根绝角色权限设置路由
    const { key } = user;
    if (key) {
      const myRoutes = filterRoutes(key, routes);
      state.routes = myRoutes;
      console.log(key);
      console.log(myRoutes);
    }
  }
};

// 根据当前登录角色过滤路由规则数组
function filterRoutes(role: string, routes: any) {
  return routes.filter((route: any) => {
    if (hasPermission(role, route)) {
      if (route.children && route.children.length) {
        route.children = filterRoutes(role, route.children);
      }
      return true;
    }
    return false;
  });
}

// 是否有改路由的权限
function hasPermission(role: string, route: any) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.some((item: string) => item === role);
  }
  return true;
}

export default mutations;
