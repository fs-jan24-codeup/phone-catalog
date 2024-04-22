import React from 'react';
import './HomePageLayout.scss';
import { HomeSlider } from '../HomeSlider';
import { CategoriesSection } from '../CategoriesSection';

export const HomePageLayout: React.FC = () => {
  return (
    <div className="home home__grid">
      <h1 className="home__title">Welcome to Nice Gadgets store!</h1>
      <div className="home__slider">
        <HomeSlider />
      </div>
      <div className="home__brand-new-models">Brand new models</div>
      <div className="home__shop-by-category"><CategoriesSection /></div>
      <div className="home__hot-prices">Hot prices</div>
    </div>
  );
};
