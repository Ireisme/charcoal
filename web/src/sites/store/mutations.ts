import { SiteState } from './store';
import { AddSiteMutation } from './mutation-types';

const mutations = {
  addSite (state: SiteState, payload: AddSiteMutation) {
    state.sites = {
      ...state.sites,
      [payload.site.ID.toString()]: payload.site
    };
  }
};

export default mutations;