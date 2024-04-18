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

    console.log('newProduct :>> ', newProduct);

    setCart([...cart, newProduct]);
    setAddedIds([...addedIds, product.id]);
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
    setAddedIds(addedIds.filter(id => id !== productId));
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
