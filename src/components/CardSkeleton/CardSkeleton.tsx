import React from 'react';
import './CardSkeleton.scss';

export const CardSkeleton: React.FC = () => {
  return (
    <div className="card__container skeleton">
      <div className="skeleton__image"></div>

      <div className="skeleton__name"></div>
      <div className="skeleton__name"></div>

      <div className="skeleton__prices">
        <div className="skeleton__price"></div>
        <div className="skeleton__price"></div>
      </div>
      <div className="skeleton__breakline"></div>
      <div className="skeleton__characteristics characteristics">
        <div className="skeleton__characteristic"></div>
        <div className="skeleton__characteristic"></div>
        <div className="skeleton__characteristic"></div>
        <div className="skeleton__button"></div>
      </div>
    </div>
  );
};
