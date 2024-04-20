import React from 'react';
import { useState, useEffect } from 'react';

import { Product } from '../../types/Product';
import { getProducts } from '../../utils/fetchData';
import { ProductsPage } from '../ProductsPage';

export const AccessoriesPage: React.FC = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);

  useEffect(() => {
    getProducts('./api/accessories.json')
      .then(accessories => setAccessories(accessories))
      .catch(error => console.error('Error fetching phones:', error));
  }, []);

  return <ProductsPage products={accessories} title="Accessories" />;
};
