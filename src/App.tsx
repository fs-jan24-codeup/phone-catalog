import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PageLayout } from './components/PageLayout';
import { CartItem } from './components/CartItem';

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <PageLayout>
        <Outlet />
        <CartItem />
      </PageLayout>
      
      <Footer />
    </>
  );
};

export default App;
