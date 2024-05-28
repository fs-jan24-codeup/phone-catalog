import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FormVisibilityContextType {
  showInitialForm: boolean;
  setShowInitialForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormVisibilityContext = createContext<FormVisibilityContextType | undefined>(undefined);

export const useFormVisibility = () => {
  const context = useContext(FormVisibilityContext);
  if (!context) {
    throw new Error('useFormVisibility must be used within a FormVisibilityProvider');
  }
  return context;
};

export const FormVisibilityProvider: React.FC<FormVisibilityProviderProps> = ({ children }) => {
  const [showInitialForm, setShowInitialForm] = useState<boolean>(false);

  return (
    <FormVisibilityContext.Provider value={{ showInitialForm, setShowInitialForm }}>
      {children}
    </FormVisibilityContext.Provider>
  );
};

interface FormVisibilityProviderProps {
  children: ReactNode;
}
