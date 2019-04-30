import { Dispatch } from "redux";
import Auth from "../auth";
import { setSession, clearSession } from "./actions";

const auth = new Auth();

export function login() {
  return () => {
    auth.login();

    return Promise.resolve();
  };
};

export function logout() {
  return (dispatch: Dispatch) => {
    auth.logout();
    dispatch(clearSession());

    return Promise.resolve();
  };
};

export function renewSession() {
  return (dispatch: Dispatch) => {
    const promise = auth.renewSession();
    promise.then(
      session => dispatch(setSession(session)),
      err => console.log(err)
    );

    return promise;
  };
};

export function decodeHash() {
  return (dispatch: Dispatch) => {
    const promise = auth.decodeHash();
    promise.then(
      session => dispatch(setSession(session)),
      err => console.log(err)
    );

    return promise;
  };
};