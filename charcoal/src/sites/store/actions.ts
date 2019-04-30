import { Site } from "../site";

export const ADD_SITE = <const> 'ADD_SITE';

export interface AddSiteAction {
  type: typeof ADD_SITE;
  site: Site;
}

export function addSite(site: Site) {
  return {
    type: ADD_SITE,
    site
  };
}

export type SitesActionTypes = AddSiteAction;
