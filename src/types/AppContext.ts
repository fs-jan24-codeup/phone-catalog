import { Dispatch, SetStateAction } from 'react';
import { Phone } from './Phone';
import { CartProduct } from './CartProduct';

export type AppContext = {
  cart: CartProduct[];
  setCart: Dispatch<SetStateAction<CartProduct[]>>;
  addToCart: (product: Phone) => void;
  removeFromCart: (productId: string) => void;
  isItemAdded: (productId: string) => boolean;
};
