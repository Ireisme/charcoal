import { AuthSession } from "./state";

export const SET_SESSION = <const> 'SET_SESSION';
export const CLEAR_SESSION = <const> 'CLEAR_SESSON';

export interface SetSessionAction {
  type: typeof SET_SESSION;
  session: AuthSession;
}

export function setSession(session: AuthSession) {
  return {
    type: SET_SESSION,
    session
  };
}

export interface ClearSessionAction {
  type: typeof CLEAR_SESSION;
}

export function clearSession() {
  return {
    type: CLEAR_SESSION
  };
}

export type AuthActionTypes = SetSessionAction | ClearSessionAction;
