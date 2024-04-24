import React from 'react';

import { CardLayout } from '../../components/CardLayout';
import { ItemsLayout } from '../../components/ItemsLayout';
import { useAppContext } from '../../hooks/useAppContext';
import { Breadcrumb } from '../../components/Breadcrumb';

import './FavoritesPage.scss';

export const FavouritesPage: React.FC = () => {
  const { favourites } = useAppContext();

  return (
    <div className="favorites-page">
      <Breadcrumb />

      <h1 className="favorites__title">Favourites</h1>

      <p className="favorites__quantity">{favourites.length} items</p>

      <div className="favorites__content-wrapper">
        <ItemsLayout>
          {favourites.map(product => (
            <CardLayout key={product.id} good={product} />
          ))}
        </ItemsLayout>
      </div>
    </div>
  );
};
