import React from 'react';
import Minus from '../../assets/icons/Minus.svg';
import Plus from '../../assets/icons/Plus.svg';
import Union from '../../assets/icons/Union.svg';
import { CartProduct } from '../../types/CartProduct';
import { useAppContext } from '../../hooks/useAppContext';
import './CartItem.scss';

interface CartItemProps {
    item: CartProduct;
    name: string;
    priceRegular: number;
    priceDiscount?: number;
    quantity: number;
    updateQuantity: (newQuantity: number) => void;
  }

  export const CartItem: React.FC<CartItemProps> = ({ item, name, priceRegular, priceDiscount, quantity, updateQuantity }) => {

  const { removeFromCart } = useAppContext();
  const { image } = item;

    const handleClickPlus = () => {
      updateQuantity(quantity + 1);
    };
  
    const handleClickMinus = () => {
      if (quantity > 1) {
        updateQuantity(quantity - 1);
      }
    };

    function handleRemoveFromCart() {
        removeFromCart(item.id);
      }
      return (
        <div className='card-item__container'>
          <div className='card-item'>
          <div className="cross" onClick={handleRemoveFromCart}>
            <button className='cart-item__buttons-icon' onClick={handleClickMinus}>
                <img src={Union} alt="union" />
              </button>
            </div>
            <div className='cart-item__img'>
            <img src={image} alt={name} />
            </div>
            <p className='cart-item__name'>{name}</p>
            <div className='cart-item__buttons'>
              <div className='cart-item__buttons-icons'>
                {quantity >= 1 && (
                <button className='cart-item__buttons-icon' onClick={handleClickMinus}>
                   <img src={Minus} alt="minus" />
                </button>
                )}
              </div>
              <div className='cart-item__count'>{quantity}</div>
              <div className='cart-item__buttons-icons'>
                <button className='cart-item__buttons-icon' onClick={handleClickPlus}>
                   <img src={Plus} alt="plus" />
                </button>
              </div>
            </div>
            <p className='cart-item__price'>{priceDiscount ? priceDiscount : priceRegular}</p>
          </div>
        </div>
      );
    };
    
