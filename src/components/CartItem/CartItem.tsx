import React from 'react';
import minus from '../../assets/icons/minus.svg';
import plus from '../../assets/icons/plus.svg';
import close from '../../assets/icons/close.svg';
import './CartItem.scss';
import { useAppContext } from '../../hooks/useAppContext';
import { CartProduct } from '../../types/CartProduct';
import { Link } from 'react-router-dom';

interface Props {
  item: CartProduct;
}

export const CartItem: React.FC<Props> = ({ item }) => {
  const { id, name, image, price, quantity: initialQuantity } = item;
  const { removeFromCart, updateQuantity } = useAppContext();
  const [quantity, setQuantity] = React.useState(initialQuantity);

  const handleClickPlus = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(id, newQuantity);
  };

  const handleClickMinus = () => {
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    updateQuantity(id, newQuantity);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(id);
  };

  return (
    <div className="card-item__container">
      <div className="card-item">
        <button onClick={handleRemoveFromCart} className="cross">
          <img src={close} alt="union" />
        </button>
        <div className="cart-item__img">
          <img src={image} alt={name} />
        </div>
        <Link className="cart-item__name" to={`/phones/${id}`}>
          {name}
        </Link>
        <div className="cart-item__buttons">
          <div className="cart-item__buttons-icons">
            <button
              className="cart-item__buttons-icon"
              onClick={handleClickMinus}
              disabled={quantity === 1}
            >
              <img src={minus} alt="minus" />
            </button>
          </div>
          <div className="cart-item__count">{quantity}</div>

          <button className="cart-item__buttons-icon" onClick={handleClickPlus}>
            <img src={plus} alt="plus" />
          </button>
        </div>
        <p className="cart-item__price">{price * quantity}</p>
      </div>
    </div>
  );
};
