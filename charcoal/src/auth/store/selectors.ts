import { AppState } from "../../store";

export const getAccessToken = ({ auth }: AppState) => auth.session ? auth.session.accessToken : '';

export const isAuthenticated = ({auth }: AppState) => {
  if(auth.session && new Date().getTime() < auth.session.expiresAt)
    return true;
  else return false;
};