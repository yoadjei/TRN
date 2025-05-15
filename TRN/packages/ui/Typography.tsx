import React, { ReactNode } from 'react';
import { Text, StyleSheet, TextStyle, TextProps } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';

type TypographyVariant =
  | 'largeHeading'
  | 'heading'
  | 'subheading'
  | 'body'
  | 'caption';

type TypographyProps = TextProps & {
  children: ReactNode;
  variant: TypographyVariant;
  style?: TextStyle;
};

const Typography = ({ children, variant, style, ...props }: TypographyProps) => {
  const { typography, colors } = useTheme();

  const getStyleForVariant = (): TextStyle => {
    switch (variant) {
      case 'largeHeading':
        return typography.largeHeading;
      case 'heading':
        return typography.heading;
      case 'subheading':
        return typography.subheading;
      case 'body':
        return typography.body;
      case 'caption':
        return typography.caption;
      default:
        return typography.body;
    }
  };

  return (
    <Text
      style={[getStyleForVariant(), { color: colors.text }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default Typography;
