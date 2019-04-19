import { shallowMount } from '@vue/test-utils'
import Callback from '../callback/callback'

describe('Callback.vue', () => {
  describe('created', () => {
    test('calls router on create', () => {
      let mockAuth = {
        handleAuthentication: jest.fn(() => Promise.resolve())
      };
      let mockPush = jest.fn();
      let mockRouter = {
        push: mockPush
      };
  
      const wrapper = shallowMount(Callback, {
        mocks: {
          $auth: mockAuth,
          $router: mockRouter
        }
      });
  
      return mockAuth.handleAuthentication().then(() => expect(mockPush.mock.calls[0][0]).toBe('/home'));
    });
  });
});