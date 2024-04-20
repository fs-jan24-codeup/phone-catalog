import React, { useEffect, useState } from 'react';

import { Product } from '../../types/Product';
import { useAppContext } from '../../hooks/useAppContext';

import favourites from '../../assets/icons/favourites.svg';
import favourites_filled from '../../assets/icons/favourites_filled.svg';

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
      <img
        src={isAddedToFavorites ? favourites_filled : favourites}
        alt="Favourite"
        className="card__button--image"
      />
    </button>
  );
};
