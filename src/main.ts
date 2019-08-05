import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './assets/js/http';

Vue.use(ElementUI);

Vue.config.productionTip = false;

// 将axios实例挂在到vue原型
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
