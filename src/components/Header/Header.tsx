import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { SelectedItemsCircle } from '../SelectedItemsCircle/SelectedItemsCircle';
import { Menu } from '../Menu';

import Logo from '../../assets/images/logo.svg?react';
import MenuIcon from '../../assets/icons/menu.svg?react';
import Cancel from '../../assets/icons/close.svg?react';
import ShoppingCart from '../../assets/icons/shopping-cart.svg?react';
import Favourites from '../../assets/icons/favourites.svg?react';
import './Header.scss';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (isMenuOpen) {
        e.preventDefault();
      }
    };

    if (isMenuOpen) {
      document.body.classList.add('disable-scroll');
      window.addEventListener('wheel', handleScroll, { passive: false });
    } else {
      document.body.classList.remove('disable-scroll');
      window.removeEventListener('wheel', handleScroll);
    }

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [isMenuOpen]);

  const getHeaderLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar__link', { 'navbar__link--active': isActive });

  const getHeaderIconClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar__icon', { 'navbar__link--active': isActive });

  return (
    <div className="header">
      <div className="header__wrapper">
        <Logo className="header__logo" />

        <ul className="header__navbar navbar">
          <li>
            <NavLink to="/" className={getHeaderLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/phones" className={getHeaderLinkClass}>
              Phones
            </NavLink>
          </li>
          <li>
            <NavLink to="/tablets" className={getHeaderLinkClass}>
              Tablets
            </NavLink>
          </li>
          <li>
            <NavLink to="/accessories" className={getHeaderLinkClass}>
              Accessories
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="header__icons">
        {(isMobile || isMenuOpen) && (
          <button className="header__menu__toggler" onClick={toggleMenu}>
            {isMenuOpen ? <Cancel /> : <MenuIcon />}
          </button>
        )}

        <div className="wrapper">
          <NavLink to="/favourites" className={getHeaderIconClass}>
            <Favourites />
            <SelectedItemsCircle type="favourite" />
          </NavLink>
          <NavLink to="/cart" className={getHeaderIconClass}>
            <ShoppingCart />
            <SelectedItemsCircle type="cart" />
          </NavLink>
        </div>
      </div>

      {isMenuOpen && isMobile && <Menu onCloseMenu={toggleMenu} />}
    </div>
  );
};
