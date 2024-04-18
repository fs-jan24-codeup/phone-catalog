import React from 'react';
import { useState, useEffect } from 'react';
import { Phone } from '../../types/Phone';
import { getAllPhones } from '../../utils/fetchPhonesData';
import { CardLayout } from '../../components/CardLayout';

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);

  useEffect(() => {
    getAllPhones()
      .then(phones => setPhones(phones))
      .catch(error => console.error('Error fetching phones:', error));
  }, []);

  return (
    <div>
      <ul>
        {phones.map(phone => (
          <CardLayout good={phone} key={phone.id} />
        ))}
      </ul>
    </div>
  );
};
