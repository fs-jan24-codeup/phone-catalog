import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Product } from '../../types/Product';
import { getProduct, getProducts } from '../../utils/fetchData';

import { Breadcrumb } from '../Breadcrumb';
import { PriceInfo } from '../PriceInfo';
import { AboutSection } from '../AboutSection';
import { TechSpecs } from '../TechSpecs';
import { ProductSlider } from '../ProductSlider';
import { ImagesSwiper } from '../ImagesSwiper';

import './ProductPageLayout.scss';
import { GoBack } from '../GoBack';

export const ProductPageLayout: React.FC = () => {
  const [good, setGood] = useState<Product | null>(null);
  const [recommendedGoods, setRecomendedGoods] = useState<Product[]>([]);
  const { productId } = useParams();

  useEffect(() => {
    getProducts('./api/phones.json')
      .then(phones => {
        const newPhones = phones.slice(5, 16);

        setRecomendedGoods(newPhones);
      })
      .catch(error => console.error('Error fetching phones:', error));
  }, []);

  useEffect(() => {
    if (productId) {
      getProduct('./api/phones.json', productId)
        .then(product => setGood(product))
        .catch(error => console.log(error));
    }
  }, [productId]);
  return (
    <div className="product__grid">
      <div className="product__path">
        <Breadcrumb />
      </div>
      <div className="product__back">
        <GoBack />
      </div>
      <h2 className="product__title">{good?.name}</h2>
      <div className="product__images">
        {good && <ImagesSwiper images={good.images} />}
      </div>
      <div className="product__price">
        <PriceInfo />
      </div>
      <div className="product__about">
        <AboutSection good={good} />
      </div>
      <div className="product__specs">
        <TechSpecs good={good} />
      </div>
      <div className="product__also-like">
        <ProductSlider
          id="also-like"
          products={recommendedGoods}
          title="You may also like"
        />
      </div>
    </div>
  );
};
