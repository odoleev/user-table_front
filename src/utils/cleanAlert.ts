import { AuthActionCreators } from '../store/reducers/auth/authActionCreators';
import { AppDispatch } from '../store';

export function cleanAlertMessage(dispatch: AppDispatch): void {
  setTimeout(() => {
    dispatch(
      AuthActionCreators.setAlert({
        alertStatus: '',
        alertText: '',
      })
    );
  }, 3000);
}
