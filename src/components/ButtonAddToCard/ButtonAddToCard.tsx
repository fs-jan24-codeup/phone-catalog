import React, { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import '../CardLayout/CardLayout.scss';
import { useAppContext } from '../../hooks/useAppContext';
import { useTranslation } from 'react-i18next';

type Props = {
  good: Product;
};

export const ButtonAddToCard: React.FC<Props> = ({ good }) => {
  const { addToCart, isItemInCart } = useAppContext();
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(
    isItemInCart(good.id),
  );

  const { t } = useTranslation();

  useEffect(() => {
    setIsAddedToCart(isItemInCart(good.id));
  }, [isItemInCart, good.id]);

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
      {isAddedToCart ? t('addedToCart') : t('addToCart')}
    </button>
  );
};
