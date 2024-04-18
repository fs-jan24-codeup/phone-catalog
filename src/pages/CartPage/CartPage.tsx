import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CartPage.scss';
import goBackIcon from '../../assets/icons/arrow-left.svg';
import { CartItem } from '../../components/CartItem/CartItem';

export const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState([
    { name: 'iPhone 13', priceRegular: 1000, priceDiscount: 800, quantity: 1 },
    { name: 'iPhone 11', priceRegular: 800, quantity: 1 }
  ]);

  const totalPrice = cartItems.reduce((total, item) => total + (item.priceDiscount || item.priceRegular) * item.quantity, 0);

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const updateQuantity = (index: number, newQuantity: number) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity = newQuantity;
    setCartItems(newCartItems);
  };

  return (
    <div>
      <div className="cart">
        <div className="button-go-back">
          <img src={goBackIcon} alt="Go back" className="button-go-back__img" />
          <Link to=".." className="button-go-back__link">
            Go back
          </Link>
        </div>

        <h1 className="cart__title">Cart</h1>
        <div className="cart__content-wrapper">
          <div className='cart__content'>
            {cartItems.map((item, id) => (
              <CartItem key={id} {...item} updateQuantity={(newQuantity: number) => updateQuantity(id, newQuantity)} />
            ))}
          </div>
          <div className="cart__summary">
            <div className="cart__total-price">${totalPrice}</div>
            <div className="cart__total-price--label">Total for {itemCount} items</div>
            <button type="button" className="cart__submit-btn">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
