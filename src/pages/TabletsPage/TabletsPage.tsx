import React from 'react';
import { useState, useEffect } from 'react';

import { Product } from '../../types/Product';
import { apiRequest } from '../../utils/fetchData';
import { ProductsPage } from '../ProductsPage';
import { useTranslation } from 'react-i18next';

export const TabletsPage: React.FC = () => {
  const [tablets, setTablets] = useState<Product[]>([]);

  const { t } = useTranslation();

  useEffect(() => {
    apiRequest('/products/tablets?perPage=200')
      .then(tablets => {
        setTablets(tablets);
      })
      .catch(error => console.error('Error fetching phones:', error));
  }, []);

  return <ProductsPage products={tablets} title={t('tablets')} />;
};
