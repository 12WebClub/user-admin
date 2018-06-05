import Vue from 'vue';
import App from './App';
import router from './router';
import './assets/css/reset.css';
import './ui';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (!window.sessionStorage.getItem('token')) {
    if (to.path === '/login' || to.path === '/register') {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
