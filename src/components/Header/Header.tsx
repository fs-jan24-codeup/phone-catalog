import logo from '../../assets/images/Header/Logo.png';
import menu from '../../assets/images/Header/Menu.svg';
import cart from '../../assets/images/Header/Cart.svg';
import favourites from '../../assets/images/Header/Favourites.svg';
import './Header.scss';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <div className="header">
      <div className="header__container">
        <img src={logo} alt="Nice gadgets" className="header__logo" />

        <ul className="header__navbar navbar">
          <li>
            <NavLink to="#" className="navbar__link">
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="#" className="navbar__link">
              Phones
            </NavLink>
          </li>

          <li>
            <NavLink to="#" className="navbar__link">
              Tablets
            </NavLink>
          </li>

          <li>
            <NavLink to="#" className="navbar__link">
              Accessories
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="header__icons">
        <img src={menu} alt="Menu" className="header__menu" />

        <div className="wrapper">
          <img
            src={favourites}
            alt="Favourites"
            className="header__favourites"
          />
          <img src={cart} alt="Cart" className="header__cart" />
        </div>
      </div>
    </div>
  );
};
