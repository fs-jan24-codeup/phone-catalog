/// <reference types="vite-plugin-svgr/client" />
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n.ts';

import './styles/styles.scss';
import App from './App.tsx';

import { CartPage } from './pages/CartPage/CartPage.tsx';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PhoneDetailsPage } from './pages/PhonesDetailsPage/PhoneDetailsPage.tsx';
import { FavouritesPage } from './pages/FavoritesPage/FavoritesPage.tsx';
import { HomePage } from './pages/HomePage/HomePage.tsx';
import { Contacts } from './pages/Contacts/Contacts.tsx';
import { RightsPage } from './pages/RightsPage.tsx/RightsPage.tsx';
import { Profile } from './pages/ProfilePage/Profile.tsx';
import { PrivateRoutes } from './components/PrivateRoutes.tsx';
// import InitialForm from './components/Forms/InitialForm/InitialForm.tsx';
// import { LoginForm } from './components/Forms/LogIn/LogIn.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="phones">
            <Route index element={<PhonesPage />} />
            <Route path=":productId?" element={<PhoneDetailsPage />} />
          </Route>

          <Route path="tablets">
            <Route index element={<TabletsPage />} />
            <Route path=":productId?" element={<PhoneDetailsPage />} />
          </Route>

          <Route path="accessories">
            <Route index element={<AccessoriesPage />} />
            <Route path=":productId?" element={<PhoneDetailsPage />} />
          </Route>
          <Route path="cart" element={<CartPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/favourites" element={<FavouritesPage />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/rights" element={<RightsPage />} />

          {/* <Route path="/login" element={<InitialForm />} /> */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
);
