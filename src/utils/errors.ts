import { AxiosError } from 'axios';
import { AppDispatch } from '../store';
import { AuthActionCreators } from '../store/reducers/auth/authActionCreators';
import { AlertStatusEnum } from '../models/alertStatus.model';
import { tokenExpired } from './tokenExpired';
import { UsersActionCreators } from '../store/reducers/users/usersActionCreators';

export function errorsHandler(e: unknown, dispatch: AppDispatch) {
  if (e instanceof AxiosError) {
    if (e.response?.status === 500) {
      dispatch(
        AuthActionCreators.setAlert({
          alertStatus: AlertStatusEnum.WARNING,
          alertText: 'Server error',
        })
      );
    } else {
      dispatch(UsersActionCreators.setError(true));
      tokenExpired(dispatch);
    }
  } else {
    console.log(e);
  }
}
