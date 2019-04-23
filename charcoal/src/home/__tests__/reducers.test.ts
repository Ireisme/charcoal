import { HomeState } from "../store/state";
import { homeReducer } from "../store/reducers";
import { TOGGLE_DRAWER } from "../store/actions";

describe('homeReducer', () => {
  describe('TOGGLE_DRAWER', () => {
    const cases = [
      [true, false],
      [false, true]
    ];

    test.each(cases)('should toggle drawerOpen', (expected, initial) => {
      const state: HomeState = {
        drawerOpen: initial
      };

      const returned = homeReducer(state, { type: TOGGLE_DRAWER });

      expect(returned.drawerOpen).toEqual(expected);
    });
  });

  describe('default', () => {
    it('should return the unmodified state', () => {
      const state: HomeState = {
        drawerOpen: true
      };

      const returned = homeReducer(state, { type: 'UNKNOWN'} as any);
      expect(returned).toBe(state);
    });
  });

  it('should return initial state when state is undefined', () => {
    const expected = {
      drawerOpen: false
    };

    const returned = homeReducer(undefined, {} as any);
    expect(returned).toEqual(expected);
  });
});