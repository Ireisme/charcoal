export const TOGGLE_DRAWER = <const> "TOGGLE_DRAWER";

export interface ToggleDrawerAction {
  type: typeof TOGGLE_DRAWER;
}

export function toggleDrawer() {
  return {
    type: TOGGLE_DRAWER
  };
}

export type HomeActionTypes = ToggleDrawerAction;
