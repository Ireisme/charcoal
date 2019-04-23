import { getDrawerOpen } from "../store/selectors";

describe('getDrawerOpen', () => {
  it('should return drawerOpen from HomeState', () => {
    const state = {
      home: {
        drawerOpen: true
      }
    };

    const returned = getDrawerOpen(state);

    expect(returned).toStrictEqual(true);
  })
});