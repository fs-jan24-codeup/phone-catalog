import React from 'react';
import './ProductPageLayout.scss';
import { PriceInfo } from '../PriceInfo';

export const ProductPageLayout: React.FC = () => {
  return (
    <div className="product__grid">
      <div className="product__path">Path</div>
      <div className="product__back">Button Back</div>
      <div className="product__title">Title</div>
      <div className="product__images">Photo</div>
      <div className="product__price">
        <PriceInfo />
      </div>
      <div className="product__about">About</div>
      <div className="product__specs">Tech specs</div>
      <div className="product__also-like">You may also like</div>
    </div>
  );
};
