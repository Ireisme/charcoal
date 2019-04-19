import { ActionTree, ActionContext } from 'vuex';
import { SiteState } from './store';
import { AppState } from '../../store/store';
import siteService from '../site-service';
import { AddSiteAction } from './action-types';
import { AddSiteMutation } from './mutation-types';

const actions = {
  getSites: (context: ActionContext<SiteState, AppState>) => {
    siteService.getSites()
    .then(sites => sites.forEach(site => context.commit(new AddSiteMutation(site))))
  },
  addSite: (context: ActionContext<SiteState, AppState>, payload: AddSiteAction) => {
    siteService.addSite(payload.site)
    .then(() => context.commit(new AddSiteMutation(payload.site)))
  }
};

export default actions;