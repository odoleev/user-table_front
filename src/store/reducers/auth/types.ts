import { IAlert } from '../../../components/Alert/types';

export interface IAuthState {
  isAuth: boolean;
  token: string;
  isLoading: boolean;
  userBanned: boolean;
  alert: IAlert;
}

export enum AuthActionsEnum {
  SET_AUTH = 'SET_AUTH',
  SET_TOKEN = 'SET_TOKEN',
  SET_ALERT = 'SET_ALERT',
  SET_LOADING = 'SET_LOADING',
}

export interface SetAuthAction {
  type: AuthActionsEnum.SET_AUTH;
  payload: boolean;
}

export interface SetAlertAction {
  type: AuthActionsEnum.SET_ALERT;
  payload: IAlert;
}

export interface SetTokenAction {
  type: AuthActionsEnum.SET_TOKEN;
  payload: string;
}

export interface SetLoadingAction {
  type: AuthActionsEnum.SET_LOADING;
  payload: boolean;
}

export type AuthAction =
  | SetAuthAction
  | SetAlertAction
  | SetLoadingAction
  | SetTokenAction;
