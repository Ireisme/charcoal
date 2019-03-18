import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';

import Callback from './auth/Callback.vue'
import Landing from './Landing.vue';

import Home from './home/Home.vue';
import DashBoard from './home/Dashboard.vue'
import authService from './auth/auth.service';

import SiteList from './sites/SiteList.vue'
import AddSite from './sites/AddSite.vue';

Vue.use(Router);


const withPrefix = (prefix: string, routes: RouteConfig[]) =>
  routes.map((route) => {
    route.path = `${prefix}/${route.path}`;
    return route;
  });

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
    { path: '/home', redirect: '/home/sites/list' },
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
        ...withPrefix('sites', [
          {
            path: 'list',
            name: 'site-list',
            component: SiteList
          },
          {
            path: 'add',
            name: 'add-site',
            component: AddSite
          }
        ])
      ]
    }
  ],
});
