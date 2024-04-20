import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// import 'normalize.css';
import './styles/styles.scss';
import App from './App.tsx';

import { CartPage } from './pages/CartPage/CartPage.tsx';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { NotFoundPage } from './pages/NotFoundPage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<div>Home page</div>} />
          <Route path="phones" element={<PhonesPage />}>
            <Route path=":phoneId?" element={<div>Phone details page</div>} />
          </Route>
          <Route path="tablets" element={<TabletsPage />}>
            <Route path=":tabletId?" element={<div>Tablet details page</div>} />
          </Route>
          <Route path="accessories" element={<AccessoriesPage />}>
            <Route
              path=":accessoryId?"
              element={<div>Accessory details page</div>}
            />
          </Route>
          <Route path="cart" element={<CartPage />} />
          <Route path="favourites" element={<div>Favourites page</div>} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
);
