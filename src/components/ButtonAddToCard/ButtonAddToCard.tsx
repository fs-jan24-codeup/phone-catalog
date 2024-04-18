import React, { useEffect, useState } from 'react';
import { Phone } from '../../types/Phone';
import '../CardLayout/CardLayout.scss';
import { useAppContext } from '../../hooks/useAppContext';

type Props = {
  good: Phone;
};

export const ButtonAddToCard: React.FC<Props> = ({ good }) => {
  const { addToCart, removeFromCart, isItemAdded } = useAppContext();
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(
    isItemAdded(good.id),
  );

  useEffect(() => {
    setIsAddedToCart(isItemAdded(good.id));
  }, [isItemAdded, good.id]);

  const handleAddToCart = () => {
    if (!isAddedToCart) {
      addToCart(good);
      setIsAddedToCart(true);
    } else {
      removeFromCart(good.id);
      setIsAddedToCart(false);
    }
  };

  return (
    <button
      className={!isAddedToCart ? 'card__button--add' : 'card__button--remove'}
      onClick={handleAddToCart}
    >
      {isAddedToCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
