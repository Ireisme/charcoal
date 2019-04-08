import { ActionTree } from 'vuex';
import { SiteState } from './store';
import { AppState } from '../../store/store';
import { SiteService } from '../site-service';
import { AddSiteAction } from './action-types';
import { AddSiteMutation } from './mutation-types';

const actions: ActionTree<SiteState, AppState> = {
  getSites (context) {
    new SiteService().getSites()
    .then(sites => sites.forEach(site => context.commit(new AddSiteMutation(site))))
  },
  addSite (context, payload: AddSiteAction) {
    new SiteService().addSite(payload.site)
    .then(() => context.commit(new AddSiteMutation(payload.site)))
  }
};

export default actions;