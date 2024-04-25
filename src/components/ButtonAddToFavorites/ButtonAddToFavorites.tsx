import React, { useEffect, useState } from 'react';

import { Product } from '../../types/Product';
import { useAppContext } from '../../hooks/useAppContext';

import Favourites from '../../assets/icons/favourites.svg?react';
import FavouritesFilled from '../../assets/icons/favourites_filled.svg?react';

import '../CardLayout/CardLayout.scss';

type Props = {
  good: Product;
};

export const ButtonAddToFavorites: React.FC<Props> = ({ good }) => {
  const { addToFavourites, removeFromFavourites, isItemInFavourites } =
    useAppContext();
  const [isAddedToFavorites, setIsAddedToFavorites] = useState<boolean>(
    isItemInFavourites(good.id),
  );

  useEffect(() => {
    setIsAddedToFavorites(isItemInFavourites(good.id));
  }, [isItemInFavourites, good.id]);

  const handleAddToFavorites = () => {
    if (!isAddedToFavorites) {
      addToFavourites(good);
      setIsAddedToFavorites(true);
    } else {
      removeFromFavourites(good.id);
      setIsAddedToFavorites(false);
    }
  };

  return (
    <button className="card__button--favourite" onClick={handleAddToFavorites}>
      {isAddedToFavorites ? <FavouritesFilled /> : <Favourites />}
    </button>
  );
};
