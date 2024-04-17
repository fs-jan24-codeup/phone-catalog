import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import './styles/styles.scss';
import App from './App.tsx';
import { PhonePages } from './pages/PhonesPage';
import { CartPage } from './pages/CartPage/CartPage.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<div>Home page</div>} />
          <Route path="phones" element={<PhonePages />}>
            <Route path=":phoneId?" element={<div>Phone details page</div>} />
          </Route>
          <Route path="tablets" element={<div>Tablets page</div>}>
            <Route path=":tabletId?" element={<div>Tablet details page</div>} />
          </Route>
          <Route path="accessories" element={<div>Accessories page</div>}>
            <Route
              path=":accessoryId?"
              element={<div>Accessory details page</div>}
            />
          </Route>
          <Route path="cart" element={<CartPage />} />
          <Route path="favourites" element={<div>Favourites page</div>} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
);
