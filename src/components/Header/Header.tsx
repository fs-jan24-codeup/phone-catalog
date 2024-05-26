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
import ProfileImage from '../../assets/images/logo.svg';
import './Header.scss';
import { Search } from '../Search';

import { useTranslation } from 'react-i18next';

import SearchIcon from '../../assets/icons/search.svg?react';
import Close from '../../assets/icons/close.svg?react';
import { ThemeToggler } from '../ThemeToggler/ThemeToggler';

import { useThemeContext } from '../../hooks/useThemeContext';
import { useAppContext } from '../../hooks/useAppContext';
import { LanguagesSelector } from '../LanguagesSelector/LanguagesSelector';

interface ProfileInfo {
  name: string;
  email: string;
}

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { theme, setTheme, themes } = useThemeContext();
  const { isSearchOpen, setIsSearchOpen } = useAppContext();
  
  const [isProfileActive, setIsProfileActive] = useState(false);
  const [isProfileWindowOpen, setIsProfileWindowOpen] = useState(false);
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({ name: '', email: '' });
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(prev => !prev);
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

  const getProfileIconClass = () =>
    classNames('navbar__icon', { 'navbar__link--active': isProfileActive });

  const { t } = useTranslation();

  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const handleProfileClick = () => {
    setIsProfileWindowOpen(true);
    setIsProfileActive(true);
    const userData = localStorage.getItem('userData');
    if (userData) {
      setProfileInfo(JSON.parse(userData));
    }
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
              <div className={getProfileIconClass()} onClick={handleProfileClick}>
                <img src={ProfileImage} alt="Profile" className="header__profile-image" />
              </div>
          </div>
        </div>

        {isMenuOpen && isMobile && <Menu onCloseMenu={toggleMenu} />}
        {isProfileWindowOpen && (
        <div className="header__profile-window">
          <div className="header__profile-info">
            <h2 className="header__profile-title">User Profile</h2>
            <p className="header__profile-text">Name: {profileInfo.name}</p>
            <p className="header__profile-text">Email: {profileInfo.email}</p>
            <button className="form__button" onClick={() => { setIsProfileWindowOpen(false); setIsProfileActive(false); }}>Close</button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
