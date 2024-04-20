import React from 'react';
import { useState, useEffect } from 'react';

import { Product } from '../../types/Product';
import { getProducts } from '../../utils/fetchData';
import { ProductsPage } from '../ProductsPage';
import { ItemsLayout } from '../../components/ItemsLayout';

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Product[]>([]);

  useEffect(() => {
    getProducts('./api/phones.json')
      .then(phones => setPhones(phones))
      .catch(error => console.error('Error fetching phones:', error));
  }, []);

  return (
      <ItemsLayout>
          <ProductsPage products={phones} title="Mobile phones" />;
      </ItemsLayout>
  );
};
