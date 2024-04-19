import { Phone } from './Phone';
import { CartProduct } from './CartProduct';

export type AppContext = {
  cart: CartProduct[];
  addToCart: (product: Phone) => void;
  removeFromCart: (productId: string) => void;
  isItemAdded: (productId: string) => boolean;
  updateQuantity: (id: string, newQuantity: number) => void;
};
