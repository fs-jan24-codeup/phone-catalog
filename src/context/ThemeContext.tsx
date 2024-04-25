import React, { useEffect } from 'react';
import { ThemeTypes } from '../types/ThemeTypes';

export const ThemeContext = React.createContext<ThemeTypes | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
};

enum Theme {
  dark = 'dark',
  light = 'light',
}

export const ThemeContextProvider: React.FC<Props> = ({ children }) => {
  const themes = {
    dark: 'dark',
    light: 'light',
  };

  const getTheme = (): Theme => {
    const theme = `${window?.localStorage?.getItem('theme')}`;
    if (Object.values(themes).includes(theme)) {
      return theme as Theme;
    }
    const userMedia = window.matchMedia('(prefers-color-scheme: light)');
    if (userMedia.matches) {
      return Theme.light;
    }

    return Theme.dark;
  };
  const [theme, setTheme] = React.useState<'light' | 'dark'>(getTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
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
