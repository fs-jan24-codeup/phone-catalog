import { Product } from './Product';
import { CartProduct } from './CartProduct';

export type AppContext = {
  cart: CartProduct[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  isItemAdded: (productId: string) => boolean;
  updateQuantity: (id: string, newQuantity: number) => void;
  addToFavorites: (product: Phone) => void;
  removeFromFavorites: (productId: string) => void;
  itemCount: number;
};
