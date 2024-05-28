import { createContext, useEffect, useState } from 'react';
import { AppContext as AppContextType } from '../types/AppContext';
import { Product } from '../types/Product';
import { CartProduct } from '../types/CartProduct';
import { useCartStorage } from '../hooks/useCartStorage';
import { privateRequest, privatePostRequest } from '../utils/fetchData';

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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { updateCart, removeCart, getCart } = useCartStorage();

  useEffect(() => {
    const itemFromLocalStorge = getCart(CART_STORAGE_KEY);
    const userData = localStorage.getItem('userData');

    if (userData) {
      const { id } = JSON.parse(userData);
      privateRequest(`/favourites?userId=${id}`).then((data: Product[]) => {
        setFavourites(data);
        setFavouritesIds(data.map((p) => p.id));
      }).catch(error => console.log(error));
    }

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
    removeCart(CART_STORAGE_KEY, productId);
  };

  const addToFavourites = (product: Product) => {
    setFavourites([...favourites, product]);
    setFavouritesIds([...favouritesIds, product.id]);

    updateCart(FAVOURITE_STORAGE_KEY, {
      [product.id]: { ...product },
    });

    const userData = localStorage.getItem('userData');
    if (userData) {
      const { id } = JSON.parse(userData);
      privatePostRequest(`/favourites/add?userId=${id}`, {
        "userId": `${id}`,
	      "productId": `${product.productId}`
      }).catch(error => console.log(error));
    }
  };
  
  const removeFromFavourites = (productId: string) => {
    console.log({ favourites });
    
    const productToDelete = favourites.find(item => item.id === productId);
    let productToDeleteId: string | undefined;

    if (productToDelete) {
      productToDeleteId = productToDelete.productId
    }
    
    
    setFavourites(favourites.filter(item => item.id !== productId));
    setFavouritesIds(favouritesIds.filter(id => id !== productId));
    removeCart(FAVOURITE_STORAGE_KEY, productId);

    const userData = localStorage.getItem('userData');

    if (userData && productToDeleteId) {
      const { id } = JSON.parse(userData);

      privatePostRequest(`/favourites/remove`, {
        "userId": `${id}`,
	      "productId": `${productToDeleteId}`
      }).catch(error => console.log(error));
    }
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

  const clearCart = () => {
    setCart([]);
    setAddedIds([]);
    localStorage.removeItem(CART_STORAGE_KEY);
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
    isSearchOpen,
    setIsSearchOpen,
    clearCart,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
