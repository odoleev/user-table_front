export interface IAuthPage {
  type?: AuthEnum;
}

export enum AuthEnum {
  REGISTRATION = 'registration',
  LOGIN = 'login',
}
