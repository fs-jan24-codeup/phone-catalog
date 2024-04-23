import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { ButtonAddToCard } from '../ButtonAddToCard';
import './PriceInfo.scss';
import { useEffect, useState } from 'react';
import { getProduct } from '../../utils/fetchData';
import { Product } from '../../types/Product';
import { ButtonAddToFavorites } from '../ButtonAddToFavorites';

export const PriceInfo = () => {
  const [good, setGood] = useState<Product | null>(null);
  const { productId } = useParams();

  const {
    capacityAvailable = [],
    colorsAvailable = [],
    screen,
    resolution,
    processor,
    ram,
    priceRegular,
    priceDiscount,
  } = good || {};

  const isActive = false;

  useEffect(() => {
    if (productId) {
      getProduct('./api/phones.json', productId)
        .then(product => setGood(product))
        .catch(error => console.log(error));
    }
  }, []);

  return (
    <>
      <div className="uppertext">
        <span>Available colors</span>
        <span>ID: 802390</span>
      </div>

      <div className="product-card">
        <Link to="#">
          <div className="product-card__options color">
            {colorsAvailable.map(color => (
              <div
                key={color}
                className={cn('color__option', {
                  'color__option--active': isActive,
                })}
                style={{ backgroundColor: color }}
              >
                <span className="checkmark"></span>
              </div>
            ))}
          </div>
        </Link>

        <div className="product-card__top-text">Select capacity</div>
        <Link to="#">
          <div className="product-card__options product-card__capacity">
            {capacityAvailable.map(capacity => (
              <div
                key={capacity}
                className={cn('capacity__option', {
                  'capacity__option--active': isActive,
                })}
              >
                {capacity}
              </div>
            ))}
          </div>
        </Link>

        <div className="product-card__price">
          <span className="product-card__price-new">{priceDiscount}</span>
          <span className="product-card__price-old">{priceRegular}</span>
        </div>

        <div className="card__button card__button--container">
          {good && <ButtonAddToCard good={good} />}
          {good && <ButtonAddToFavorites good={good} />}
        </div>

        <div className="product-card__details">
          <p className="details">
            <span className="details__text">Screen</span>
            <span>{screen}</span>
          </p>

          <p className="details">
            <span className="details__text">Resolution</span>
            <span>{resolution}</span>
          </p>

          <p className="details">
            <span className="details__text">Processor</span>
            <span>{processor}</span>
          </p>

          <p className="details">
            <span className="details__text">RAM</span>
            <span>{ram}</span>
          </p>
        </div>
      </div>
    </>
  );
};
