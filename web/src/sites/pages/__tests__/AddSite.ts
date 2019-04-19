import { shallowMount, Wrapper } from '@vue/test-utils'
import AddSite from '../AddSite.vue'
import Vuetify from 'vuetify';
import Vue from 'vue';
import { Guid } from 'guid-typescript';
import { AddSiteAction } from '../../store/action-types';
import { Site } from '../../site';

let mockRouter = {
  push: jest.fn()
};
let mockStore = {
  dispatch: jest.fn(),
  getters: {
    getSiteById: jest.fn(),
    getTrenchesBySite: jest.fn()
  }
};

describe('AddSite.vue', () => {
  beforeEach(() => {
    Vue.use(Vuetify);

    mockRouter.push.mockClear();
    mockStore.dispatch.mockClear();
  });

  describe('submit', () => {
    test('should dispatch AddSiteAction', () => {
      const name = 'Test Site';
      const imageURL = 'https://this.is.real';

      const wrapper = shallowMount(AddSite, {
        mocks: {
          $router: mockRouter,
          $store: mockStore
        },
        stubs: ['router-link']
      });

      const sut = wrapper.vm as any;
      sut.submit(name, imageURL);

      const addedSite: AddSiteAction = mockStore.dispatch.mock.calls[0][0];
      expect(addedSite.site.Name).toEqual(name);
      expect(addedSite.site.ImageURL).toEqual(imageURL);
    });

    test('should route to "list"', () => {
      const name = 'Test Site';
      const imageURL = 'https://this.is.real';

      const wrapper = shallowMount(AddSite, {
        mocks: {
          $router: mockRouter,
          $store: mockStore
        },
        stubs: ['router-link']
      });

      const sut = wrapper.vm as any;
      sut.submit(name, imageURL);

      expect(mockRouter.push.mock.calls[0][0]).toEqual('list')
    });
  });

  describe('back', () => {
    test('should route to "list"', () => {
      const wrapper = shallowMount(AddSite, {
        mocks: {
          $router: mockRouter,
          $store: mockStore
        },
        stubs: ['router-link']
      });

      const sut = wrapper.vm as any;
      sut.back();

      expect(mockRouter.push.mock.calls[0][0]).toEqual('list')
    });
  });
});
