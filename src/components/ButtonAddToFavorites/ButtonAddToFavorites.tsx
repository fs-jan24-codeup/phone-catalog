import React, { useEffect, useState } from 'react';
import { Phone } from '../../types/Phone';
import '../CardLayout/CardLayout.scss';
import { useAppContext } from '../../hooks/useAppContext';
import favourites from '../../assets/icons/favourites.svg';
import favourites_filled from '../../assets/icons/favourites_filled.svg';

type Props = {
    good: Phone;
  };

  export const ButtonAddToFavorites: React.FC<Props> = ({ good }) => {
    const { addToFavorites, removeFromFavorites, isItemAdded } = useAppContext();
    const [isAddedToFavorites, setIsAddedToFavorites] = useState<boolean>(
      isItemAdded(good.id),
    );
  
    useEffect(() => {
      setIsAddedToFavorites(isItemAdded(good.id));
    }, [isItemAdded, good.id]);
  
    const handleAddToFavorites = () => {
      if (!isAddedToFavorites) {
        addToFavorites(good);
        setIsAddedToFavorites(true);
      } else {
        removeFromFavorites(good.id);
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
  