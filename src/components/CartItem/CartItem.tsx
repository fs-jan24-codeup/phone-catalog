import React, { useEffect, useState } from 'react';

import { useAppContext } from '../../hooks/useAppContext';
import { CartProduct } from '../../types/CartProduct';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Minus from '../../assets/icons/minus.svg?react';
import Plus from '../../assets/icons/plus.svg?react';
import Close from '../../assets/icons/close.svg?react';
import './CartItem.scss';

import variables from '../../styles/utils/variables.module.scss';
import { CartItemSkeleton } from './CartItemSkeleton';

interface Props {
  item: CartProduct;
}

export const CartItem: React.FC<Props> = ({ item }) => {
  const { id, name, image, price, quantity: initialQuantity } = item;
  const { removeFromCart, updateQuantity } = useAppContext();
  const [quantity, setQuantity] = React.useState(initialQuantity);
  const [isCartLoading, setIsCartLoading] = useState(true);

  const isDisabled = quantity === 1;

  const handleClickPlus = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(id, newQuantity);
  };

  const handleClickMinus = () => {
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    updateQuantity(id, newQuantity);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(id);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsCartLoading(false);
    }, 500);
  }, []);

  return (
    <div className="card-item__container">
      {isCartLoading ? (
        <CartItemSkeleton />
      ) : (
        <div className="card-item">
          <button onClick={handleRemoveFromCart} className="cross">
            <Close />
          </button>
          <div className="cart-item__img">
            <img src={image} alt={name} />
          </div>
          <Link className="cart-item__name" to={`/phones/${id}`}>
            {name}
          </Link>
          <div className="cart-item__buttons">
            <div className="cart-item__buttons-icons">
              <button
                className={classNames('cart-item__buttons-icon', {
                  'icon--disabled': isDisabled,
                })}
                onClick={handleClickMinus}
                disabled={isDisabled}
              >
                <Minus />
              </button>
            </div>
            <div className="cart-item__count">{quantity}</div>

            <button
              className="cart-item__buttons-icon"
              onClick={handleClickPlus}
            >
              <Plus />
            </button>
          </div>
          <p className="cart-item__price">{price * quantity}</p>
        </div>
      )}
    </div>
  );
};
