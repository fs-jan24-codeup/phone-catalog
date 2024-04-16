import { useState } from 'react';
import './App.css';
import { Phone } from './types/Phone';
import phonesFromServer from '../public/api/phones.json';

function App() {
  const [phones] = useState<Phone[]>(phonesFromServer);

  return (
    <ul>
    {phones.map(phone => (
      <li key={phone.id}>{phone.name}</li>
    ))}
  </ul>
  );
}

export default App;
