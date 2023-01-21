import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import CheckIcon from '@mui/icons-material/Check';
import { IconButton, Tooltip } from '@mui/material';
import { IUser } from '../../../store/reducers/users/types';
import { ITbody } from './tbody.types';
import './tbody.css';
import { dateConverter } from '../../../utils/dateConverter';

export function TableBody({
  users,
  handleClick,
  isCheck,
  handleDelete,
  handleUnblock,
  handleBlock,
}: ITbody) {
  return (
    <tbody className="table-light">
      {users.map((user: IUser) => (
        <tr key={user.id}>
          <td className="table_cells">
            <input
              className="form-check-input"
              type="checkbox"
              id={user.id}
              onChange={handleClick}
              checked={isCheck.includes(user.id)}
            />
          </td>
          <td className="table_cells">{user.id}</td>
          <td className="table_cells">{user.email}</td>
          <td className="table_cells">{user.username}</td>
          <td className="table_cells">{dateConverter(user.dateReg)}</td>
          <td className="table_cells">
            {user.dateLastLogin ? dateConverter(user.dateLastLogin) : ''}
          </td>
          <td
            className={`table_cells ${
              user.banned ? 'table_cells__blocked' : 'table_cells__not-blocked'
            }`}
          >
            {String(user.banned)}
          </td>
          <td className="table_cells">
            <Tooltip title="Delete" arrow>
              <IconButton onClick={() => handleDelete(user.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip disableFocusListener={user.banned} title="Block" arrow>
              <IconButton
                onClick={() => handleBlock(user.id)}
                disabled={user.banned}
              >
                <BlockIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Unblock" arrow>
              <IconButton
                onClick={() => handleUnblock(user.id)}
                disabled={!user.banned}
              >
                <CheckIcon />
              </IconButton>
            </Tooltip>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
