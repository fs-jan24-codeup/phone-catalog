import React, { useEffect, useState } from 'react';
import { CartItem } from '../../components/CartItem/CartItem';
import { GoBack } from '../../components/GoBack';
import { useConfirmedOrders } from '../../utils/ConfirmedOrders'; 

export const Profile = () => {
    const { confirmedOrders } = useConfirmedOrders(); 
    const [name, setName] = useState(localStorage.getItem('name'));
    const [email, setEmail] = useState(localStorage.getItem('email'));

    useEffect(() => {
        setName(localStorage.getItem('name'));
        setEmail(localStorage.getItem('email'));
    }, []);

    return (
        <div className="profile">
            <GoBack />
            <div className="profile__info">
                <h2 className="profile__title">User Profile</h2>
                <p className="profile__text">Name: {name}</p>
                <p className="profile__text">Email: {email}</p>
                {confirmedOrders.length > 0 ? (
                    <div className="profile__orders">
                        {confirmedOrders.map((order, index) => (
                            <CartItem key={index} item={order} />
                        ))}
                    </div>
                ) : (
                    <p>No confirmed orders</p>
                )}
            </div>
        </div>
    );
};
