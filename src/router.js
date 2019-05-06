import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import Home from './views/Home.vue'
import Chart from './views/Chart.vue'
import Text from './views/Text.vue'
import Manage from './views/Manage.vue'
import Activity from './views/Activity.vue'

import Team from './components/Manage/Team.vue'
import Personal from './components/Manage/Personal.vue'
import Lottery from './components/Manage/Lottery.vue'
import Sports from './components/Manage/Sports.vue'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue'),
    },
    {
      path: '/chart/:lotteryId',
      name: 'chart',
      component: Chart
    },
    {
      path: '/text',
      name: 'text',
      component: Text
    },
    {
      path: '/activity',
      name: 'activity',
      component: Activity
    },
    {
      path: '/manage',
      name: 'manage',
      component: Manage,
      children: [
        {
          path: 'team',
          component: Team
        },
        {
          path: 'personal',
          component: Personal
        },
        {
          path: 'lottery',
          component: Lottery
        },
        {
          path: '/manage/sports',
          component: Sports
        }
      ]
    },
    /*下注*/
    {
      path: '/bet/:lotteryName',
      component: () => import(/* webpackChunkName: "bet" */ './views/Bet.vue'),
      name: 'bet',
      meta: {
        backPage: 'home'
      }
    },
  ]
});

router.beforeEach((to, from, next) => {
  // next()
  if(to.name !== 'login' && to.name !== 'register'){
    store.dispatch('getProfile',{}).then(() => {
      next()
    })
  }else {
    next()
  }

})

export default router
