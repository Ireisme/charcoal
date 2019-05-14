import { LoginRequest, LoginSuccess, LoginFailure, RenewRequest, RenewSuccess, RenewFailure, LogoutRequest } from "./requests";

export type AuthActionTypes = 
  LoginRequest |
  LoginSuccess |
  LoginFailure |
  RenewRequest |
  RenewSuccess |
  RenewFailure |
  LogoutRequest;
