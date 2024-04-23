import React from 'react';
import './ProductPageLayout.scss';
import { PriceInfo } from '../PriceInfo';
import { AboutSection } from '../AboutSection';
import { TechSpecs } from '../TechSpecs';
import { Product } from '../../types/Product';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../utils/fetchData';
import { useState, useEffect } from 'react';

export const ProductPageLayout: React.FC = () => {
   const [good, setGood] = useState<Product | null>(null);
   const { productId } = useParams();

   useEffect(() => {
     if (productId) {
       getProduct('./api/phones.json', productId)
         .then(product => setGood(product))
         .catch(error => console.log(error));
     }
   }, [productId]);
  return (
    <div className="product__grid">
      <div className="product__path">Path</div>
      <div className="product__back">Button Back</div>
      <div className="product__title">Title</div>
      <div className="product__images">Photo</div>
      <div className="product__price">
        <PriceInfo />
      </div>
      <div className="product__about"><AboutSection good={good}/></div>
      <div className="product__specs"><TechSpecs good={good} /></div>
      <div className="product__also-like">You may also like</div>
    </div>
  );
};
