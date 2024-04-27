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
import {
  SkeletonAbout,
  SkeletonImages,
  SkeletonPrice,
  SkeletonTitle,
} from './ProductPageSkeleton';

export const ProductPageLayout: React.FC = () => {
  fadeOut();

  const [good, setGood] = useState<Product | null>(null);
  const [recommendedGoods, setRecomendedGoods] = useState<Product[]>([]);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const { productId } = useParams();

  const { pathname } = useLocation();
  const BASE_PATH = pathname.split('/');

  useEffect(() => {
    if (!isLoadingProduct) {
      getProducts(`./api/${BASE_PATH[1]}.json`)
        .then(phones => {
          const newPhones = phones.slice(5, 16);
          setRecomendedGoods(newPhones);
        })
        .catch(error => console.error('Error fetching phones:', error));
    }
  }, [isLoadingProduct]);

  useEffect(() => {
    if (productId) {
      getProduct(`./api/${BASE_PATH[1]}.json`, productId)
        .then(product => setGood(product))
        .catch(error => console.log(error));
    }
  }, [productId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingProduct(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="product__grid fadeOut">
      <div className="product__path">
        <Breadcrumb productName={good?.name} />
      </div>

      <div className="product__back">
        <GoBack />
      </div>
      {isLoadingProduct ? (
        <SkeletonTitle />
      ) : (
        <h2 className="product__title">{good?.name}</h2>
      )}
      <div className="product__images">
        {isLoadingProduct ? (
          <SkeletonImages />
        ) : (
          good && <ImagesSwiper images={good.images} />
        )}
      </div>
      <div className="product__price">
        {isLoadingProduct ? <SkeletonPrice /> : <PriceInfo />}
      </div>
      <div className="product__about fadeOut">
        {isLoadingProduct ? <SkeletonAbout /> : <AboutSection good={good} />}
      </div>
      <div className="product__specs fadeOut">
        {isLoadingProduct ? <SkeletonAbout /> : <TechSpecs good={good} />}
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
