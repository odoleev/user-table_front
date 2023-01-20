import {
  IUser,
  SetErrorAction,
  SetUsersAction,
  TUsers,
  UsersActionEnum,
} from './types';
import { AppDispatch } from '../../index';
import api from '../../../api/axiosClient';
import { errorsHandler } from '../../../utils/errors';
import { checkForBanOrDelete } from '../../../utils/checkForBan';

export const UsersActionCreators = {
  setUsers: (users: TUsers): SetUsersAction => ({
    type: UsersActionEnum.SET_USERS,
    payload: users,
  }),
  setError: (error: boolean): SetErrorAction => ({
    type: UsersActionEnum.SET_ERROR,
    payload: error,
  }),
  getUsers: () => async (dispatch: AppDispatch) => {
    try {
      const usersFromApi: TUsers = [];
      const result = await api.get('/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(UsersActionCreators.setError(false));
      result.data.map((el: IUser) => {
        const user = {
          email: el.email,
          username: el.username,
          id: el.id,
          dateReg: el.dateReg,
          banned: el.banned,
          dateLastLogin: el.dateLastLogin,
        };
        usersFromApi.push(user);
      });
      checkForBanOrDelete({
        users: usersFromApi,
        id: localStorage.getItem('id'),
      });
      dispatch(UsersActionCreators.setUsers(usersFromApi));
    } catch (e) {
      errorsHandler(e, dispatch);
    }
  },
  blockUser: (id: string) => async (dispatch: AppDispatch) => {
    try {
      await api.patch(
        `/users/block/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
    } catch (e: unknown) {
      errorsHandler(e, dispatch);
    }
  },
  unblockUser: (id: string) => async (dispatch: AppDispatch) => {
    try {
      await api.patch(
        `/users/unblock/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
    } catch (e) {
      errorsHandler(e, dispatch);
    }
  },
  deleteUser: (id: string) => async (dispatch: AppDispatch) => {
    try {
      await api.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    } catch (e) {
      errorsHandler(e, dispatch);
    }
  },
};
