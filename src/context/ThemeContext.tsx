import React, { useEffect } from 'react';
import { ThemeTypes } from '../types/ThemeTypes';

export const ThemeContext = React.createContext<ThemeTypes | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
};

export const ThemeContextProvider: React.FC<Props> = ({ children }) => {
  const themes = {
    dark: 'dark',
    light: 'light',
  };

  const getTheme = () => {
    const theme = `${window?.localStorage?.getItem('theme')}`;
    if (Object.values(themes).includes(theme)) {
      return theme;
    }
    const userMedia = window.matchMedia('(prefers-color-scheme: light)');
    if (userMedia.matches) {
      return themes.light;
    }

    return themes.dark;
  };
  const [theme, setTheme] = React.useState(getTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    // document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const contextValue = {
    theme,
    setTheme,
    themes,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
