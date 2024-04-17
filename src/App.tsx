import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;
