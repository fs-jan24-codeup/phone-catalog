import React, { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import '../CardLayout/CardLayout.scss';
import { useAppContext } from '../../hooks/useAppContext';

type Props = {
  good: Product;
};

export const ButtonAddToCard: React.FC<Props> = ({ good }) => {
  const { addToCart, isItemAdded } = useAppContext();
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
