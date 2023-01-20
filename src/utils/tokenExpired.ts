import { AppDispatch } from '../store';
import { AuthActionCreators } from '../store/reducers/auth/authActionCreators';
import { AlertStatusEnum } from '../models/alertStatus.model';
import { cleanAlertMessage } from './cleanAlert';

export function tokenExpired(dispatch: AppDispatch) {
  dispatch(
    AuthActionCreators.setAlert({
      alertStatus: AlertStatusEnum.WARNING,
      alertText: 'Jwt token expired',
    })
  );
  cleanAlertMessage(dispatch);
}
