import { Site } from '../site';

export class AddSiteMutation {
  public type: string = 'addSite';

  constructor (public site: Site) { }
}