import logo from '../../images/Header/Logo.png';
import menu from '../../images/Header/Menu.png';
import cart from '../../images/Header/Cart.png';
import favourites from '../../images/Header/Favourites.png';
import './Header.scss';

export const Header = () => {
  return (
    <div className="header">
      <div className="header__container">
        <img src={logo} alt="Nice gadgets" className="header__logo" />

        <ul className="header__navbar navbar">
          <li>
            <a href="#" className="navbar__link">
              Home
            </a>
          </li>

          <li>
            <a href="#" className="navbar__link">
              Phones
            </a>
          </li>

          <li>
            <a href="#" className="navbar__link">
              Tablets
            </a>
          </li>

          <li>
            <a href="#" className="navbar__link">
              Accessories
            </a>
          </li>
        </ul>
      </div>

      <div className="header__icons">
        <img src={cart} alt="Cart" className="header__cart" />
        <div className="wrapper">
          <img src={favourites} alt="Favourites" className="header__favourites" />
          <img src={menu} alt="Menu" className="header__menu" />
        </div>
      </div>
    </div>
  );
};
