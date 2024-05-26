import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import './HomePageLayout.scss';

import { HomeSlider } from '../HomeSlider';
import { CategoriesSection } from '../CategoriesSection';
import { ProductSlider } from '../ProductSlider';
import { apiRequest } from '../../utils/fetchData';
import { Product } from '../../types/Product';
import { fadeOut } from '../FadeOut/FadeOut';
export const HomePageLayout: React.FC = () => {
  fadeOut();

  const [phonesWithHotPrices, setPhonesWithHotPrices] = useState<Product[]>([]);
  const [newModels, setNewModels] = useState<Product[]>([]);

  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 2);
    apiRequest(`/products/phones`)
      .then(phones => {
        const hotPrices = [...phones]
          .sort((a, b) => b.priceDiscount - a.priceDiscount)
          .slice(0, 12);

        const newPhones = phones.slice(0, 12);

        setPhonesWithHotPrices(hotPrices);
        setNewModels(newPhones);
      })
      .catch(error => console.error('Error fetching phones:', error));
  }, []);

  return (
    <div className="home home__grid fadeOut">
      <h1 className="home__title fadeOut">{t('welcomeToNiceGadgetsStore')}</h1>

      <div className="home__slider fadeOut">
        <HomeSlider />
      </div>

      <div className="home__brand-new-models fadeOut">
        <ProductSlider
          id="brand-new"
          products={newModels}
          title={t('brandNewModels')}
        />
      </div>

      <div className="home__shop-by-category fadeOut">
        <CategoriesSection />
      </div>

      <div className="home__hot-prices fadeOut">
        <ProductSlider
          id="hot-models"
          products={phonesWithHotPrices}
          title={t('hotPrices')}
        />
      </div>
    </div>
  );
};
