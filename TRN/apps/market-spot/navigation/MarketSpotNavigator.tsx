import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SpotTradingScreen from '../screens/SpotTradingScreen';
import { useTheme } from '@theme/ThemeProvider';

const Stack = createNativeStackNavigator();

const MarketSpotNavigator = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="SpotTrading" component={SpotTradingScreen} />
    </Stack.Navigator>
  );
};

export default MarketSpotNavigator;
