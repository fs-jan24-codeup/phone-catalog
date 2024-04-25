import React from 'react';
import './CartItemSkeleton.scss';

export const CartItemSkeleton: React.FC = () => {
  return (
    <div className="cart-item__container skeleton__cart">
      <div className="skeleton___cart-block">
        <div className="skeleton__cart-btn-remove"></div>
        <div className="skeleton__cart-image"></div>
        <div className="skeleton__cart-name"></div>
      </div>

      <div className="skeleton__cart-second-block">
        <div className="skeleton__cart-button"></div>
        <div className="skeleton__cart-price"></div>
      </div>
    </div>
  );
};
