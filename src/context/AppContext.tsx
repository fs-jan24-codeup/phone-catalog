import { createContext, useState } from 'react';
import { AppContext as AppContextType } from '../types/AppContext';
import { Phone } from '../types/Phone';
import { CartProduct } from '../types/CartProduct';

export const AppContext = createContext<AppContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const addToCart = (product: Phone) => {
    const { id, name, priceRegular, priceDiscount, images } = product;
    const smallerPrice = Math.min(priceRegular, priceDiscount);

    const newProduct: CartProduct = {
      id,
      name,
      price: smallerPrice,
      image: images[0],
    };

    setCart(prevCart => [...prevCart, newProduct]);
    setAddedIds(prevIds => [...prevIds, product.id]);
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    setAddedIds(prevIds => prevIds.filter(id => id !== productId));
  };

  const isItemAdded = (productId: string) => addedIds.includes(productId);

  const contextValue = {
    cart,
    setCart,
    addToCart,
    removeFromCart,
    isItemAdded,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
