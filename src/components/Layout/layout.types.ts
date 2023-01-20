import { FC } from 'react';
import { AuthEnum, IAuthPage } from '../../pages';

export interface IPagesLayout {
  type?: AuthEnum;
  element: FC<IAuthPage>;
}
