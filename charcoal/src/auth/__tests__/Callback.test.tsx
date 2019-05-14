import React from 'react';
import { Callback } from "../Callback";
import { shallow } from "enzyme";
import { Location, History } from 'history';
import Auth from '../auth-service';
import { AuthSession } from '../store/state';

jest.mock('../auth-service');
const mockDecodeHash = jest.fn();

describe('Callback.tsx', () => {
  beforeAll(() => {
    (Auth as any).mockImplementation(() => {
      return {
        decodeHash: mockDecodeHash
      };
    });
  });

  it('renders without crashing', () => {
    shallow(<Callback
      hashDecoded={() => { }}
      hashDecodingFailure={() => { }}
      history={{} as any}
      location={{} as any}
      match={{} as any} />
    );
  });

  describe('componentDidMount', () => {
    const regexCases = [
      ['should', 'access_token'],
      ['should', 'id_token'],
      ['should', 'error'],
      ['should not', 'somethingelse'],
      ['should not', '']
    ];

    it.each(regexCases)('%s call decodeHash when hash is %s', (shouldCallDecodeHash, hash) => {
      const locationMock = {
        hash: hash
      } as Location<any>;
      mockDecodeHash.mockReturnValue(Promise.resolve());

      shallow(<Callback
        hashDecoded={() => { }}
        hashDecodingFailure={() => { }}
        history={{} as any}
        location={locationMock}
        match={{} as any} />
      );

      if (shouldCallDecodeHash)
        expect(mockDecodeHash).toHaveBeenCalled();
      else
        expect(mockDecodeHash).not.toHaveBeenCalled();
    });

    it('should redirect and call hashDecoded on decodeHash resolving', () => {
      const locationMock = {
        hash: 'access_token'
      } as Location<any>;
      const historyMock = {} as History;
      historyMock.push = jest.fn();
      const authSession: AuthSession = {
        idToken: 'id_token',
        accessToken: 'access_token',
        expiresAt: 12345
      };
      const promise = Promise.resolve(authSession);
      mockDecodeHash.mockReturnValue(promise);
      const mockHashDecoded = jest.fn();

      shallow(<Callback
        hashDecoded={mockHashDecoded}
        hashDecodingFailure={() => { }}
        history={historyMock}
        location={locationMock}
        match={{} as any} />
      );

      return promise.then(() => {
        expect(mockHashDecoded).toHaveBeenCalledWith(authSession);
        expect(historyMock.push).toHaveBeenCalledWith('/home');
      });
    });

    it('should redirect and call hashDecodingFailure on decodeHash rejecting', () => {
      const locationMock = {
        hash: 'access_token'
      } as Location<any>;
      const historyMock = {} as History;
      historyMock.push = jest.fn();
      const error = {
        error: 'something broke'
      };
      const promise = Promise.reject(error);
      mockDecodeHash.mockReturnValue(promise);
      const mockHashDecodingFailure = jest.fn();

      shallow(<Callback
        hashDecoded={() => { }}
        hashDecodingFailure={mockHashDecodingFailure}
        history={historyMock}
        location={locationMock}
        match={{} as any} />
      );
      return promise.catch(() => {
        expect(mockHashDecodingFailure).toHaveBeenCalledWith(error);
        expect(historyMock.push).toHaveBeenCalledWith('/landing');
      });
    });
  });
});