import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

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
import { fadeOut } from '../FadeOut/FadeOut';

export const ProductPageLayout: React.FC = () => {
  fadeOut();

  const [good, setGood] = useState<Product | null>(null);
  const [recommendedGoods, setRecomendedGoods] = useState<Product[]>([]);
  const { productId } = useParams();

  const { pathname } = useLocation();
  const BASE_PATH = pathname.split('/');

  useEffect(() => {
    getProducts(`./api/${BASE_PATH[1]}.json`)
      .then(phones => {
        const newPhones = phones.slice(5, 16);

        setRecomendedGoods(newPhones);
      })
      .catch(error => console.error('Error fetching phones:', error));
  }, []);

  useEffect(() => {
    if (productId) {
      getProduct(`./api/${BASE_PATH[1]}.json`, productId)
        .then(product => setGood(product))
        .catch(error => console.log(error));
    }
  }, [productId]);
  return (
    <div className="product__grid">
      <div className="product__path fadeOut">
        <Breadcrumb productName={good?.name} />
      </div>

      <div className="product__back fadeOut">
        <GoBack />
      </div>

      <h2 className="product__title fadeOut">{good?.name}</h2>

      <div className="product__images fadeOut">
        {good && <ImagesSwiper images={good.images} />}
      </div>

      <div className="product__price fadeOut">
        <PriceInfo />
      </div>

      <div className="product__about fadeOut">
        <AboutSection good={good} />
      </div>

      <div className="product__specs fadeOut">
        <TechSpecs good={good} />
      </div>

      <div className="product__also-like fadeOut">
        <ProductSlider
          id="also-like"
          products={recommendedGoods}
          title="You may also like"
        />
      </div>
    </div>
  );
};
