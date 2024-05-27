import React, { useEffect, useState } from 'react';
import './CartPage.scss';
import '../../components/FadeOut/FadeOut.scss';

import { CartItem } from '../../components/CartItem/CartItem';
import { useAppContext } from '../../hooks/useAppContext';
import { Modal } from '../../components/Modal/Modal';
import orderSuccessul from '../../assets/images/order-received.gif';
import emptyCart from '../../assets/images/empty-cart.gif';
import { CartSummarySkeleton } from './CartSummarySkeleton';
import { GoBack } from '../../components/GoBack';
import { useTranslation } from 'react-i18next';
import { isLoggedIn } from '../../utils/UserLogedIn';
import InitialForm from '../../components/Forms/InitialForm/InitialForm';
import { useFormVisibility } from '../../context/FormContext';
import { useConfirmedOrders } from '../../utils/ConfirmedOrders';

export const CartPage: React.FC = () => {
  const { cart, clearCart, itemCount } = useAppContext();
  const { showInitialForm, setShowInitialForm } = useFormVisibility();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [isLoadingSummary, setIsLoadingSummary] = useState(true);
  const { addConfirmedOrder } = useConfirmedOrders();

  const { t } = useTranslation();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const confirmOrder = () => {
    setIsModalOpen(false);
    clearCart();
    setOrderConfirmed(true);
    cart.forEach((item) => {
      addConfirmedOrder(item);
    });
  };
  

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isModalOpen]);

  const userLoggedIn = isLoggedIn();

  const handleYesButtonClick = () => {
    const userDataSaved = localStorage.getItem('userData');
    if (!userDataSaved) {
      setShowInitialForm(true);
    } else {
      confirmOrder();
    }
  };
  

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingSummary(false);
    }, 700);
  }, []);

  return (
    <div className="cart cart__grid fadeOut animate">
      <GoBack />

      <h1 className="cart__title fadeOut">{t('cart')}</h1>

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
                  {t('totalFor')} {itemCount} {t('items')}
                </div>
                <button
                  type="button"
                  className="cart__submit-btn"
                  onClick={openModal}
                >
                  {t('checkout')}
                </button>
              </>
            )}
          </div>
        </div>
      ) : orderConfirmed ? (
        <div className="cart__empty fadeOut animate">
          <h1 className="cart__empty--title">
            {t('yourOrderHasBeenPlacedSuccessfuly')}
          </h1>
          <img
            src={orderSuccessul}
            alt="Thank you for your purchase"
            className="cart__empty--img"
          />
        </div>
      ) : (
        <div className="cart__empty">
          <h1 className="cart__empty--title">{t('yourCartIsEmpty')}</h1>

          <img
            className="cart__empty--img"
            src={emptyCart}
            alt="Your cart is empty"
          />
        </div>
      ) 
      }
      {!userLoggedIn && showInitialForm && <InitialForm onClose={() => {}} setShowForm={() => {}} />}


      {isModalOpen && (
        <Modal onClose={closeModal}>
          <>
            <h2 className="modal__title">{t('wantToConfirmOrder')}</h2>
            <div className="modal__btn-wrapper">
              <button
                onClick={closeModal}
                className="modal__btn modal__btn--no"
              >
                {t('no')}
              </button>
              <button
                onClick={handleYesButtonClick}
                className="modal__btn modal__btn--yes"
              >
                {t('yes')}
              </button>
            </div>
          </>
        </Modal>
      )}
    </div>
  );
};

