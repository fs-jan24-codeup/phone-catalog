import React, { useEffect, useState } from 'react';
import './CartPage.scss';

import { CartItem } from '../../components/CartItem/CartItem';
import { useAppContext } from '../../hooks/useAppContext';
import { Modal } from '../../components/Modal/Modal';
import orderSuccessul from '../../assets/images/order-success.gif';
import emptyCart from '../../assets/images/empty-cart.gif';
import { CartSummarySkeleton } from './CartSummarySkeleton';
import { GoBack } from '../../components/GoBack';


export const CartPage: React.FC = () => {
  const { cart, clearCart, itemCount } = useAppContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [isLoadingSummary, setIsLoadingSummary] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const confirmOrder = () => {
    setIsModalOpen(false);
    clearCart();
    setOrderConfirmed(true);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isModalOpen]);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingSummary(false);
    }, 500);
  }, []);

  return (
    <>

      <div className="cart cart__grid">
        <GoBack />

        <h1 className="cart__title">Cart</h1>

        {cart.length ? (
          <div className="cart__content-wrapper">
            <div className="cart__content">
              {cart.map((item, id) => (
                <CartItem key={id} item={item} />
              ))}
            </div>
            <div className="cart__summary">
              {isLoadingSummary ? (
                <CartSummarySkeleton />
              ) : (
                <>
                  <div className="cart__total-price">${totalPrice}</div>
                  <div className="cart__total-price--label">
                    Total for {itemCount} items
                  </div>
                  <button
                    type="button"
                    className="cart__submit-btn"
                    onClick={openModal}
                  >
                    Checkout
                  </button>
                </>
              )}
            </div>
          </div>
        ) : orderConfirmed ? (
          <div className="cart__empty">
            <img src={orderSuccessul} alt="Thank you for your purchase" />
          </div>
        ) : (
          <div className="cart__empty">
            <h1 className="cart__empty--title">Your cart is empty</h1>

            <img
              className="cart__empty--img"
              src={emptyCart}
              alt="Your cart is empty"
            />
          </div>
        )}

        {isModalOpen && (
          <Modal onClose={closeModal}>
            <>
              <h2 className="modal__title">
                Do you want to confirm the order?
              </h2>
              <div className="modal__btn-wrapper">
                <button
                  onClick={closeModal}
                  className="modal__btn modal__btn--no"
                >
                  No
                </button>
                <button
                  onClick={confirmOrder}
                  className="modal__btn modal__btn--yes"
                >
                  Yes
                </button>
              </div>
            </>
          </Modal>
        )}
      </div>
    </>
  );
};
