import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import Logo from '../../assets/images/logo.svg?react';
import ArrowUp from '../../assets/icons/arrow_up.svg?react';
import './Footer.scss';
import { useTranslation } from 'react-i18next';
import { LanguagesSelector } from '../LanguagesSelector/LanguagesSelector';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <footer className="footer footer--fixed">
      <div className="footer__content">
        <div className="footer__logo-wrapper">
          <NavLink to="/" className="footer__logo">
            <Logo className="footer__img" />
          </NavLink>
        </div>

        <div className="footer__links-block">
          <Link
            to="https://github.com/fs-jan24-codeup/phone-catalog"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            {t('github')}
          </Link>

          <NavLink to="/contacts" className="footer__link">
            {t('contacts')}
          </NavLink>

          <NavLink to="/rights" className="footer__link">
            {t('rights')}
          </NavLink>
        </div>

        <div className="footer__anchor">
          <span className="footer__label"> {t('backToTop')}</span>
          <LanguagesSelector />

          <button
            onClick={scrollToTop}
            className="footer__link footer__link--top"
          >
            <ArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};
