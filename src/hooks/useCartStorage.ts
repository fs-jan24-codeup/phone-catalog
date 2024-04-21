import { CartProduct } from '../types/CartProduct';
import { Product } from '../types/Product';

type Cart = Record<string, CartProduct[]>;
type Products = Record<string, Product[]>;

export const useCartStorage = <T>(): {
  updateCart: (key: string, value: T) => void;
  removeCart: (key: string, id: string, removeAll?: boolean) => void;
  getCart: (key: string) => Cart | Products;
  addTempCard: (key: string, card: Product) => void;
} => {
  const addTempCard = (key: string, card: Product) => {
    localStorage.removeItem(key)

    const cardToStore = JSON.stringify(card);

    localStorage.setItem(key, cardToStore);

    return;
  }
  const updateCart = (key: string, value: T) => {
    const existItem = localStorage.getItem(key);

    if (existItem) {
      const prevItem = JSON.parse(existItem);

      const newValue = {
        ...prevItem,
        ...value,
      };

      const valueToStore = JSON.stringify(newValue);
      localStorage.setItem(key, valueToStore);

      return;
    }

    const valueToStore = JSON.stringify(value);
    localStorage.setItem(key, valueToStore);
  };

  const getCart = (key: string) => {
    const existItem = localStorage.getItem(key);

    if (existItem) {

      return JSON.parse(existItem);
    }

    return null;
  };

  const removeCart = (key: string, id: string, removeAll: boolean = false) => {
    const items = localStorage.getItem(key);

    if (removeAll) {
      localStorage.removeItem(key);

      return;
    }

    if (items) {
      const item = JSON.parse(items);

      const filterItems = Object.fromEntries(
        Object.entries(item).filter(([key, _]) => key !== id),
      );

      const itemToStore = JSON.stringify(filterItems);

      localStorage.setItem(key, itemToStore);

      return;
    }
  };

  return { updateCart, removeCart, getCart, addTempCard };
};
