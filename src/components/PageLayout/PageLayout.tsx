import './PageLayout.scss';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const PageLayout: React.FC<Props> = ({ children }) => {
  return <main className="grid">{children}</main>;
};
