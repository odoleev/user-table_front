import { IUsersState, UsersActionEnum, UsersActions } from './types';

const initialState: IUsersState = {
  users: [],
  error: false,
};

export function usersReducer(
  state = initialState,
  action: UsersActions
): IUsersState {
  switch (action.type) {
    case UsersActionEnum.SET_USERS:
      return { ...state, users: action.payload };
    case UsersActionEnum.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
