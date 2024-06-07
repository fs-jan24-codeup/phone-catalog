import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import './HomePageLayout.scss';

import { HomeSlider } from '../HomeSlider';
import { CategoriesSection } from '../CategoriesSection';
import { ProductSlider } from '../ProductSlider';
import { apiRequest } from '../../utils/fetchData';
import { Product } from '../../types/Product';

//@ts-ignore
import { aos } from '../AOS/aos';

aos();

export const HomePageLayout: React.FC = () => {
  const [phonesWithHotPrices, setPhonesWithHotPrices] = useState<Product[]>([]);
  const [newModels, setNewModels] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { t } = useTranslation();

  useEffect(() => {
    apiRequest(`/products/phones`)
      .then(phones => {
        const hotPrices = [...phones]
          .sort((a, b) => b.priceDiscount - a.priceDiscount)
          .slice(0, 12);

        const newPhones = phones.slice(0, 12);

        setPhonesWithHotPrices(hotPrices);
        setNewModels(newPhones);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="home home__grid">
      <h1 className="home__title" data-aos="fade-down">
        {t('welcomeToNiceGadgetsStore')}
      </h1>

      <div className="home__slider" data-aos="fade-down">
        <HomeSlider />
      </div>

      <div className="home__brand-new-models" data-aos="fade-down">
        <ProductSlider
          id="brand-new"
          products={newModels}
          title={t('brandNewModels')}
          isLoading={isLoading}
        />
      </div>

      <div className="home__shop-by-category" data-aos="fade-down">
        <CategoriesSection />
      </div>

      <div className="home__hot-prices" data-aos="fade-down">
        <ProductSlider
          id="hot-models"
          products={phonesWithHotPrices}
          title={t('hotPrices')}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
