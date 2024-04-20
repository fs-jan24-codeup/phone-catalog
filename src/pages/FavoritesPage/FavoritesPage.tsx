import React from 'react';

import { CardLayout } from '../../components/CardLayout';
import goBackIcon from '../../assets/icons/arrow-left.svg';
import { Link } from 'react-router-dom';
import './FavoritesPage.scss';
import { ItemsLayout } from '../../components/ItemsLayout';
import { useAppContext } from '../../hooks/useAppContext';

export const FavouritesPage: React.FC = () => {
  const { favourites } = useAppContext();

  return (
    <div className="favorites-page">
      <div className="button-go-back">
        <img src={goBackIcon} alt="Go back" className="button-go-back__img" />
        <Link to=".." className="button-go-back__link">
          Go back
        </Link>
      </div>

      <h1 className="favorites__title">Favourites</h1>

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
