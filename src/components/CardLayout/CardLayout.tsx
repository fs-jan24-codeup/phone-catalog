import { Link, useParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ButtonAddToCard } from '../ButtonAddToCard';
import { ButtonAddToFavorites } from '../ButtonAddToFavorites';
import './CardLayout.scss';
import { useEffect, useState } from 'react';
import { CardSkeleton } from '../CardSkeleton';
import { useTranslation } from 'react-i18next';

type Props = {
  good: Product;
};

export const CardLayout: React.FC<Props> = ({ good }) => {
  const { productId } = useParams();

  const { t } = useTranslation();

  const {
    images,
    name,
    priceRegular,
    priceDiscount,
    ram,
    screen,
    capacity,
    category,
  } = good;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: productId ? 'smooth' : 'instant',
    });
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  }, []);

  return (
    <article className={`card ${isLoading ? 'skeleton' : ''}`}>
      {isLoading ? (
        <CardSkeleton />
      ) : (
        <div className="card__container">
          <Link
            className="card__link"
            to={`/${category}/${good.id}`}
            onClick={scrollToTop}
          >
            <img src={images[0]} alt={name} className="card__image" />
          </Link>
          <Link
            onClick={scrollToTop}
            className="card__name"
            to={`/${category}/${good.id}`}
          >
            {name}
          </Link>

          <div className="card__prices">
            <div className="card__price--discount">{`${priceDiscount}$`}</div>
            <div className="card__price">{`${priceRegular}$`}</div>
          </div>

          <div className="card__breakline"></div>

          <div className="card__characteristics characteristics">
            <div className="screen">
              <p className="characteristics--name">{t('screen')}</p>
              <p className="characteristics--value">{screen}</p>
            </div>

            <div className="capacity">
              <p className="characteristics--name">{t('capacity')}</p>
              <p className="characteristics--value">{capacity}</p>
            </div>

            <div className="ram">
              <p className="characteristics--name">{t('RAM')}</p>
              <p className="characteristics--value">{ram}</p>
            </div>

            <div className="card__button card__button--container">
              <ButtonAddToCard good={good} />
              <ButtonAddToFavorites good={good} />
            </div>
          </div>
        </div>
      )}
    </article>
  );
};
