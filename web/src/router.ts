import Vue from 'vue';
import Router from 'vue-router';

import Callback from './auth/Callback.vue'
import Landing from './Landing.vue';

import Home from './home/Home.vue';
import DashBoard from './home/Dashboard.vue'
import authService from './auth/auth.service';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing
    },
    {
      path: '/callback',
      name: 'callback',
      component: Callback,
    },
    {
      path: '/home',
      component: Home,
      beforeEnter: (to, from, next) => {
          try {
            authService.renewTokens().then(() => {
              next();
            });
          } catch (e) {
            console.log(e);
          }
      },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashBoard
        }
      ]
    }
  ],
});
