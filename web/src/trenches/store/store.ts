import { Trench } from '../trench';
import { Module } from 'vuex';
import { AppState } from '../../store/store';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export interface TrenchState {
  trenches: { [id: string]: Trench}
}

const initialState = {
  trenches: {}
};

const module: Module<TrenchState, AppState> = {
  state: initialState,
  getters: getters,
  mutations: mutations,
  actions: actions
};

export default { module };