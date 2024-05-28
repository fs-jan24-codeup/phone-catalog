import React, { useState } from 'react';
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

export const App: React.FC = () => {
  const [showForm, setShowForm] = useState(true);
  const [showInitialForm, setShowInitialForm] = useState(false);
  const handleFormClose = () => {
    setShowInitialForm(false);
    setShowForm(false);
  };
  return (
    <ThemeContextProvider>
      <AppContextProvider>
        <AuthProvider>
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
        </AuthProvider>
      </AppContextProvider>
    </ThemeContextProvider>
  );
};

export default App;
