import Vue from 'vue'
import store from '.././store'
import Router from 'vue-router'
import Login from '@/components/login'
import Main from '@/components/main'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      component: Login,
      name: 'login'
    },
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '',
      redirect: '/login'
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      children: []
    }
  ]
})

//路由守卫
router.beforeEach((to, from, next) => {
  // if (!Cookies.get('cid') && !Cookies.get('customerType') && to.name != 'login') {//判断用户信息，不合法返回登陆界面
  //   next('/login')
  // } else {
  if (from.path == '/') {
    //刷新进来
    if ((to.name == 'login' && (!to.redirectedFrom || (to.redirectedFrom && to.redirectedFrom == '/')))
       || to.name == 'main') {
      next();
    }
    else {
      //刷新回到主页
      next('/main');
    }
  }
  else {
    //不是刷新
    next();
    store.commit('navTabs/addBreadCrumb',to.name);
    //history.pushState(null, null, location.href);//禁止后退，搭配APP.VUE里面的mounted
  }
  // }
})

export default router;
