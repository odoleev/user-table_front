import React from 'react';
import './tbuttons.css';
import { ITButtons } from './tbuttons.types';

export function TableButtons({
  handleUnblock,
  handleDelete,
  handleBlock,
}: ITButtons) {
  return (
    <div className="table_buttons-wrapper">
      <button
        onClick={handleDelete}
        type="button"
        className="btn btn-dark table_buttons"
      >
        Delete
      </button>
      <button
        onClick={handleBlock}
        type="button"
        className="btn btn-dark table_buttons"
      >
        Block
      </button>
      <button
        onClick={handleUnblock}
        type="button"
        className="btn btn-dark table_buttons"
      >
        Unblock
      </button>
    </div>
  );
}
