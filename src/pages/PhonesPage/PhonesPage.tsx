import React from 'react';
import { useState, useEffect } from 'react';
import { Phone } from '../../types/Phone';
import { getAllPhones } from '../../utils/fetchPhonesData';
import { CardLayout } from '../../components/CardLayout';
import { ItemsLayout } from '../../components/ItemsLayout';

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);

  useEffect(() => {
    getAllPhones()
      .then(phones => setPhones(phones))
      .catch(error => console.error('Error fetching phones:', error));
  }, []);

  return (
      <ItemsLayout>
          {phones.map(phone => (
            <CardLayout key={phone.id} good={phone}/>
          ))}
      </ItemsLayout>
  );
};
