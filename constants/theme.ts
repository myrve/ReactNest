import { colors } from './colors';

export type ThemeType = 'light' | 'dark';

export interface Theme {
  colors: typeof colors.light | typeof colors.dark;
  spacing: {
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    s: number;
    m: number;
    l: number;
    xl: number;
  };
  typography: {
    fontSizes: {
      xs: number;
      s: number;
      m: number;
      l: number;
      xl: number;
      xxl: number;
    };
    fontWeights: {
      regular: string;
      medium: string;
      semibold: string;
      bold: string;
    };
  };
}

export const createTheme = (type: ThemeType): Theme => ({
  colors: colors[type],
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    s: 4,
    m: 8,
    l: 12,
    xl: 24,
  },
  typography: {
    fontSizes: {
      xs: 12,
      s: 14,
      m: 16,
      l: 18,
      xl: 24,
      xxl: 32,
    },
    fontWeights: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
});