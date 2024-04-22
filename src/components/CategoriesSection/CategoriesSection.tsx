import { NavLink } from "react-router-dom";
import accessories from '../../../public/img/categories/accessories.svg';
import tablets from '../../../public/img/categories/tablets.svg';
import phones from '../../../public/img/categories/phones.svg';
import './CategoriesSection.scss';

export const CategoriesSection: React.FC = () => {
    return (
        <div className="categories-section">
            <h1 className="categories-section__title">Shop by category</h1>
            <div className="categories-section__content">
                <div className="categories-section__content__section">
                     <NavLink to="/phones" className="categories-section__content__link">
                        <img src={phones} alt="phones" className="categories-section__content__image" />
                    </NavLink>
                    <p className="categories-section__content__item">Mobile phones</p>
                    <p className="categories-section__content__quantity">models</p>
                </div>
               
               
                <div className="categories-section__content__section">
                    <NavLink to="/tablets" className="categories-section__content__link">
                        <img src={tablets} alt="tablets" className="categories-section__content__image" />
                    </NavLink>
                    <p className="categories-section__content__item">Tablets</p>
                    <p className="categories-section__content__quantity">models</p>
                </div>


                <div className="categories-section__content__section">
                    <NavLink to="/accessories" className="categories-section__content__link">
                        <img src={accessories} alt="accessories" className="categories-section__content__image" />
                    </NavLink>
                    <p className="categories-section__content__item">Accessories</p>
                    <p className="categories-section__content__quantity">models</p>
                </div>
            </div>
        </div>
    )
}