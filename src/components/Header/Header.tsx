import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import logo from '../../assets/images/logo.svg';
import menu from '../../assets/icons/menu.svg';
import cartImg from '../../assets/icons/cart.svg';
import favourites from '../../assets/icons/favourites.svg';
import { SelectedItemsCircle } from '../SelectedItemsCircle/SelectedItemsCircle';
import './Header.scss';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar__link', { 'navbar__link--active': isActive });


export const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="header__wrapper">
        <img src={logo} alt="Nice gadgets" className="header__logo" />

        <ul className="header__navbar navbar">
          <li>
            <NavLink to="/" className={getLinkClass}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/phones" className={getLinkClass}>
              Phones
            </NavLink>
          </li>

          <li>
            <NavLink to="/tablets" className={getLinkClass}>
              Tablets
            </NavLink>
          </li>

          <li>
            <NavLink to="/accessories" className={getLinkClass}>
              Accessories
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="header__icons">
        <img src={menu} alt="Menu" className="header__menu" />

        <div className="wrapper">
          <NavLink to="/favourites" className={getLinkClass}>
            <img src={favourites} alt="Favourites" className="header__favourites" />
          </NavLink>
          <NavLink to="/cart" className={getLinkClass}>
            <img src={cartImg} alt="Cart" className="header__cart" />
            <SelectedItemsCircle />
          </NavLink>
        </div>
      </div>
    </div>
  );
};
