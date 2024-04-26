import { Product } from './Product';
import { CartProduct } from './CartProduct';
import { Dispatch, SetStateAction } from 'react';

export type AppContext = {
  cart: CartProduct[];
  favourites: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  isItemInCart: (productId: string) => boolean;
  updateQuantity: (id: string, newQuantity: number) => void;
  addToFavourites: (product: Product) => void;
  removeFromFavourites: (productId: string) => void;
  isItemInFavourites: (productId: string) => boolean;
  isSearchOpen: boolean;
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>
  itemCount: number;
  clearCart: () => void;
};
