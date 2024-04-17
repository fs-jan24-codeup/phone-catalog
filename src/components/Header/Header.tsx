import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';
import menu from '../../assets/icons/menu.svg';
import cart from '../../assets/icons/cart.svg';
import favourites from '../../assets/icons/favourites.svg';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="header__container">
        <img src={logo} alt="Nice gadgets" className="header__logo" />

        <ul className="header__navbar navbar">
          <li>
            <NavLink to="/" className="navbar__link">
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/phones" className="navbar__link">
              Phones
            </NavLink>
          </li>

          <li>
            <NavLink to="/tablets" className="navbar__link">
              Tablets
            </NavLink>
          </li>

          <li>
            <NavLink to="/accessories" className="navbar__link">
              Accessories
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="header__icons">
        <img src={menu} alt="Menu" className="header__menu" />

        <div className="wrapper">
          <img
            src={favourites}
            alt="Favourites"
            className="header__favourites"
          />
          <img src={cart} alt="Cart" className="header__cart" />
        </div>
      </div>
    </div>
  );
};
