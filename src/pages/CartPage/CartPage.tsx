import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CartPage.scss';
import goBackIcon from '../../assets/icons/arrow-left.svg';
import { CartItem } from '../../components/CartItem/CartItem';
import { useAppContext } from '../../hooks/useAppContext';
import { Modal } from '../../components/Modal/Modal';

export const CartPage: React.FC = () => {
  const { cart, clearCart, itemCount } = useAppContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

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

  return (
    <>
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
              {cart.map((item, id) => (
                <CartItem key={id} item={item} />
              ))}
            </div>
            <div className="cart__summary">
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
            </div>
          </div>
        ) : orderConfirmed ? (
          <div className="cart__empty">
            <h1>Your order has been placed</h1>
            <p className="cart__text">Thank you for your purchase!</p>
          </div>
        ) : (
          <div className="cart__empty">
            <h1>Your cart is empty</h1>
            <p className="cart__text">But it's never too late to fix it...</p>
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
