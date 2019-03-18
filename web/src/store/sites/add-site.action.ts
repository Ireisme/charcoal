import { Site } from '../../sites/site';

export class AddSiteAction {
  public type: string = 'addSite';

  constructor (public site: Site) {}
}