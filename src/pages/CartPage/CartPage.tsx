import React from 'react';
import { Link } from 'react-router-dom';
import './CartPage.scss';
import goBackIcon from '../../assets/icons/arrow-left.svg';
import deleteIcon from '../../assets/icons/close.svg';

const defaultItems = [
  {
    name: 'Apple iPhone 11 128GB Black',
    image:
      'https://motorolaus.vtexassets.com/arquivos/ids/162813/thinkphone-pdp-ecom-render-5-carbon-black-qq6n0fna.png?v=638084623680430000',
    price: 1000,
  },
  {
    name: 'Apple iPhone 12 Pro 128GB Green',
    image:
      'https://motorolaus.vtexassets.com/arquivos/ids/162813/thinkphone-pdp-ecom-render-5-carbon-black-qq6n0fna.png?v=638084623680430000',
    price: 1200,
  },
  {
    name: 'Apple iPhone 11 128GB Black',
    image:
      'https://motorolaus.vtexassets.com/arquivos/ids/162813/thinkphone-pdp-ecom-render-5-carbon-black-qq6n0fna.png?v=638084623680430000',
    price: 1000,
  },
];

export const CartPage: React.FC = () => {
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
          <div className="cart__list">
            {defaultItems.map(item => (
              <div className="cart__item">
                <div className="cart__item-information">
                  <button
                    type="button"
                    className="cart__button"
                    onClick={() => {}}
                  >
                    <img
                      src={deleteIcon}
                      alt="Delete"
                      className="cart__item-delete"
                    />
                  </button>
                  <img
                    alt="Phone J-7"
                    src={item.image}
                    className="cart__image"
                  />
                  <p className="cart__item-description">{item.name}</p>
                </div>

                <div className="cart__item-controller">
                  <div className="cart__count-controller">
                    <button className="cart__btn cart__btn--plus">+</button>
                    <span className="cart__count--title">1</span>
                    <button className="cart__btn cart__btn--minus">-</button>
                  </div>
                  <div className="cart__item-price">${item.price}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart__summary">
            <div className="cart__total-price">$2000</div>
            <div className="cart__total-price--label">Total for 3 items</div>
            <button type="button" className="cart__submit-btn">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
