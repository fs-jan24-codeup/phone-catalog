import React from 'react';
import { Link } from 'react-router-dom';
import './CartPage.scss';
import goBackIcon from '../../assets/icons/arrow-left.svg';
import { CartItem } from '../../components/CartItem/CartItem';
import { useAppContext } from '../../hooks/useAppContext';

export const CartPage: React.FC = () => {
  const { cart } = useAppContext();

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

        {cart.length ? (
          <div className="cart__content-wrapper">
            <div className="cart__content">
              {cart.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <div className="cart__summary">
              <div className="cart__total-price">$2000</div>
              <div className="cart__total-price--label">Total for 2 items</div>
              <button type="button" className="cart__submit-btn">
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="cart__empty">
            <h1>Your basket is empty.</h1>
            <p className="cart__text">But it's never too late to fix it...</p>
          </div>
        )}
      </div>
    </div>
  );
};
