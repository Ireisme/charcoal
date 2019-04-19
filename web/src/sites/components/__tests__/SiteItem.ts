import { shallowMount, Wrapper } from '@vue/test-utils'
import SiteItem from '../SiteItem.vue'
import Vuetify from 'vuetify';
import Vue from 'vue';
import Router from 'vue-router';
import { Site } from '../../site';
import { Guid } from 'guid-typescript';

describe('SiteItem.vue', () => {
  beforeEach(() => {
    Vue.use(Vuetify);
    Vue.use(Router);
  });

  test('displays the site.Name', () => {
    const site = new Site(Guid.create(), 'A Test Site', 'https://real.image.com');
    const wrapper = shallowMount(SiteItem, {
      propsData: {
        site: site
      }
    });

    expect(wrapper.element.textContent).toMatch(site.Name)
  });
});