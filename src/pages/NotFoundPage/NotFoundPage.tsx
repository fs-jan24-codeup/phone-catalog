import React from 'react';
import Page404 from '../../assets/images/page404.svg?react';
import './NotFoundPage.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found" data-aos="fade-down">
      <Page404 />
      <p className="not-found__text">Page not found</p>
    </div>
  );
};
