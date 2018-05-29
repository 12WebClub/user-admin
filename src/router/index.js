import Vue from 'vue';
import Router from 'vue-router';
const Index = r => require.ensure([], () => r(require('@/views/index/index')), 'index');
const Login = r => require.ensure([], () => r(require('@/views/login/login')), 'login');
const Register = r => require.ensure([], () => r(require('@/views/register/register')), 'register');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
  ],
});
