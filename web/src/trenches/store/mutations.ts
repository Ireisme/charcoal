import { TrenchState } from "./store";
import { AddTrenchMutation } from './mutation-types';

const mutations = {
  addTrench (state: TrenchState, payload: AddTrenchMutation) {
    state.trenches = {
      ...state.trenches,
      [payload.trench.ID.toString()]: payload.trench
    };
  }
};

export default mutations;