import { Trench } from '../../trenches/trench';

export class AddTrenchMutation {
  public type: string = 'addTrench';

  constructor (public trench: Trench) { }
}