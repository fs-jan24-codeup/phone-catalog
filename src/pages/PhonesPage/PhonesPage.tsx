import React from 'react';
import { useState, useEffect } from 'react';
import { Phone } from '../../types/Phone';
import { getAllPhones } from '../../utils/fetchPhonesData';

export const PhonePages: React.FC = () => {
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
          <li key={phone.id}>{phone.name}</li>
        ))}
      </ul>
    </div>
  );
};
