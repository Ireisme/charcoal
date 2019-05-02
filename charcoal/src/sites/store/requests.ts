import { Site } from "../site";

export const GETALLSITES_REQUEST = <const>'GETALLSITES_REQUEST';
export const GETALLSITES_SUCCESS = <const>'GETALLSITES_SUCCESS';
export const GETALLSITES_FAILURE = <const>'GETALLSITES_FAILURE';

export interface GetAllSitesRequest {
  type: typeof GETALLSITES_REQUEST;
}

export function getAllSitesRequest(): GetAllSitesRequest {
  return {
    type: GETALLSITES_REQUEST
  };
}

export interface GetAllSitesSuccess {
  type: typeof GETALLSITES_SUCCESS;
  sites: Site[];
}

export function getAllSitesSuccess(sites: Site[]): GetAllSitesSuccess {
  return {
    type: GETALLSITES_SUCCESS,
    sites: sites
  };
}

export interface GetAllSitesFailure {
  type: typeof GETALLSITES_FAILURE;
  error: Error;
}

export function getAllSitesFailure(error: Error): GetAllSitesFailure {
  return {
    type: GETALLSITES_FAILURE,
    error: error
  };
}