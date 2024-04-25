import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import Logo from '../../assets/images/logo.svg?react';
import ArrowUp from '../../assets/icons/arrow_up.svg?react';
import './Footer.scss';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

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
            Github
          </Link>

          <NavLink to="/contacts" className="footer__link">
            Contacts
          </NavLink>

          <Link to="/" className="footer__link">
            Rights
          </Link>
        </div>

        <div className="footer__anchor">
          <span className="footer__label">Back to top</span>
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
