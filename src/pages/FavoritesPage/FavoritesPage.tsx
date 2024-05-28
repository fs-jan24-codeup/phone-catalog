import React from 'react';

import { CardLayout } from '../../components/CardLayout';
import { ItemsLayout } from '../../components/ItemsLayout';
import { useAppContext } from '../../hooks/useAppContext';
import { Breadcrumb } from '../../components/Breadcrumb';

import './FavoritesPage.scss';
import { useTranslation } from 'react-i18next';

export const FavouritesPage: React.FC = () => {
  const { favourites } = useAppContext();

  const { t } = useTranslation();

  return (
    <div className="favorites-page" data-aos="fade-down">
      <Breadcrumb />

      <h1 className="favorites__title">{t('favourites')}</h1>

      <p className="favorites__quantity">
        {favourites.length} {t('items')}
      </p>

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
