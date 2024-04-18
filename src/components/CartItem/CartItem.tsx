import React from 'react';

import Minus from '../../assets/icons/Minus.svg';
import Plus from '../../assets/icons/Plus.svg';
import Union from '../../assets/icons/Union.svg';
import Photo from '../../assets/icons/Photo.svg';

import './CartItem.scss';

interface CartItemProps {
  name: string;
  priceRegular: number;
  priceDiscount?: number;
  quantity: number;
  updateQuantity: (newQuantity: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ name, priceRegular, priceDiscount, quantity, updateQuantity }) => {
  const handleClickPlus = () => {
    updateQuantity(quantity + 1);
  };

  const handleClickMinus = () => {
    if (quantity > 1) {
      updateQuantity(quantity - 1);
    }
  };

  return (
    <div className='card-item__container'>
      <div className='card-item'>
        <div className='cross'>
          <img src={Union} alt="union" className='cart-item__buttons-icon'/>
        </div>
        <div className='cart-item__img'>
          <img src={Photo} alt="Photo"/>
        </div>
        <p className='cart-item__name'>{name}</p>
        <div className='cart-item__buttons'>
          <div className='cart-item__buttons-icons'>
            <img src={Minus} alt="minus" className='cart-item__buttons-icon' onClick={handleClickMinus}/>
          </div>
          <div className='cart-item__count'>{quantity}</div>
          <div className='cart-item__buttons-icons'>
            <img src={Plus} alt="plus" className='cart-item__buttons-icon' onClick={handleClickPlus} />
          </div>
        </div>
        <p className='cart-item__price'>{priceDiscount ? `${priceDiscount}$` : `${priceRegular}$`}</p>
      </div>
    </div>
  );
};
