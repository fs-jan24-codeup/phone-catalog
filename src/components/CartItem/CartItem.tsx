import React from 'react';
import Minus from '../../assets/icons/Minus.svg';
import Plus from '../../assets/icons/Plus.svg';
import Union from '../../assets/icons/Union.svg';
import './CartItem.scss';
import { useAppContext } from '../../hooks/useAppContext';
import { CartProduct } from '../../types/CartProduct';

interface Props {
  item: CartProduct;
  updateQuantity: (newQuantity: number) => void;
}

export const CartItem: React.FC<Props> = ({ item, updateQuantity }) => {
  const { id, name, image, price, quantity: initialQuantity } = item;
  const { removeFromCart } = useAppContext();
  const [quantity, setQuantity] = React.useState(initialQuantity || 1);

  const handleClickPlus = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    updateQuantity(quantity + 1);
  };

  const handleClickMinus = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      updateQuantity(quantity - 1);
    }
    if (quantity === 1) {
        removeFromCart(id);
    }
  };

  const handleRemoveFromCart = () => {
    removeFromCart(id);
  };

  return (
    <div className="card-item__container">
      <div className="card-item">
        <div className="cross" onClick={handleRemoveFromCart}>
          <img src={Union} alt="union" className="cart-item__buttons-icon" />
        </div>
        <div className="cart-item__img">
          <img src={image} alt={name} />
        </div>
        <p className="cart-item__name">{name}</p>
        <div className="cart-item__buttons">
          <div className="cart-item__buttons-icons">
          {quantity >= 1 && (
            <button className='cart-item__buttons-icon' onClick={handleClickMinus}>
               <img src={Minus} alt="minus" />
            </button>
          )}
          </div>
          <div className="cart-item__count">{quantity}</div>
          <div className="cart-item__buttons-icons">
            <button className="cart-item__buttons-icon" onClick={handleClickPlus}>
              <img src={Plus} alt="plus" />
            </button>
          </div>
        </div>
        <p className="cart-item__price">{price * quantity}</p>
      </div>
    </div>
  );
};
