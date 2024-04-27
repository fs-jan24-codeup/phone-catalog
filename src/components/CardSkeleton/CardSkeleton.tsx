import React from 'react';
import './CardSkeleton.scss';
import { fadeOut } from '../FadeOut/FadeOut';

export const CardSkeleton: React.FC = () => {
  fadeOut();
  return (
    <div className="card__container skeleton fadeOut">
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
