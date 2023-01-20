import React from 'react';
import { TUsers } from '../../../store/reducers/users/types';

export interface ITbody {
  users: TUsers;
  handleClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isCheck: Array<string>;
  handleDelete: (id: string) => void;
  handleBlock: (id: string) => void;
  handleUnblock: (id: string) => void;
}
