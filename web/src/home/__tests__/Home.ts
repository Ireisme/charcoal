import { shallowMount, Wrapper } from '@vue/test-utils'
import Home from '../Home.vue'
import { GetSitesAction } from '../../sites/store/action-types';
import Vuetify from 'vuetify';
import Vue from 'vue';
import Router from 'vue-router';

let mockAuth = {
  logOut: jest.fn()
};
let mockStore = {
  dispatch: jest.fn()
};

describe('Home.vue', () => {
  beforeEach(() => {
    Vue.use(Vuetify);
    Vue.use(Router);

    mockAuth.logOut.mockClear();
    mockStore.dispatch.mockClear();
  });

  describe('created', () => {
    test('dispatches GetSites', () => {
      const wrapper = shallowMount(Home, {
        mocks: {
          $auth: mockAuth,
          $store: mockStore
        }
      });

      expect(mockStore.dispatch.mock.calls[0][0]).toEqual(new GetSitesAction());
    });
  });

  describe('logout', () => {
    test('calls $auth.logOut', () => {
      const wrapper = shallowMount(Home, {
        mocks: {
          $auth: mockAuth,
          $store: mockStore
        }
      });
      const sut = wrapper.vm as any;
      sut.logout();
  
      expect(mockAuth.logOut).toHaveBeenCalled();
    });
  });
});