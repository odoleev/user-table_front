import React from 'react';
import { IPagesLayout } from './layout.types';

export function PagesLayout({ element: Content, type }: IPagesLayout) {
  return <div> {type ? <Content type={type} /> : <Content />}</div>;
}
