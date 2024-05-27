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
export const App: React.FC = () => {
  const [showForm, setShowForm] = useState(true);
  
  // useEffect(() => {
  //   checkAuth();
  // }, []);
  // const { isChecked, user, logout, checkAuth } = useContext(AuthContext);

  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
    <ThemeContextProvider>
      <AppContextProvider>
        <FormVisibilityProvider>
        {/* <AuthProvider> */}
        {showForm && (
          <div className="initial-block-container">
            <InitialForm onClose={handleFormClose} setShowForm={setShowForm}/>
          </div>
        )}
        <div className={showForm ? "dark-overlay" : ""}>
          <Header />
          <PageLayout>
            <Outlet />
          </PageLayout>
          <Footer />
            </div>
            {/* </AuthProvider> */}
        </FormVisibilityProvider>
      </AppContextProvider>
    </ThemeContextProvider>
  );
};

export default App;
