import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewsListScreen from '../screens/NewsListScreen';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import { useTheme } from '@theme/ThemeProvider';

const Stack = createNativeStackNavigator();

const NewsNavigator = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="NewsList" component={NewsListScreen} />
      <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
    </Stack.Navigator>
  );
};

export default NewsNavigator;
