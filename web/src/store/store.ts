import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import sites, { SiteState } from './sites/site-store';

Vue.use(Vuex);

export interface AppState extends SiteState {
  accessToken: string
}

export default new Store<AppState>({
  state: {
    accessToken: '',
    ...sites.initialState
  },
  mutations: {
    ...sites.mutations
  },
  actions: {
    ...sites.actions
  }
});
