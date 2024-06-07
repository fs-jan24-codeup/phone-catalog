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
      apiRequest(`/products/recommended/${productId}`)
        .then(products => {
          setRecomendedGoods(products);
        })
        .catch(error => console.error('Error fetching product:', error));
    }
  }, [isLoadingProduct]);

  useEffect(() => {
    setIsLoadingProduct(true);
    if (productId) {
      apiRequest(`/products/${productId}`)
        .then(product => {
          setGood(product);
        })
        .catch(error => console.log(error))
        .finally(() => {
          const timer = setTimeout(() => {
            setIsLoadingProduct(false);
          }, 700);

          return () => clearTimeout(timer);
        });
    }
  }, [productId]);

  return (
    <div className="product__grid" data-aos="fade-down">
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
      <div className="product__about">
        {isLoadingProduct ? <SkeletonAbout /> : <AboutSection good={good} />}
      </div>
      <div className="product__specs">
        {isLoadingProduct ? <SkeletonAbout /> : <TechSpecs good={good} />}
      </div>

      <div className="product__also-like">
        <ProductSlider
          id="also-like"
          products={recommendedGoods}
          title="You may also like"
          isLoading={isLoadingProduct}
        />
      </div>
    </div>
  );
};
