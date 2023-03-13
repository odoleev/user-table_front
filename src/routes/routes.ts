import { AuthPage, TablePage, AuthEnum } from '../pages';

export const ROUTES = [
  {
    path: '/login',
    element: AuthPage,
    auth: false,
    type: AuthEnum.LOGIN,
  },
  {
    path: '/registration',
    element: AuthPage,
    auth: false,
    type: AuthEnum.REGISTRATION,
  },
  {
    path: '/table',
    element: TablePage,
    auth: true,
  },
];
