import { createContext, useContext, useState, ReactNode } from 'react';

interface InitialFormContextType {
    showForm: boolean;
    setShowForm: (show: boolean) => void;
    modalTriggered: boolean;
    setModalTriggered: (triggered: boolean) => void;
}   

const InitialFormContext = createContext<InitialFormContextType | null>(null);

export const useInitialForm = () => useContext(InitialFormContext);

export const InitialFormProvider = ({ children }: { children: ReactNode }) => {
    const [showForm, setShowForm] = useState(false);
    const [modalTriggered, setModalTriggered] = useState(false);
  
    return (
      <InitialFormContext.Provider value={{ showForm, setShowForm, modalTriggered, setModalTriggered }}>
        {children}
      </InitialFormContext.Provider>
    );
};