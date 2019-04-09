import { ModuleTree, Module } from 'vuex';
import { AppState } from '../store/store';

export interface AuthState {
  accessToken: string
}

const initialState: AuthState = {
  accessToken: ''
};
 
const module: Module<AuthState, AppState> = {
  state: initialState,
  getters: {},
  mutations: {
    setAccessToken (state: AuthState, payload: { accessToken: string}) {
      state.accessToken = payload.accessToken;
    },
  }
};

export default { module };