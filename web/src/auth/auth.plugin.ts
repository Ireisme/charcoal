import Vue from 'vue';

import authService from './auth.service';

export function AuthPlugin(vue: typeof Vue, options?: any): void {
  vue.prototype.$auth = authService;
}