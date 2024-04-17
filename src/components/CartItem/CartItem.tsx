import React from 'react';

import Minus from '../../assets/icons/Minus.svg';
import Plus from '../../assets/icons/Plus.svg';
import Union from '../../assets/icons/Union.svg';
import Photo from '../../assets/icons/Photo.svg';

import './CartItem.scss';

export const CartItem = () => {
    const [count, setCount] = React.useState(1);

    function handleClickPlus() {
        setCount(count + 1);
    }

    function handleClickMinus() {
        if (count > 1) {
            setCount(count - 1);
        }
    }

    return (
        <div className='card-item__container'>
            <div className='card-item'>
            <div className='cross'>
                <img src={Union} alt="union" className='cart-item__buttons-icon'/>
            </div>
            <div className='cart-item__img'>
                <img src={Photo} alt="Photo"/>
            </div>
            <div className='cart-item__name'>Apple iPhone 14 Pro 128GB Silver (MQ023)</div>
            <div className='cart-item__buttons'>
                <div className='cart-item__buttons-icons'>
                    <img src={Minus} alt="minus" className='cart-item__buttons-icon' onClick={handleClickMinus}/>
                </div>
                <div className='cart-item__count'>{count}</div>
                <div className='cart-item__buttons-icons'>
                    <img src={Plus} alt="plus" className='cart-item__buttons-icon' onClick={handleClickPlus} />
                </div>
            </div>
            <div className='cart-item__price'>$1000</div>
            </div>
        </div>
    );
}
