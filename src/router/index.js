import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index'
import login from '../pages/login'
import register from '../pages/register'
import error from '../pages/404'
import home from '../pages/home'
import admin from '../pages/admin'
import price from '../pages/price'

Vue.use(Router);

const router= new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/register',
      name:register,
      component: register
    },
    {
      path: '/index',
      name:index,
      component: index,
      children:[
        {
          path: 'home',
          name:home,
          component: home
        },
        {
          path: 'admin',
          name:admin,
          component: admin
        },
        {
          path: 'price',
          name:price,
          component: price
        },
        {path: '/index', redirect: '/index/home'}
      ]
    },
    {
      path: '*',
      component: error
    }
  ]
});
//路由守卫
router.beforeEach((to,from,next) =>{
  const isLogin = localStorage.eleToken ? true : false;
  if(to.path === '/' || to.path === '/register'){
    next();
  }else{
    isLogin ? next() : next('/');
  }
});
export default router;
