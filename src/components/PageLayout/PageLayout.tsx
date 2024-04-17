import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer';
import { Header } from '../Header';
import './PageLayout.scss';

export const PageLayout = () => {
  return (
    <div className="grid_container">
      <div className="header_layout header_layout--lg ">
        <Header />
      </div>
      <main className="main_layout">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <div className="footer_layout footer_layout--lg ">
        <Footer />
      </div>
    </div>
  );
};
