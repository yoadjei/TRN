import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import AppProvider from './AppProvider';
import { ThemeProvider } from '@theme/ThemeProvider';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <AppProvider>
      <ThemeProvider initialTheme={isDarkMode ? 'dark' : 'light'}>
        <NavigationContainer>
          <SafeAreaView style={styles.container}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <AppNavigator />
          </SafeAreaView>
        </NavigationContainer>
      </ThemeProvider>
    </AppProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
