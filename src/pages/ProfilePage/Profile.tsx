import { CartItem } from '../../components/CartItem/CartItem';
import { GoBack } from '../../components/GoBack';
import { useConfirmedOrders } from '../../utils/ConfirmedOrders'; 
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

import './Profile.scss';

export const Profile = () => {
    const { logout } = useContext(AuthContext);
    const { confirmedOrders } = useConfirmedOrders(); 
    const userData = JSON.parse(localStorage.getItem('userData') || '');

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="profile">
            <GoBack />
            <div className="profile__info">
                <h2 className="profile__title">User Profile</h2>
                <p className="profile__text">Name: {userData.name}</p>
                <p className="profile__text">Email: {userData.email}</p>
                {confirmedOrders.length > 0 ? (
                    <div className="profile__orders">
                        {confirmedOrders.map((order, index) => (
                            <CartItem key={index} item={order} />
                        ))}
                    </div>
                ) : (
                    <p>No confirmed orders</p>
                )}
                <button className="profile__button" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};
