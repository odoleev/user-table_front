export interface IUser {
  email: string;
  username: string;
  id: string;
  dateReg: string;
  banned: boolean;
  dateLastLogin?: string;
}

export type TUsers = Array<IUser>;

export interface IUsersState {
  users: TUsers;
  error: boolean;
}

export enum UsersActionEnum {
  SET_USERS = 'SET_USERS',
  SET_ERROR = 'SET_ERROR',
}

export interface SetUsersAction {
  type: UsersActionEnum.SET_USERS;
  payload: TUsers;
}

export interface SetErrorAction {
  type: UsersActionEnum.SET_ERROR;
  payload: boolean;
}

export type UsersActions = SetUsersAction | SetErrorAction;
