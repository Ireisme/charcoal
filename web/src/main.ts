import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import Vuelidate from 'vuelidate'

import { AuthPlugin } from './auth/auth.plugin';

Vue.config.productionTip = false;

Vue.use(AuthPlugin);
Vue.use(Vuetify, {
  iconfont: 'md',
});
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');