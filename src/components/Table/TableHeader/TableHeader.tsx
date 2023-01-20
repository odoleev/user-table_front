import React from 'react';
import { IThead } from './thead.types';

export function TableHeader({ isCheckAll, handleSelectAll }: IThead) {
  return (
    <thead className="table-dark">
      <tr>
        <th scope="col">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexCheckDefault"
            onChange={handleSelectAll}
            checked={isCheckAll}
          />
        </th>
        <th scope="col">Id</th>
        <th scope="col">Email</th>
        <th scope="col">Username</th>
        <th scope="col">Registration date</th>
        <th scope="col">Last login date</th>
        <th scope="col">Blocked</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
  );
}
