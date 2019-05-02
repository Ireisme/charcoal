import { call, put, takeLatest, take, race, delay, all, takeEvery } from 'redux-saga/effects'
import Auth from '../auth';
import { renewRequest, RENEW_SUCCESS, RENEW_FAILURE, logoutRequest, renewSuccess, renewFailure, LOGIN_REQUEST, LOGOUT_REQUEST, RENEW_REQUEST, LOGIN_SUCCESS } from './requests';
import { SetSessionAction, SET_SESSION } from './actions';
import Axios from 'axios';

const auth = new Auth();

function* login() {
  yield call(auth.login);
};

function* renew() {
  try {
    const session = yield call(auth.renewSession);
    yield put(renewSuccess(session));
  } catch(error) {
    yield put(renewFailure(error));
  }
}

function* logout() {
  yield call(auth.logout);
}

interface Action {
  type: string;
}

const ignoreActionTypes = ['RENEW_REQUEST']

function monitorableAction(action: Action) {
  return action.type
    .includes('REQUEST') && ignoreActionTypes
      .every(fragment => !action.type.includes(fragment))
}

function identifyAction(action: Action) {
  return action.type.split('_').slice(0, -1).join('_')
}
function getSuccessType(action: Action) {
  return `${identifyAction(action)}_SUCCESS`
}
function getFailType(action: Action) {
  return `${identifyAction(action)}_FAILURE`
}

function* monitor(monitoredAction: Action) {
  console.log('started monitoring', monitoredAction.type)
  const { fail } = yield race({
    success: take(getSuccessType(monitoredAction)),
    fail: take(getFailType(monitoredAction)),
  });

  if (fail && fail.error && fail.error.response && fail.error.response.status === 401) {
    console.log('detected 401, refreshing token')
    yield put(renewRequest())

    const { success } = yield race({
      success: take(RENEW_SUCCESS),
      fail: take(RENEW_FAILURE),
    })

    if (success) {
      console.log('token refreshed, retrying', monitoredAction.type)
      yield put(monitoredAction)
    } else {
      console.log('token refresh failed, logging out user')
      yield put(logoutRequest())
    }
  }

  console.log('monitoring', monitoredAction.type, 'finished')
}

function* setAxiosHeader(action: SetSessionAction) {
  yield Axios.defaults.headers = {
    Authorization: `Bearer ${action.session.accessToken}`
  };
}

export default [
  takeLatest(LOGIN_REQUEST, login),
  takeLatest(RENEW_REQUEST, renew),
  takeLatest(LOGOUT_REQUEST, logout),
  takeEvery(monitorableAction, monitor),
  takeEvery([LOGIN_SUCCESS, RENEW_SUCCESS], setAxiosHeader)
];