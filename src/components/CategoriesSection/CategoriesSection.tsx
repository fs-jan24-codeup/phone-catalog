import { NavLink } from 'react-router-dom';

import accessories from '../../assets/images/accessories.png';
import tablets from '../../assets/images/tablets.png';
import phones from '../../assets/images/phones.png';
import './CategoriesSection.scss';

export const CategoriesSection: React.FC = () => {
  return (
    <div className="categories">
      <h1 className="categories__title">Shop by category</h1>
      <div className="categories__content">
        <div className="categories__content__section">
          <NavLink to="/phones" className="categories__content__link">
            <img
              src={phones}
              alt="phones"
              className="categories__content__image"
            />
          </NavLink>
          <p className="categories__content__item">Mobile phones</p>
          <p className="categories__content__quantity">models</p>
        </div>

        <div className="categories__content__section">
          <NavLink to="/tablets" className="categories__content__link">
            <img
              src={tablets}
              alt="tablets"
              className="categories__content__image"
            />
          </NavLink>
          <p className="categories__content__item">Tablets</p>
          <p className="categories__content__quantity">models</p>
        </div>

        <div className="categories__content__section">
          <NavLink to="/accessories" className="categories__content__link">
            <img
              src={accessories}
              alt="accessories"
              className="categories__content__image"
            />
          </NavLink>
          <p className="categories__content__item">Accessories</p>
          <p className="categories__content__quantity">models</p>
        </div>
      </div>
    </div>
  );
};
