import { NavLink } from 'react-router-dom';
import './Menu.scss';
import cart from '../../assets/icons/shopping-cart.svg';
import favourites from '../../assets/icons/favourites.svg';
import classNames from 'classnames';

interface MenuProps {
  onCloseMenu?: (event?: React.MouseEvent) => void;
}

const getMenuIconClass = ({ isActive }: { isActive: boolean }) =>
  classNames('menu__navbar__icon', { 'menu__navbar__link--active': isActive });

const getMenuLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('menu__navbar__link', { 'menu__navbar__link--active': isActive });

export const Menu: React.FC<MenuProps> = ({ onCloseMenu }) => {
  const handleLinkClick = (event?: React.MouseEvent) => {
    if (onCloseMenu) {
      onCloseMenu(event);
    }
  };

  return (
    <div className="menu">
      <ul className="menu__navbar">
        <li>
          <NavLink
            to="/"
            className={getMenuLinkClass}
            onClick={handleLinkClick}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/phones"
            className={getMenuLinkClass}
            onClick={handleLinkClick}
          >
            Phones
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tablets"
            className={getMenuLinkClass}
            onClick={handleLinkClick}
          >
            Tablets
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/accessories"
            className={getMenuLinkClass}
            onClick={handleLinkClick}
          >
            Accessories
          </NavLink>
        </li>
      </ul>

      <div className="menu__navbar__icons">
        <NavLink
          to="/favourites"
          className={(props) => classNames(
            getMenuIconClass(props),
            'menu__navbar__icon__wrapper',
            'menu__navbar__icon__wrapper--favourites'
          )}
          onClick={handleLinkClick}
        >
          <img
            src={favourites}
            alt="Favourites"
            className="menu__navbar__icon--favourites"
          />
        </NavLink>
        <NavLink
          to="/cart"
          className={(props) => classNames(
            getMenuIconClass(props),
            'menu__navbar__icon__wrapper',
            'menu__navbar__icon__wrapper--cart'
          )}
          onClick={handleLinkClick}
        >
          <img
            src={cart}
            alt="Cart"
            className="menu__navbar__icon--cart"
          />
        </NavLink>
      </div>
    </div>
  );
};
