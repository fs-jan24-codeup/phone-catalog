import { createContext, useEffect, useState } from 'react';
import { AppContext as AppContextType } from '../types/AppContext';
import { Product } from '../types/Product';
import { CartProduct } from '../types/CartProduct';
import { useCartStorage } from '../hooks/useCartStorage';

export const AppContext = createContext<AppContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const { updateCart, removeCart, getCart } = useCartStorage();

  useEffect(() => {
    const itemFromLocalStorge = getCart('cart');

    if (itemFromLocalStorge) {
      const cart = Object.values(itemFromLocalStorge).flat();
      const itemIds = Object.keys(itemFromLocalStorge);

      setCart(() => cart);
      setAddedIds(itemIds);
    }
  }, []);

  const addToCart = (product: Product) => {
    const { id, name, priceRegular, priceDiscount, images } = product;
    const smallerPrice = Math.min(priceRegular, priceDiscount);
    const newProduct: CartProduct = {
      id,
      name,
      price: smallerPrice,
      image: images[0],
      quantity: 1,
    };

    updateCart('cart', {
      [id]: { ...newProduct },
    });

    setCart([...cart, newProduct]);
    setAddedIds([...addedIds, product.id]);
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
    setAddedIds(addedIds.filter(id => id !== productId));
    removeCart('cart', productId);
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '{}');

    if (cartItems[id]) {
      cartItems[id].quantity = newQuantity;
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }

    const cartCopy = [...cart];

    const newCartItems = cartCopy.map(item => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCart(newCartItems);
  };

  const isItemAdded = (productId: string) => addedIds.includes(productId);
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const contextValue = {
    cart,
    addToCart,
    removeFromCart,
    isItemAdded,
    updateQuantity,
    itemCount,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
