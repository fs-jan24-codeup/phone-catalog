import { useState } from 'react';
import { CartProduct } from '../types/CartProduct';

export const useConfirmedOrders = () => {
  const [confirmedOrders, setConfirmedOrders] = useState<CartProduct[]>([]);

  const addConfirmedOrder = (order: CartProduct) => {
    setConfirmedOrders(prevOrders => [...prevOrders, order]);
  };

  return { confirmedOrders, addConfirmedOrder };
};
