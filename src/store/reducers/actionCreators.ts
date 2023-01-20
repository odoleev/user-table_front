import { AuthActionCreators } from './auth/authActionCreators';
import { UsersActionCreators } from './users/usersActionCreators';

export const allActionCreators = {
  ...AuthActionCreators,
  ...UsersActionCreators,
};
