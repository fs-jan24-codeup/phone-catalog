import React from 'react';
import { useState, useEffect } from 'react';

import { Product } from '../../types/Product';
import { getProducts } from '../../utils/fetchData';
import { ProductsPage } from '../ProductsPage';
import { useTranslation } from 'react-i18next';

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Product[]>([]);

  const { t } = useTranslation();

  useEffect(() => {
    getProducts('./api/phones.json')
      .then(phones => setPhones(phones))
      .catch(error => console.error('Error fetching phones:', error));
  }, []);

  return <ProductsPage products={phones} title={t('mobilePhones')} />;
};
