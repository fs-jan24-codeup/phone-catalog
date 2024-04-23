import React, { useEffect, useState } from 'react';
import './HomePageLayout.scss';
import { ProductSlider } from '../ProductSlider';
import { getProducts } from '../../utils/fetchData';
import { Product } from '../../types/Product';

export const HomePageLayout: React.FC = () => {
  const [phonesWithHotPrices, setPhonesWithHotPrices] = useState<Product[]>([]);

  useEffect(() => {
    getProducts('./api/phones.json')
      .then(phones => {
        phones.sort((a, b) => b.priceDiscount - a.priceDiscount);
        const limitedPhones = phones.slice(0, 12);
        setPhonesWithHotPrices(limitedPhones);
      })
      .catch(error => console.error('Error fetching phones:', error));
  }, []);
  return (
    <div className="home home__grid">
      <h1 className="home__title">Welcome to Nice Gadgets store!</h1>
      <div className="home__slider">Slider</div>
      <div className="home__brand-new-models">Brand new models</div>
      <div className="home__shop-by-category">Shop by category</div>
      <div className="home__hot-prices">
        {<ProductSlider products={phonesWithHotPrices} title="Hot prices" />}
      </div>
    </div>
  );
};
