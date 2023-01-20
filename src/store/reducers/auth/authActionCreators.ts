import {
  AuthActionsEnum,
  SetAuthAction,
  SetLoadingAction,
  SetTokenAction,
  SetAlertAction,
} from './types';
import { AppDispatch } from '../../index';
import api from '../../../api/axiosClient';
import { IAlert } from '../../../components/Alert/types';
import { cleanAlertMessage } from '../../../utils/cleanAlert';
import { AlertStatusEnum } from '../../../models/alertStatus.model';
import { UsersActionCreators } from '../users/usersActionCreators';

export const AuthActionCreators = {
  setToken: (token: string): SetTokenAction => ({
    type: AuthActionsEnum.SET_TOKEN,
    payload: token,
  }),
  setAuth: (auth: boolean): SetAuthAction => ({
    type: AuthActionsEnum.SET_AUTH,
    payload: auth,
  }),
  setLoading: (isLoading: boolean): SetLoadingAction => ({
    type: AuthActionsEnum.SET_LOADING,
    payload: isLoading,
  }),
  setAlert: (alert: IAlert): SetAlertAction => ({
    type: AuthActionsEnum.SET_ALERT,
    payload: alert,
  }),
  login: (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setLoading(true));

      const result = await api.post('/auth/login', {
        email,
        password,
      });

      if (result.status === 200) {
        dispatch(UsersActionCreators.setError(false));
        dispatch(AuthActionCreators.setLoading(false));
        if (result.data.user.banned) {
          dispatch(
            AuthActionCreators.setAlert({
              alertStatus: AlertStatusEnum.DANGER,
              alertText: 'User blocked!',
            })
          );
        } else {
          dispatch(AuthActionCreators.setToken(result.data.accessToken));
          dispatch(AuthActionCreators.setAuth(true));
          dispatch(
            AuthActionCreators.setAlert({
              alertStatus: AlertStatusEnum.SUCCESS,
              alertText: 'Sign in successfully done!',
            })
          );

          localStorage.setItem('token', result.data.accessToken);
          localStorage.setItem('user', result.data.user.username);
          localStorage.setItem('id', result.data.user.id);
          localStorage.setItem('banned', String(result.data.user.banned));
        }
      }
      cleanAlertMessage(dispatch);
      return result.data.user.banned;
    } catch (e) {
      dispatch(AuthActionCreators.setLoading(false));
      dispatch(
        AuthActionCreators.setAlert({
          alertStatus: AlertStatusEnum.WARNING,
          alertText: 'Incorrect email or password',
        })
      );
      cleanAlertMessage(dispatch);
      console.log(e);
    }
  },
  registration:
    (email: string, password: string, username: string) =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(AuthActionCreators.setLoading(true));
        const result = await api.post('/auth/registration', {
          email,
          password,
          username,
        });
        if (result.status === 201) {
          dispatch(AuthActionCreators.setLoading(false));
          dispatch(AuthActionCreators.setAuth(false));
          dispatch(
            AuthActionCreators.setAlert({
              alertStatus: AlertStatusEnum.SUCCESS,
              alertText: 'Registration successfully done!',
            })
          );
          cleanAlertMessage(dispatch);
          return true;
        }
        return false;
      } catch (e) {
        dispatch(AuthActionCreators.setLoading(false));
        dispatch(
          AuthActionCreators.setAlert({
            alertStatus: AlertStatusEnum.WARNING,
            alertText: 'User with such email already exists',
          })
        );
        cleanAlertMessage(dispatch);
        return false;
      }
    },
  logout: () => async (dispatch: AppDispatch) => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('id');
      localStorage.removeItem('banned');
      dispatch(AuthActionCreators.setToken(''));
      dispatch(AuthActionCreators.setAuth(false));
    } catch (e) {
      console.log(e);
    }
  },
};
