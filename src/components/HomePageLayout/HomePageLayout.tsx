import React from 'react';
import './HomePageLayout.scss';

export const HomePageLayout: React.FC = () => {
  return (
    <div className="home home__grid">
      <h1 className="home__title">Welcome to Nice Gadgets store!</h1>
      <div className="home__slider">Slider</div>
      <div className="home__brand-new-models">Brand new models</div>
      <div className="home__shop-by-category">Shop by category</div>
      <div className="home__hot-prices">Hot prices</div>
    </div>
  );
};
