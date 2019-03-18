import { Site } from '../../sites/site';

export class AddSiteMutation {
  public type: string = 'addSite';

  constructor(public site: Site) { }
}