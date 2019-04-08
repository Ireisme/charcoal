import { Guid } from 'guid-typescript';
import { SiteState } from './store';

const getters = {
  listSites: (state: SiteState) => {
    return Object.values(state.sites);
  },
  getSiteById: (state: SiteState) => (id: Guid) => {
    return state.sites[id.toString()];
  }
}

export default getters;