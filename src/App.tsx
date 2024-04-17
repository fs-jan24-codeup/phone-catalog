import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer';
import { CartItem } from './components/CartItem/CartItem';

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <CartItem />
      <Footer />
    </>
  );
};

export default App;
