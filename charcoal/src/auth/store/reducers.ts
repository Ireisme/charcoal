import { AuthState } from "./state";
import { AuthActionTypes } from "./actions";
import { LOGIN_SUCCESS, LOGOUT_REQUEST, RENEW_SUCCESS } from "./requests";

const initialState: AuthState = {
  session: null
};

export function authReducer(state = initialState, action: AuthActionTypes): AuthState {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        session: action.session
      };
    case RENEW_SUCCESS:
      return {
        ...state,
        session: action.session
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        session: null
      };
    default:
      return state;
  }
}
