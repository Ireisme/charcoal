import { Dispatch } from "redux";
import { SiteService } from "../site-service";
import { AppState } from "../../store";
import { addSite } from "./actions";

export function getAllSites() {
  return (dispatch: Dispatch, getState: () => AppState) => {
    const state = getState();
    const session = state.auth.session;
    if(!session)
    {
      console.log('No auth session!');
      return;
    }

    const siteService = new SiteService(session.accessToken);
    const promise = siteService.getSites();
    promise.then(
      sites => sites.map(site => dispatch(addSite(site))),
      err => console.log(err)
    );

    return promise;
  };
};