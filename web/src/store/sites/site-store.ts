import { Site } from '../../sites/site';
import { ActionContext } from 'vuex';
import { AppState } from '../store';
import { SiteService } from '../../sites/site-service';
import { AddSiteMutation } from './add-site.mutation';
import { AddSiteAction } from './add-site.action';

export interface SiteState {
  sites: Site[]
}

const initialState = {
  sites: []
};

const mutations = {
  setAccessToken (state: AppState, payload: { accessToken: string}) {
    state.accessToken = payload.accessToken;
  },
  addSite (state: AppState, payload: AddSiteMutation) {
    state.sites.push(payload.site)
  }
};

const actions = {
  getSites (context: ActionContext<SiteState, AppState>) {
    new SiteService().getSites()
    .then(sites => sites.forEach(site => context.commit(new AddSiteMutation(site))))
  },
  addSite (context: ActionContext<SiteState, AppState>, payload: AddSiteAction) {
    new SiteService().addSite(payload.site)
    .then(() => context.commit(new AddSiteMutation(payload.site)))
  }
};

export default { initialState, mutations, actions };