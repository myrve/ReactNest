import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { useThemeStore } from '@/store/theme-store';
import { createTheme, Theme, ThemeType } from '@/constants/theme';

interface ThemeContextType {
  theme: Theme;
  themeType: ThemeType;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme() as ThemeType || 'light';
  const { theme: storedTheme, setTheme, toggleTheme } = useThemeStore();
  
  // Use the stored theme, or fall back to system preference
  const themeType = storedTheme || colorScheme;
  const theme = createTheme(themeType);
  
  const value = {
    theme,
    themeType,
    toggleTheme,
    setTheme,
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};