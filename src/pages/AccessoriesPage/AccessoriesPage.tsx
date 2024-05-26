import React from 'react';
import { useState, useEffect } from 'react';

import { Product } from '../../types/Product';
import { ProductsPage } from '../ProductsPage';
import { useTranslation } from 'react-i18next';
import { apiRequest } from '../../utils/fetchData';

export const AccessoriesPage: React.FC = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);

  const { t } = useTranslation();

  useEffect(() => {
    apiRequest('/products/accessories')
      .then(accessories => {
        setAccessories(accessories);
      })
      .catch(error => console.error('Error fetching phones:', error));
  }, []);

  return <ProductsPage products={accessories} title={t('accessories')} />;
};
