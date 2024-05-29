import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { SelectedItemsCircle } from '../SelectedItemsCircle/SelectedItemsCircle';
import { Menu } from '../Menu';
import Logo from '../../assets/images/logo.svg?react';
import MenuIcon from '../../assets/icons/menu.svg?react';
import Cancel from '../../assets/icons/close.svg?react';
import ShoppingCart from '../../assets/icons/shopping-cart.svg?react';
import Favourites from '../../assets/icons/favourites.svg?react';
import ProfileImage from '../../../public/img/profile-svgrepo-com.svg';
import './Header.scss';
import { Search } from '../Search';
import { useTranslation } from 'react-i18next';
import SearchIcon from '../../assets/icons/search.svg?react';
import Close from '../../assets/icons/close.svg?react';
import { ThemeToggler } from '../ThemeToggler/ThemeToggler';
import { useThemeContext } from '../../hooks/useThemeContext';
import { useAppContext } from '../../hooks/useAppContext';
import { LanguagesSelector } from '../LanguagesSelector/LanguagesSelector';
import { AuthContext } from '../../context/AuthContext';

interface HeaderProps {
  setShowInitialForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<HeaderProps> = ({ setShowInitialForm }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // State to manage profile menu
  const { theme, setTheme, themes } = useThemeContext();
  const { isSearchOpen, setIsSearchOpen } = useAppContext();
  const { isAuthenticated } = useContext(AuthContext);
  const { t } = useTranslation();
  const { logout } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsMenuOpen(false);
    setIsSearchOpen((prev) => !prev);
  };

  const handleLoginClick = () => {
    setShowInitialForm(true);
  };

  const handleLogout = () => {
    logout();
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

  useEffect(() => {
  }, [isAuthenticated]);

  const getHeaderLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar__link', { 'navbar__link--active': isActive });

  const getHeaderIconClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar__icon', { 'navbar__link--active': isActive });

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <div className="header" id="header">
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
        <div className="header__icons">
          <LanguagesSelector />

          {isSearchOpen && (
            <div className="search-wrapper">
              <Search />
              <button
                className="header__button header__close"
                onClick={toggleSearch}
              >
                <Close />
              </button>
            </div>
          )}

          <button className="header__button" onClick={toggleSearch}>
            {isSearchOpen ? <Close /> : <SearchIcon />}
          </button>

          <ThemeToggler
            onChange={() => {
              if (theme === themes.light) setTheme(themes.dark);
              if (theme === themes.dark) setTheme(themes.light);
            }}
            value={theme === themes.dark}
            className="header__switcher header__button"
          />

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

          <div className="header__profile">
            {isAuthenticated && isProfileMenuOpen && (
              <div className="header__profile-window">
                <NavLink to="/profile" className='header__title'>Profile</NavLink>
                <button className="profile__button" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>

          {isAuthenticated ? (
            <div className='header__button' onClick={toggleProfileMenu}>
            <img src={ProfileImage} alt="Profile" className="header__profile-image"/>
            </div>
          ) : (
            <p className="header__login header__button" onClick={handleLoginClick}>Log In</p>
          )}
        </div>

        {isMenuOpen && isMobile && <Menu onCloseMenu={toggleMenu} />}
      </div>
    </div>
  );
};
