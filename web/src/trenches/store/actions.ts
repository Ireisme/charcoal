import { ActionTree } from "vuex";
import { TrenchState } from './store';
import { AppState } from '../../store/store';
import { GetTrenchesBySiteAction, AddTrenchAction } from './action-types';
import { TrenchService } from '../trench-service';
import { AddTrenchMutation } from './mutation-types';

const actions: ActionTree<TrenchState, AppState> = {
  getTrenchesBySite (context, payload: GetTrenchesBySiteAction) {
    new TrenchService().getTrenchesBySite(payload.siteID)
    .then(trenches => trenches.forEach(trench => context.commit(new AddTrenchMutation(trench))))
  },
  addTrench (context, payload: AddTrenchAction) {
    new TrenchService().addTrench(payload.trench)
    .then(() => context.commit(new AddTrenchMutation(payload.trench)))
  }
};

export default actions;