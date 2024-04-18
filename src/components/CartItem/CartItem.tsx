import React from 'react';

import Minus from '../../assets/icons/Minus.svg';
import Plus from '../../assets/icons/Plus.svg';
import Union from '../../assets/icons/Union.svg';

import './CartItem.scss';
import { Phone } from '../../types/Phone';
import { useAppContext } from '../../hooks/useAppContext';

type Props = {
  item: Phone;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const [count, setCount] = React.useState(1);

  const { name, images } = item;

  const { removeFromCart } = useAppContext();

  function handleClickPlus() {
    setCount(count + 1);
  }

  function handleClickMinus() {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  function handleRemoveFromCart() {
    removeFromCart(item.id);
  }

  return (
    <div className="card-item__container">
      <div className="card-item">
        <div className="cross" onClick={handleRemoveFromCart}>
          <img src={Union} alt="union" className="cart-item__buttons-icon" />
        </div>
        <div className="cart-item__img">
          <img src={images[0]} alt={name} />
        </div>
        <p className="cart-item__name">{name}</p>
        <div className="cart-item__buttons">
          <div className="cart-item__buttons-icons">
            <img
              src={Minus}
              alt="minus"
              className="cart-item__buttons-icon"
              onClick={handleClickMinus}
            />
          </div>
          <div className="cart-item__count">{count}</div>
          <div className="cart-item__buttons-icons">
            <img
              src={Plus}
              alt="plus"
              className="cart-item__buttons-icon"
              onClick={handleClickPlus}
            />
          </div>
        </div>
        <p className="cart-item__price">$1000</p>
      </div>
    </div>
  );
};
