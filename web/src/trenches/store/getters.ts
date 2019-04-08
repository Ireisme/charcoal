import { Guid } from 'guid-typescript';
import { Trench } from '../trench';
import { TrenchState } from './store';

const getters = {
  listTrenches: (state: TrenchState) => Object.values(state.trenches),
  getTrenchesBySite: (state: TrenchState, getters: any) => (siteId: Guid) => {
    let trenches: Trench[] = getters.listTrenches;
    return trenches.filter(t => t.SiteID == siteId) || [];
  }
}

export default getters;