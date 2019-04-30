import { SitesState } from './state';
import { SitesActionTypes, ADD_SITE } from './actions';

const initialState: SitesState = {
  sites: {}
};

export function sitesReducer(state = initialState, action: SitesActionTypes): SitesState {
  switch (action.type) {
    case ADD_SITE:
      return {
        ...state,
        sites: {
          ...state.sites,
          [action.site.ID.toString()]: action.site
        }
      };
    default:
      return state;
  }
}
