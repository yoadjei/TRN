import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { getColors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

type ThemeType = 'light' | 'dark';

type ThemeContextType = {
  theme: ThemeType;
  colors: ReturnType<typeof getColors>;
  spacing: typeof spacing;
  typography: typeof typography;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  colors: getColors('dark'),
  spacing,
  typography,
  toggleTheme: () => {},
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

type ThemeProviderProps = {
  children: ReactNode;
  initialTheme?: ThemeType;
};

export const ThemeProvider = ({ children, initialTheme }: ThemeProviderProps) => {
  const deviceTheme = useColorScheme() as ThemeType;
  const [theme, setTheme] = useState<ThemeType>(initialTheme || deviceTheme || 'dark');

  useEffect(() => {
    if (!initialTheme && deviceTheme) {
      setTheme(deviceTheme);
    }
  }, [deviceTheme, initialTheme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value = {
    theme,
    colors: getColors(theme),
    spacing,
    typography,
    toggleTheme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
