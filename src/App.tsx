import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PageLayout } from './components/PageLayout';

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <PageLayout>
        <Outlet />
      </PageLayout>
      
      <Footer />
    </>
  );
};

export default App;
