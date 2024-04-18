import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PageLayout } from './components/PageLayout';
import { AppContextProvider } from './context/AppContext';

export const App: React.FC = () => {
  return (
    <AppContextProvider>
      <Header />
      <PageLayout>
        <Outlet />
      </PageLayout>
      <Footer />
    </AppContextProvider>
  );
};

export default App;
