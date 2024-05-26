import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Product } from '../../types/Product';
import { apiRequest } from '../../utils/fetchData';

import { Breadcrumb } from '../Breadcrumb';
import { PriceInfo } from '../PriceInfo';
import { AboutSection } from '../AboutSection';
import { TechSpecs } from '../TechSpecs';
import { ProductSlider } from '../ProductSlider';
import { ImagesSwiper } from '../ImagesSwiper';

import './ProductPageLayout.scss';
import { GoBack } from '../GoBack';

import {
  SkeletonAbout,
  SkeletonImages,
  SkeletonPrice,
  SkeletonTitle,
} from './ProductPageSkeleton';

export const ProductPageLayout: React.FC = () => {
  const [good, setGood] = useState<Product | null>(null);
  const [recommendedGoods, setRecomendedGoods] = useState<Product[]>([]);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const { productId } = useParams<{
    category: string;
    productId: string;
  }>();

  useEffect(() => {
    if (!isLoadingProduct) {
      apiRequest(`/products/${productId}`)
        .then(products => {
          const newProducts = products.slice(5, 16);
          setRecomendedGoods(newProducts);
        })
        .catch(error => console.error('Error fetching product:', error));
    }
  }, [isLoadingProduct]);

  useEffect(() => {
    if (productId) {
      apiRequest(`/products/${productId}`)
        .then(product => {
          setGood(product);
        })
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
    <div className="product__grid fadeOut animate">
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
