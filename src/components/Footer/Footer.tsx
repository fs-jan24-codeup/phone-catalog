import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container footer">
        <div className="footer__content">
          <div className="footer__logo-wrapper">
            <Link to="/" className="footer__logo">
              <img className="footer__img" alt="logo" src="./img/logo.svg" />
            </Link>
          </div>

          <div className="footer__links-block">
            <Link
              to="https://github.com/fs-jan24-codeup/phone-catalog"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              GITHUB
            </Link>

            <Link to="/" className="footer__link">
              CONTACTS
            </Link>

            <Link to="/" className="footer__link">
              RIGHTS
            </Link>
          </div>

          <div className="footer__anchor">
            <span className="footer__label">Back to top</span>
            <Link to="#top" className="footer__link footer__link--top">
              <img
                src="./img/arrow_up.svg"
                alt="Arrow Up"
                className="footer__arrow"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
