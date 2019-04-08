import { Site } from '../site';

export class AddSiteAction {
  public type: string = 'addSite';

  constructor (public site: Site) {}
}

export class GetSitesAction {
  public type: string = 'getSites';
}