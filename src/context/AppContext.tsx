import { createContext, useState } from 'react';
import { AppContext as AppContextType } from '../types/AppContext';
import { Phone } from '../types/Phone';

export const AppContext = createContext<AppContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useState<Phone[]>([]);

  const contextValue = {
    cart,
    setCart,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
