import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';
import arrowUp from '../../assets/icons/arrow_up.svg';
import './Footer.scss';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer>
      <div className="container footer">
        <div className="footer__content">
          <div className="footer__logo-wrapper">
            <Link to="/" className="footer__logo">
              <img className="footer__img" alt="logo" src={logo} />
            </Link>
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

            <Link to="/" className="footer__link">
              Contacts
            </Link>

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
              <img src={arrowUp} alt="Arrow Up" className="footer__arrow" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
