import { createContext, useEffect, useState } from 'react';
import { AppContext as AppContextType } from '../types/AppContext';
import { Product } from '../types/Product';
import { CartProduct } from '../types/CartProduct';
import { useCartStorage } from '../hooks/useCartStorage';

const CART_STORAGE_KEY = 'cart';
const FAVOURITE_STORAGE_KEY = 'favourite';

export const AppContext = createContext<AppContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [favourites, setFavourites] = useState<Product[]>([]);
  const [favouritesIds, setFavouritesIds] = useState<string[]>([]);
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const { updateCart, removeCart, getCart } = useCartStorage();

  useEffect(() => {
    const itemFromLocalStorge = getCart(CART_STORAGE_KEY);
    const favouriteItems = getCart(FAVOURITE_STORAGE_KEY);

    if (itemFromLocalStorge) {
      const cart = Object.values(itemFromLocalStorge).flat();
      const itemIds = Object.keys(itemFromLocalStorge);

      setCart(() => cart);
      setAddedIds(itemIds);
    }

    if (favouriteItems) {
      setFavourites(Object.values(favouriteItems).flat());
      setFavouritesIds(Object.keys(favouriteItems));
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
    removeCart(CART_STORAGE_KEY, productId);
  };

  const addToFavourites = (product: Product) => {
    setFavourites([...favourites, product]);
    setFavouritesIds([...favouritesIds, product.id]);

    updateCart(FAVOURITE_STORAGE_KEY, {
      [product.id]: { ...product },
    });
  };

  const removeFromFavourites = (productId: string) => {
    setFavourites(favourites.filter(item => item.id !== productId));
    setFavouritesIds(favouritesIds.filter(id => id !== productId));
    removeCart(FAVOURITE_STORAGE_KEY, productId);
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    const cartItems = JSON.parse(
      localStorage.getItem(CART_STORAGE_KEY) || '{}',
    );

    if (cartItems[id]) {
      cartItems[id].quantity = newQuantity;
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
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

  const isItemInCart = (productId: string) => addedIds.includes(productId);
  const isItemInFavourites = (productId: string) =>
    favouritesIds.includes(productId);
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const contextValue = {
    cart,
    favourites,
    addToCart,
    removeFromCart,
    isItemInCart,
    updateQuantity,
    addToFavourites,
    removeFromFavourites,
    isItemInFavourites,
    itemCount,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
