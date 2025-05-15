import { TextStyle } from 'react-native';

type TypographyStyles = {
  largeHeading: TextStyle;
  heading: TextStyle;
  subheading: TextStyle;
  body: TextStyle;
  caption: TextStyle;
};

export const typography: TypographyStyles = {
  largeHeading: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 26,
  },
  subheading: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
};
