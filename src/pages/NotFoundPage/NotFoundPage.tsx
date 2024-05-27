import React from 'react';

import notFound from '../../assets/images/page-not-found.png';
import './NotFoundPage.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found" data-aos="fade-down">
      <img className="not-found__img" src={notFound} />
      <p className="not-found__text">Page not found</p>
    </div>
  );
};
