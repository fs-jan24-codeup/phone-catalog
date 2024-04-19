import React, { useState, useEffect } from 'react';
import { Phone } from '../../types/Phone';
import { getAllPhones } from '../../utils/fetchPhonesData';
import { CardLayout } from '../../components/CardLayout';
import goBackIcon from '../../assets/icons/arrow-left.svg';
import { Link } from 'react-router-dom';
import './FavoritesPage.scss';
import { ItemsLayout } from '../../components/ItemsLayout';

export const FavouritesPage: React.FC = () => {
    const [phones, setPhones] = useState<Phone[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      getAllPhones()
        .then(phones => {
          setPhones(phones);
          setLoading(false);
        })
        .catch(error => {
          setError('Error fetching favorites. Please try again later.');
          setLoading(false);
          console.error('Error fetching favorites:', error);
        });
    }, []);
  
    return (
      <div className="favorites-page">
        <div className="button-go-back">
          <img src={goBackIcon} alt="Go back" className="button-go-back__img" />
          <Link to=".." className="button-go-back__link">
            Go back
          </Link>
        </div>
  
        <h1 className="favorites__title">Favourites</h1>
        
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : phones.length === 0 ? (
          <div className="favorites__empty">No favorite phones found.</div>
        ) : (
          <div className="favorites__content-wrapper">
            <ItemsLayout>
              {phones.map(phone => (
                <CardLayout key={phone.id} good={phone}/>
              ))}
            </ItemsLayout>
          </div>
        )}
      </div>
    );
};
