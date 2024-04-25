import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  return context;
};
