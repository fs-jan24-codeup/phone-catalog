import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PageLayout } from './components/PageLayout';
import { AppContextProvider } from './context/AppContext';
import { ThemeContextProvider } from './context/ThemeContext';

export const App: React.FC = () => {
  return (
    <ThemeContextProvider >
      <AppContextProvider>
        <Header />
        {/* <PageLayout>
          <Outlet />
        </PageLayout>
        <Footer /> */}
      </AppContextProvider>
    </ThemeContextProvider>
  );
};

export default App;
