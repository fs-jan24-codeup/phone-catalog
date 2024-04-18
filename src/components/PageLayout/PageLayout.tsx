import './PageLayout.scss';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const PageLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className="grid_container">
        <main className="main_layout">{children}</main>
      </div>
    </>
  );
};
