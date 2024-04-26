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
import { Search } from '../Search';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
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

  const { t } = useTranslation();

  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <div className="header">
      <div className="header__wrapper">
        <NavLink to="/" className="header__home">
          <Logo className="header__logo" />
        </NavLink>

        <ul className="header__navbar navbar">
          <li>
            <NavLink to="/" className={getHeaderLinkClass}>
              {t('home')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/phones" className={getHeaderLinkClass}>
              {t('phones')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/tablets" className={getHeaderLinkClass}>
              {t('tablets')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/accessories" className={getHeaderLinkClass}>
              {t('accessories')}
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="header__right">
        <Search />
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
    </div>
  );
};
