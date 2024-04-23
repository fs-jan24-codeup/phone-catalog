import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import menu from '../../assets/icons/menu.svg';
import cancel from '../../assets/icons/close.svg';
import shoppingCart from '../../assets/icons/shopping-cart.svg';
import favourites from '../../assets/icons/favourites.svg';
import { SelectedItemsCircle } from '../SelectedItemsCircle/SelectedItemsCircle';
import './Header.scss';
import { Menu } from '../Menu';
import classNames from 'classnames';

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
        <img src={logo} alt="Nice gadgets" className="header__logo" />

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
            <img 
              src={isMenuOpen ? cancel : menu} 
              alt="Menu" 
              className="header__icon--menu" />
          </button>
        )}

        <div className="wrapper">
          <NavLink to="/favourites" className={getHeaderIconClass}>
            <img
              src={favourites}
              alt="Favourites"
              className="header__favourites"
            />
            <SelectedItemsCircle type="favourite" />
          </NavLink>
          <NavLink to="/cart" className={getHeaderIconClass}>
            <img 
              src={shoppingCart} 
              alt="Cart" 
              className="header__cart" />
            <SelectedItemsCircle type="cart" />
          </NavLink>
        </div>
      </div>

      {isMenuOpen && isMobile && <Menu onCloseMenu={toggleMenu} />}
    </div>
  );
};
