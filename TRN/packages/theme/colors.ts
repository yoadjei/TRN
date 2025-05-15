import { ThemeType } from './index';

type ColorPalette = {
  primary: string;
  primaryLight: string;
  success: string;
  error: string;
  warning: string;
  background: string;
  backgroundSecondary: string;
  backgroundHighlight: string;
  text: string;
  textSecondary: string;
  border: string;
  disabled: string;
  white: string;
};

const lightColors: ColorPalette = {
  primary: '#2252CC',
  primaryLight: '#E7EEFC',
  success: '#00A86B',
  error: '#E34935',
  warning: '#F18D13',
  background: '#F6F8FA',
  backgroundSecondary: '#FFFFFF',
  backgroundHighlight: '#F0F2F5',
  text: '#172B4D',
  textSecondary: '#6B778C',
  border: '#E0E4E8',
  disabled: '#97A0AF',
  white: '#FFFFFF',
};

const darkColors: ColorPalette = {
  primary: '#4C9AFF',
  primaryLight: '#172B4D',
  success: '#36B37E',
  error: '#FF5630',
  warning: '#FFC400',
  background: '#0D1117',
  backgroundSecondary: '#161B22',
  backgroundHighlight: '#21262D',
  text: '#E6EDF3',
  textSecondary: '#8B949E',
  border: '#30363D',
  disabled: '#6E7681',
  white: '#FFFFFF',
};

export const colors = {
  light: lightColors,
  dark: darkColors,
};

export const getColors = (theme: ThemeType): ColorPalette => {
  return colors[theme];
};
