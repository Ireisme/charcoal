import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { Site } from '../sites/site';
import { AddSiteMutation } from './sites/add-site.mutation';
import { AddSiteAction } from './sites/add-site.action';
import { SiteService } from '../sites/site-service';

Vue.use(Vuex);

export interface AppState {
  accessToken: string,
  sites: Site[]
}

export default new Store<AppState>({
  state: {
    accessToken: '',
    sites: []
  },
  mutations: {
    setAccessToken (state, payload) {
      state.accessToken = payload.accessToken;
    },
    addSite (state, payload: AddSiteMutation) {
      state.sites.push(payload.site)
    }
  },
  actions: {
    getSites (context) {
      new SiteService().getSites()
      .then(sites => sites.forEach(site => context.commit(new AddSiteMutation(site))))
    },
    addSite (context, payload: AddSiteAction) {
      new SiteService().addSite(payload.site)
      .then(() => context.commit(new AddSiteMutation(payload.site)))
    }
  }
});
