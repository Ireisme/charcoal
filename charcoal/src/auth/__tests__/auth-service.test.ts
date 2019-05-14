import auth0 from 'auth0-js';
import AuthService from '../auth-service';
import { AuthSession } from '../store/state';

const mockAuthorize = jest.fn();
const mockParseHash = jest.fn();
const mockCheckSession = jest.fn();
const mockLogout = jest.fn();
auth0.WebAuth = jest.fn().mockImplementation(() => ({
  authorize: mockAuthorize,
  parseHash: mockParseHash,
  checkSession: mockCheckSession,
  logout: mockLogout
}));

describe('auth-service', () => {
  beforeEach(() => {
    (auth0.WebAuth as any).mockClear();
    mockAuthorize.mockClear();
    mockParseHash.mockClear();
    mockCheckSession.mockClear();
    mockLogout.mockClear();
  });

  describe('login', () => {
    it('should call auth0.authorize', () => {
      const sut = new AuthService();

      sut.login();

      expect(mockAuthorize).toHaveBeenCalledWith({ responseType: 'token id_token' });
    });
  });

  describe('decodeHash', () => {
    it('should return a promise that resolves an AuthSession on success', () => {
      const time = Date.now();
      Date.now = jest.fn().mockReturnValue(time);
      const idToken = 'this is an id token';
      const accessToken = 'this is an access token';
      const expiresIn = 55555;
      const authResult = {
        accessToken: accessToken,
        idToken: idToken,
        expiresIn: expiresIn
      };
      const expected: AuthSession = {
        idToken: idToken,
        accessToken: accessToken,
        expiresAt: (expiresIn * 1000) + time
      };
      mockParseHash.mockImplementation(f => f(null, authResult));
      const sut = new AuthService();

      return expect(sut.decodeHash()).resolves.toEqual(expected);
    });

    it('should return a promise that rejects with an error on failure', () => {
      const error = {
        error: 'it is broke'
      };
      mockParseHash.mockImplementation(f => f(error));

      const sut = new AuthService();

      return expect(sut.decodeHash()).rejects.toEqual(error.error);
    });
  });

  describe('renewSession', () => {
    it('should return a promise that resolves an AuthSession on success', () => {
      const time = Date.now();
      Date.now = jest.fn().mockReturnValue(time);
      const idToken = 'this is another id token';
      const accessToken = 'this is another access token';
      const expiresIn = 44444;
      const authResult = {
        accessToken: accessToken,
        idToken: idToken,
        expiresIn: expiresIn
      };
      const expected: AuthSession = {
        idToken: idToken,
        accessToken: accessToken,
        expiresAt: (expiresIn * 1000) + time
      };
      mockCheckSession.mockImplementation((config, f) => {
        if(config.responseType == 'token id_token')
          f(null, authResult);
      });
      const sut = new AuthService();

      return expect(sut.renewSession()).resolves.toEqual(expected);
    });

    it('should return a promise that rejects with an error and call auth0.logout on failure', () => {
      const authError = {
        error: 'it is broke'
      };
      mockCheckSession.mockImplementation((config, f) => f(authError));

      const sut = new AuthService();

      return sut.renewSession().catch(error => {
        expect(error).toEqual(authError.error);
        expect(mockLogout).toHaveBeenCalledWith({ returnTo: window.location.origin });
      });
    });
  });

  describe('logout', () => {
    it('should call auth0.logout', () => {
      let sut = new AuthService();

      sut.logout();
  
      expect(mockLogout).toHaveBeenCalledWith({ returnTo: window.location.origin });
    });
  });
});