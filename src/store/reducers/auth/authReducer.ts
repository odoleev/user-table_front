import { AuthAction, AuthActionsEnum, IAuthState } from './types';

const initialState: IAuthState = {
  isAuth: false,
  token: '',
  userBanned: false,
  isLoading: false,
  alert: {
    alertStatus: '',
    alertText: '',
  },
};

export function authReducer(
  state = initialState,
  action: AuthAction
): IAuthState {
  switch (action.type) {
    case AuthActionsEnum.SET_AUTH:
      return { ...state, isAuth: action.payload, isLoading: false };
    case AuthActionsEnum.SET_ALERT:
      return { ...state, alert: action.payload, isLoading: false };
    case AuthActionsEnum.SET_TOKEN:
      return { ...state, token: action.payload };
    case AuthActionsEnum.SET_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}
