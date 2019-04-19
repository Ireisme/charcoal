import { shallowMount, Wrapper } from '@vue/test-utils'
import SiteForm from '../SiteForm.vue'
import Vuetify from 'vuetify';
import Vue from 'vue';
import Router from 'vue-router';
import { Site } from '../../site';
import { Guid } from 'guid-typescript';
import Vuelidate from 'vuelidate';

describe('SiteForm.vue', () => {
  beforeEach(() => {
    Vue.use(Vuetify);
    Vue.use(Router);
  });

  describe('submit', () => {
    test('should call onSubmit when form is valid', () => {
      const onSubmit = jest.fn();
      const validateMock = {
        $invalid: false
      };
      const siteName = 'a site name';
      const imageUrl = 'http://real.image.url';
      const wrapper = shallowMount(SiteForm, {
        propsData: {
          onSubmit: onSubmit
        },
        mocks: {
          $v: validateMock
        },
        data: () => ({
          siteName: siteName,
          imageUrl: imageUrl
        })
      });

      const sut = wrapper.vm as any;

      sut.submit();

      expect(onSubmit.mock.calls[0][0]).toEqual(siteName);
      expect(onSubmit.mock.calls[0][1]).toEqual(imageUrl);
    });

    test('should not call onSubmit when form is invalid', () => {
      const onSubmit = jest.fn();
      const validateMock = {
        $invalid: true
      };
      const wrapper = shallowMount(SiteForm, {
        propsData: {
          onSubmit: onSubmit
        },
        mocks: {
          $v: validateMock
        }
      });

      const sut = wrapper.vm as any;

      sut.submit();

      expect(onSubmit).toHaveBeenCalledTimes(0);
    });
  });

  describe('cancel', () => {
    test('should call onCancel', () => {
      const onCancel = jest.fn();
      const wrapper = shallowMount(SiteForm, {
        propsData: {
          onCancel: onCancel
        }
      });
  
      const sut = wrapper.vm as any;
  
      sut.cancel();
  
      expect(onCancel).toHaveBeenCalled();
    });
  });

  describe('validateName', () => {
    let validate = {
      siteName: {
        $touch: () => {},
        $dirty: true,
        required: false
      }
    };

    test('should have no errors when siteName is not dirty', () => {
      validate.siteName.$dirty = false;
      validate.siteName.required = false;
      const wrapper = shallowMount(SiteForm, {
        mocks: {
          $v: validate
        }
      });

      const sut = wrapper.vm as any;
  
      sut.validateName();
  
      expect(sut.nameErrors).toHaveLength(0);
    });

    test('should have no errors when siteName is dirty and is not empty', () => {
      validate.siteName.$dirty = true;
      validate.siteName.required = true;
      const wrapper = shallowMount(SiteForm, {
        mocks: {
          $v: validate
        }
      });

      const sut = wrapper.vm as any;
  
      sut.validateName();
  
      expect(sut.nameErrors).toHaveLength(0);
    });

    test('should have errors when siteName is dirty and is empty', () => {
      validate.siteName.$dirty = true;
      validate.siteName.required = false;
      const wrapper = shallowMount(SiteForm, {
        mocks: {
          $v: validate
        }
      });

      const sut = wrapper.vm as any;
  
      sut.validateName();
  
      expect(sut.nameErrors).toContain('Name is required');
    });
  });

  describe('validateImageUrl', () => {
    let validate = {
      imageUrl: {
        $touch: () => {},
        $dirty: true,
        url: false
      }
    };

    test('should have no errors when imageUrl is not dirty', () => {
      validate.imageUrl.$dirty = false;
      validate.imageUrl.url = false;
      const wrapper = shallowMount(SiteForm, {
        mocks: {
          $v: validate
        }
      });

      const sut = wrapper.vm as any;
  
      sut.validateImageUrl();
  
      expect(sut.imageUrlErrors).toHaveLength(0);
    });

    test('should have no errors when imageUrl is dirty and is a url', () => {
      validate.imageUrl.$dirty = true;
      validate.imageUrl.url = true;
      const wrapper = shallowMount(SiteForm, {
        mocks: {
          $v: validate
        }
      });

      const sut = wrapper.vm as any;
  
      sut.validateImageUrl();
  
      expect(sut.imageUrlErrors).toHaveLength(0);
    });

    test('should have errors when imageUrl is dirty and is not a url', () => {
      validate.imageUrl.$dirty = true;
      validate.imageUrl.url = false;
      const wrapper = shallowMount(SiteForm, {
        mocks: {
          $v: validate
        }
      });

      const sut = wrapper.vm as any;
  
      sut.validateImageUrl();
  
      expect(sut.imageUrlErrors).toContain('Must be a valid url');
    });
  });
});