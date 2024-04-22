import React, { useEffect, useState } from 'react';
import { ProductPageLayoutImages } from '../ProductPageLayoutImages/ProductPageLayoutImages';
import { getProduct } from '../../utils/fetchData';
import { Product } from '../../types/Product';

import './ProductPageLayout.scss';

export const ProductPageLayout: React.FC = () => {
  const productId = new URL(window?.location?.href)?.hash?.split('/').pop();

  const [selectedProduct, setSelectedProduct] = useState<Product>();

  useEffect(() => {
    getProduct('./api/phones.json', productId || '')
      .then(setSelectedProduct)
      .catch(error => console.error('Error fetching phones:', error));
  }, []);

  
  if (selectedProduct) {
    const { images } = selectedProduct;
    return (
      <>
        {selectedProduct && (
          <div className="product__grid">
            <div className="product__path">Path</div>
            <div className="product__back">Button Back</div>
            <div className="product__title">Title</div>
            <div className="product__images">
              <ProductPageLayoutImages images={images}/>
            </div>
            <div className="product__price">Price, info</div>
            <div className="product__about">About</div>
            <div className="product__specs">Tech specs</div>
            <div className="product__also-like">You may also like</div>
          </div>
        )}
      </>
    );
  }
};
