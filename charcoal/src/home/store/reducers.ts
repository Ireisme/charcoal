import { HomeState } from "./state";
import { HomeActionTypes, TOGGLE_DRAWER } from "./actions";

const initialState: HomeState = {
  drawerOpen: false
};

export function homeReducer(state = initialState, action: HomeActionTypes): HomeState {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return {
        ...state,
        drawerOpen: !state.drawerOpen
      };
    default:
      return state;
  }
}
