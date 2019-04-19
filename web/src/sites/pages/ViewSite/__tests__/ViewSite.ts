import { shallowMount, Wrapper } from '@vue/test-utils'
import ViewSite from '../ViewSite.vue'
import Vuetify from 'vuetify';
import Vue from 'vue';
import { GetTrenchesBySiteAction } from '../../../../trenches/store/action-types';
import { Guid } from 'guid-typescript';
import { Site } from '../../../site';
import { Trench } from '../../../../trenches/trench';

let mockRoute = {
  params: {
    siteId: ''
  }
};
let mockStore = {
  dispatch: jest.fn(),
  getters: {
    getSiteById: jest.fn(),
    getTrenchesBySite: jest.fn()
  }
};

describe('ViewSite.vue', () => {
  beforeEach(() => {
    Vue.use(Vuetify);

    mockStore.dispatch.mockClear();
  });

  describe('created', () => {
    test('should dispatch GetTrenchesBySite', () => {
      const siteID = Guid.create();
      mockRoute.params.siteId = siteID.toString();

      const wrapper = shallowMount(ViewSite, {
        mocks: {
          $route: mockRoute,
          $store: mockStore
        },
        stubs: ['router-link']
      });

      expect(mockStore.dispatch.mock.calls[0][0]).toEqual(new GetTrenchesBySiteAction(siteID));
    });
  });

  describe('site', () => {
    test('should return Site from $store', () => {
      const siteID = Guid.create();
      const site = new Site(siteID, 'Test Site', 'https://real.image.url');
      mockRoute.params.siteId = siteID.toString();
      mockStore.getters.getSiteById.mockReturnValueOnce(site);

      const wrapper = shallowMount(ViewSite, {
        mocks: {
          $route: mockRoute,
          $store: mockStore
        },
        stubs: ['router-link']
      });

      const sut = wrapper.vm as any;

      expect(sut.site).toEqual(site);
    });
  });

  describe('trenches', () => {
    test('should return an empty array when site is null', () => {
      const siteID = Guid.create();
      mockRoute.params.siteId = siteID.toString();
      mockStore.getters.getSiteById.mockReturnValue(null);

      const wrapper = shallowMount(ViewSite, {
        mocks: {
          $route: mockRoute,
          $store: mockStore
        },
        stubs: ['router-link']
      });

      const sut = wrapper.vm as any;

      expect(sut.trenches).toEqual([]);
    });

    test('should return trenches from $store when site exists', () => {
      const siteID = Guid.create();
      const site = new Site(siteID, 'Test Site', 'https://real.image.url');
      mockRoute.params.siteId = siteID.toString();
      mockStore.getters.getSiteById.mockReturnValueOnce(site);

      const trenches = [
        new Trench(Guid.create(), Guid.create(), 'First Trench'),
        new Trench(Guid.create(), Guid.create(), 'Second Trench')
      ];
      mockStore.getters.getTrenchesBySite.mockReturnValue(trenches);

      const wrapper = shallowMount(ViewSite, {
        mocks: {
          $route: mockRoute,
          $store: mockStore
        },
        stubs: ['router-link']
      });

      const sut = wrapper.vm as any;

      expect(sut.trenches).toEqual(trenches);
    });
  });
});