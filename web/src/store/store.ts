import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import auth, { AuthState } from '../auth/auth-store'
import sites, { SiteState } from '../sites/store/store';
import trenches, { TrenchState } from '../trenches/store/store';

Vue.use(Vuex);

export interface AppState {
  auth: AuthState
  sites: SiteState
  trenches: TrenchState
}

export default new Store<AppState>({
  modules: {
    auth: auth.module,
    sites: sites.module,
    trenches: trenches.module
  }
});
