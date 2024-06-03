import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PageLayout } from './components/PageLayout';
import { AppContextProvider } from './context/AppContext';
import { ThemeContextProvider } from './context/ThemeContext';
import InitialForm from './components/Forms/InitialForm/InitialForm';
import { FormVisibilityProvider } from './context/FormContext';
import '../src/styles/App.scss';
import { AuthProvider } from './context/AuthContext';
import { LoadingPage } from './pages/LoadingPage/LoadingPage';
import { apiRequest } from './utils/fetchData';

export const App: React.FC = () => {
  const [showForm, setShowForm] = useState(true);
  const [showInitialForm, setShowInitialForm] = useState(false);
  const [showLoadingPage, setShowLoadingPage] = useState(true);
  const handleFormClose = () => {
    setShowInitialForm(false);
    setShowForm(false);
  };

  useEffect(() => {
    apiRequest('/products/phones?perPage=200').then(() =>
      setShowLoadingPage(false),
    );
  }, []);

  return (
    <>
      {showLoadingPage ? (
        <LoadingPage />
      ) : (
        <ThemeContextProvider>
          <AuthProvider>
            <AppContextProvider>
              <FormVisibilityProvider>
                {showInitialForm && showForm && (
                  <div className="initial-block-container">
                    <InitialForm
                      onClose={handleFormClose}
                      setShowForm={setShowForm}
                    />
                  </div>
                )}

                {showInitialForm && showForm ? (
                  <>
                    <div className="dark-overlay">
                      <Header setShowInitialForm={setShowInitialForm} />
                      <PageLayout>
                        <Outlet />
                      </PageLayout>
                    </div>
                    <div className="dark-overlay-footer">
                      <Footer />
                    </div>
                  </>
                ) : (
                  <>
                    <Header setShowInitialForm={setShowInitialForm} />
                    <PageLayout>
                      <Outlet />
                    </PageLayout>
                    <Footer />
                  </>
                )}
              </FormVisibilityProvider>
            </AppContextProvider>
          </AuthProvider>
        </ThemeContextProvider>
      )}
    </>
  );
};

export default App;
