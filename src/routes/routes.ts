import { AuthPage } from '../pages/Auth/Auth';
import { TablePage } from '../pages/Table/Table';
import { AuthEnum } from '../pages/pages.types';

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
