import { Dispatch, SetStateAction } from 'react';
import { Phone } from './Phone';

export type AppContext = {
  cart: Phone[];
  setCart: Dispatch<SetStateAction<Phone[]>>;
};