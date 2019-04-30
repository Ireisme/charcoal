import { AuthSession } from "./state";

export const LOGIN_REQUEST = <const>'LOGIN_REQUEST';
export const LOGIN_SUCCESS = <const>'LOGIN_SUCCESS';
export const LOGIN_FAILURE = <const>'LOGIN_FAILURE';

export interface LoginRequest {
  type: typeof LOGIN_REQUEST;
}

export function loginRequest(): LoginRequest {
  return {
    type: LOGIN_REQUEST
  };
}

export interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  session: AuthSession;
}

export function loginSuccess(session: AuthSession): LoginSuccess {
  return {
    type: LOGIN_SUCCESS,
    session: session
  };
}

export interface LoginFailure {
  type: typeof LOGIN_FAILURE;
  error: Error;
}

export function loginFailure(error: Error): LoginFailure {
  return {
    type: LOGIN_FAILURE,
    error: error
  };
}

export const RENEW_REQUEST = <const>'RENEW_REQUEST';
export const RENEW_SUCCESS = <const>'RENEW_SUCCESS';
export const RENEW_FAILURE = <const>'RENEW_FAILURE';

export interface RenewRequest {
  type: typeof RENEW_REQUEST;
}

export function renewRequest(): RenewRequest {
  return {
    type: RENEW_REQUEST
  };
}

export interface RenewSuccess {
  type: typeof RENEW_SUCCESS;
  session: AuthSession;
}

export function renewSuccess(session: AuthSession): RenewSuccess {
  return {
    type: RENEW_SUCCESS,
    session: session
  };
}

export interface RenewFailure {
  type: typeof RENEW_FAILURE;
  error: Error;
}

export function renewFailure(error: Error): RenewFailure {
  return {
    type: RENEW_FAILURE,
    error: error
  };
}