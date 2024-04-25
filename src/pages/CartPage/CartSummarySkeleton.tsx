import React from 'react';
import './CartSummarySkeleton.scss';

export const CartSummarySkeleton: React.FC = () => {
  return (
    <div className="skeleton__summary-wrapper">
      <div className="skeleton__summary-price"></div>
      <div className="skeleton__summary-desc"></div>
      <div className="skeleton__summary-breakline"></div>
      <div className="skeleton__summary-button"></div>
    </div>
  );
};
