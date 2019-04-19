import { shallowMount, Wrapper } from '@vue/test-utils'
import SiteList from '../SiteList.vue'
import Vuetify from 'vuetify';
import Vue from 'vue';
import { Guid } from 'guid-typescript';
import { Site } from '../../site';

let mockRouter = {
  push: jest.fn()
};
let mockStore = {
  getters: {
    listSites: [] as Site[]
  }
};

describe('SiteList.vue', () => {
  beforeEach(() => {
    Vue.use(Vuetify);

    mockRouter.push.mockClear();
  });

  describe('sites', () => {
    test('should return Sites from $store', () => {
      const sites: Site[] = [
        { ID: Guid.create(), Name: 'First Site', ImageURL: 'picture1' },
        { ID: Guid.create(), Name: 'Second Site', ImageURL: 'picture2' },
        { ID: Guid.create(), Name: 'Third Site', ImageURL: 'picture13' }
      ];
      mockStore.getters.listSites = [...sites];

      const wrapper = shallowMount(SiteList, {
        mocks: {
          $router: mockRouter,
          $store: mockStore
        },
        stubs: ['router-link']
      });

      const sut = wrapper.vm as any;
      const returned = sut.sites;

      expect(returned).toEqual(sites);
    });

  });
});
