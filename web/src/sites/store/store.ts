import { Module } from 'vuex';

import { Site } from '../site';
import getters from "./getters";
import mutations from "./mutations";
import { AppState } from '../../store/store';
import actions from './actions';

export interface SiteState {
  sites: { [id: string]: Site}
}

const initialState: SiteState = {
  sites: {}
};

const module: Module<SiteState, AppState> = {
  state: initialState,
  getters: getters,
  mutations: mutations,
  actions: actions
};

export default { module };
