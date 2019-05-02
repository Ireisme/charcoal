import { SitesState } from './state';
import { SitesActionTypes, ADD_SITE } from './actions';
import { GETALLSITES_SUCCESS } from './requests';

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
      case GETALLSITES_SUCCESS:
        const sitesMap = action.sites.reduce((p, site) => ({...p, [site.ID.toString()]: site }), {});
        return {
          ...state,
          sites: {
            ...state.sites,
            ...sitesMap
          }
        }
    default:
      return state;
  }
}
