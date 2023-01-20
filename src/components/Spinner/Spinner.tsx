import React from 'react';
import { ISpinnerProps } from './types';

export function Spinner({ top, left }: ISpinnerProps) {
  return (
    <div
      style={{ top: `${top}px`, left: `${left}px` }}
      className="spinner-border main-spinner "
      role="status"
    />
  );
}
