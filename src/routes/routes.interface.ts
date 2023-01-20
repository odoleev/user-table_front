import { FC } from 'react';
import { AuthEnum } from '../pages';

export interface IRoutes {
  path: string;
  element: FC;
  auth: boolean;
  type: AuthEnum;
}
