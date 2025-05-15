import React, { Suspense, ReactNode } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';

type LazyLoaderProps = {
  children: ReactNode;
};

const LazyLoader = ({ children }: LazyLoaderProps) => {
  const { colors } = useTheme();
  
  return (
    <Suspense
      fallback={
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      }
    >
      {children}
    </Suspense>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LazyLoader;
