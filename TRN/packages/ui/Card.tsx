import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';

type CardProps = {
  children: ReactNode;
  style?: ViewStyle;
  elevation?: number;
};

const Card = ({ children, style, elevation = 1 }: CardProps) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.backgroundSecondary,
          borderColor: colors.border,
          shadowOpacity: elevation * 0.05,
          shadowRadius: elevation,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderWidth: 0.5,
  },
});

export default Card;
