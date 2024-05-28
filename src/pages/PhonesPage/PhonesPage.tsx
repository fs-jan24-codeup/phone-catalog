import React from 'react';
import { useState, useEffect } from 'react';

import { Product } from '../../types/Product';
import { apiRequest } from '../../utils/fetchData';
import { ProductsPage } from '../ProductsPage';
import { useTranslation } from 'react-i18next';

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Product[]>([]);

  const { t } = useTranslation();

  useEffect(() => {
    apiRequest('/products/phones').then(phones => {
      setPhones(phones);
    });
  }, []);

  return <ProductsPage products={phones} title={t('mobilePhones')} />;
};
