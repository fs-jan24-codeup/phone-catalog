import { useEffect, useState } from 'react';

import cn from 'classnames';
import { Link, useLocation, useParams } from 'react-router-dom';

import { Product } from '../../types/Product';
import { getProduct } from '../../utils/fetchData';
import { ButtonAddToCard } from '../ButtonAddToCard';
import { ButtonAddToFavorites } from '../ButtonAddToFavorites';

import './PriceInfo.scss';

const getNewLink = (productId: string): string => {
  const segments = productId.split('-');
  const suffixToRemove = productId.includes('space-gray') ? 3 : 2;

  const newSegments = segments.slice(0, -suffixToRemove);
  const newLink = newSegments.join('-');

  return newLink;
};

const getValidColors = (colors: string[]): string[] => {
  return colors.map(color => color.replace(/\s+/g, '-'));
};

const getValidColor = (color: string): string => {
  return color.replace(/\s+/g, '-');
};

export const PriceInfo = () => {
  const [good, setGood] = useState<Product | null>(null);
  const [activeColor, setActiveColor] = useState('');
  const [activeCapacity, setActiveCapacity] = useState('');

  const { productId } = useParams();

  const { pathname } = useLocation();

  const BASE_PATH = pathname.split('/')[1];

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

  const colors = getValidColors(colorsAvailable);

  useEffect(() => {
    if (productId) {
      getProduct(`./api/${BASE_PATH}.json`, productId)
        .then(product => {
          setActiveColor(getValidColor(product.color));
          setActiveCapacity(product.capacity.toLowerCase());
          setGood(product);
        })
        .catch(error => console.log(error));
    }
  }, [productId]);

  const handleClickColor = (color: string) => {
    setActiveColor(color);
  };

  const handleClickCapacity = (capacity: string) => {
    setActiveCapacity(capacity.toLowerCase());
  };

  const link = getNewLink(productId || '');

  return (
    <>
      <div className="uppertext">
        <span>Available colors</span>
        <span>ID: 802390</span>
      </div>

      <div className="product-card">
        <div className="product-card__options color">
          {colors.map(color => (
            <Link
              key={color}
              to={`/${BASE_PATH}/${link}-${activeCapacity}-${color}`}
            >
              <div
                onClick={() => handleClickColor(color)}
                className={cn(`color__option color__option--${color}`, {
                  'color__option--active': activeColor === color,
                })}
              ></div>
            </Link>
          ))}
        </div>

        <div className="product-card__top-text">Select capacity</div>
        <div className="product-card__options capacity">
          {capacityAvailable.map(capacity => {
            const formattedCapacity = capacity.toLowerCase();
            const isActive = activeCapacity === formattedCapacity;

            return (
              <Link
                key={capacity}
                to={`/${BASE_PATH}/${link}-${formattedCapacity}-${activeColor}`}
              >
                <div
                  onClick={() => handleClickCapacity(capacity)}
                  className={cn('capacity__option', {
                    'capacity__option--active': isActive,
                  })}
                >
                  {capacity}
                </div>
              </Link>
            );
          })}
        </div>

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
