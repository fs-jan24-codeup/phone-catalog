import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ButtonAddToCard } from '../ButtonAddToCard';
import { ButtonAddToFavorites } from '../ButtonAddToFavorites';
import './CardLayout.scss';
import { useAppContext } from '../../hooks/useAppContext';

type Props = {
  good: Product;
};

export const CardLayout: React.FC<Props> = ({ good }) => {
  const { images, name, priceRegular, priceDiscount, ram, screen, capacity } =
    good;
  const { addTemporaryCard } = useAppContext();

  return (
    <article className="card" onClick={() => addTemporaryCard(good)}>
      <div className="card__container">
        <Link to={`/phones/${good.id}`}>
          <img src={images[0]} alt={name} className="card__image" />
        </Link>

        <div className="card__name">{name}</div>

        <div className="card__prices">
          <div className="card__price--discount">{`${priceDiscount}$`}</div>
          <div className="card__price">{`${priceRegular}$`}</div>
        </div>

        <div className="card__breakline"></div>

        <div className="card__characteristics characteristics">
          <div className="screen">
            <p className="characteristics--name">Screen</p>
            <p className="characteristics--value">{screen}</p>
          </div>

          <div className="capacity">
            <p className="characteristics--name">Capacity</p>
            <p className="characteristics--value">{capacity}</p>
          </div>

          <div className="ram">
            <p className="characteristics--name">RAM</p>
            <p className="characteristics--value">{ram}</p>
          </div>
        </div>

        <div className="card__button card__button--container">
          <ButtonAddToCard good={good} />
          <ButtonAddToFavorites good={good} />
        </div>
      </div>
    </article>
  );
};
