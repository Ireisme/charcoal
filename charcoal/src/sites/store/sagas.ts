import { call, takeLatest, put } from 'redux-saga/effects'
import { SiteService } from '../site-service';
import { GETALLSITES_REQUEST, getAllSitesSuccess, getAllSitesFailure } from './requests';

function* getAllSites() {
  const siteService = new SiteService();
  try {
    const sites = yield call(siteService.getSites);
    yield put(getAllSitesSuccess(sites));
  }
  catch(error) {
    yield put(getAllSitesFailure(error));
  }
};

export default [
  takeLatest(GETALLSITES_REQUEST, getAllSites)
];