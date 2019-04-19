import auth, { AuthState } from '../auth-store'

describe('auth-store', () => {
  describe('mutations', () => {
    describe('setAccessToken', () => {
      test('sets access token based on payload', () => {
        const state: AuthState = {
          accessToken: ''
        };
        const token = 'a new access token';
  
        let sut = auth.module.mutations || {};
        
        sut.setAccessToken(state, { accessToken: token});
  
        expect(state.accessToken).toEqual(token);
      });
    });
  });
});