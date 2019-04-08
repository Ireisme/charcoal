import { Guid } from 'guid-typescript';
import { Trench } from '../trench';

export class GetTrenchesBySiteAction {
  public type: string = 'getTrenchesBySite';

  constructor (public siteID: Guid) {}
}

export class AddTrenchAction {
  public type: string = 'addTrench';

  constructor (public trench: Trench) {}
}