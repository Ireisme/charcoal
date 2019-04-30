import { AuthState } from "./state";
import { AuthActionTypes, SET_SESSION, CLEAR_SESSION } from "./actions";

const initialState: AuthState = {
  session: null
};

export function authReducer(state = initialState, action: AuthActionTypes): AuthState {
  switch (action.type) {
    case SET_SESSION:
      return {
        ...state,
        session: action.session
      };
    case CLEAR_SESSION:
      return {
        ...state,
        session: null
      };
    default:
      return state;
  }
}
