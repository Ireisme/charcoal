import { TOGGLE_DRAWER, toggleDrawer } from "../store/actions";

describe('homeActions', () => {
  describe('toggleDrawer', () => {
    it('should create an action to toggle the drawer', () => {
      const expected = {
        type: TOGGLE_DRAWER
      };

      const returned = toggleDrawer();

      expect(returned).toEqual(expected);
    });
  })
})