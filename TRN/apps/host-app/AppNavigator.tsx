import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@theme/ThemeProvider';
import LazyLoader from './LazyLoader';
import { useApi } from '@utils/useApi';

// Import feather icons
import Icon from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Lazy-loaded micro frontends
const AuthNavigator = React.lazy(() => import('@auth/navigation/AuthNavigator'));
const DashboardNavigator = React.lazy(() => import('@dashboard/navigation/DashboardNavigator'));
const WalletNavigator = React.lazy(() => import('@wallet/navigation/WalletNavigator'));
const MarketSpotNavigator = React.lazy(() => import('@market-spot/navigation/MarketSpotNavigator'));
const NewsNavigator = React.lazy(() => import('@news/navigation/NewsNavigator'));
const SettingsNavigator = React.lazy(() => import('@settings/navigation/SettingsNavigator'));

const AppNavigator = () => {
  const { colors } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data: authData, loading } = useApi('/auth/status');

  useEffect(() => {
    if (authData && authData.authenticated) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [authData]);

  if (loading) {
    // You might want to add a loading screen here
    return null;
  }

  if (!isAuthenticated) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth">
          {() => (
            <LazyLoader>
              <AuthNavigator setAuthenticated={setIsAuthenticated} />
            </LazyLoader>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.backgroundSecondary,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
        }}
      >
        {() => (
          <LazyLoader>
            <DashboardNavigator />
          </LazyLoader>
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Markets"
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="bar-chart-2" size={size} color={color} />,
        }}
      >
        {() => (
          <LazyLoader>
            <MarketSpotNavigator />
          </LazyLoader>
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Wallet"
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="credit-card" size={size} color={color} />,
        }}
      >
        {() => (
          <LazyLoader>
            <WalletNavigator />
          </LazyLoader>
        )}
      </Tab.Screen>

      <Tab.Screen
        name="News"
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="rss" size={size} color={color} />,
        }}
      >
        {() => (
          <LazyLoader>
            <NewsNavigator />
          </LazyLoader>
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Settings"
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="settings" size={size} color={color} />,
        }}
      >
        {() => (
          <LazyLoader>
            <SettingsNavigator />
          </LazyLoader>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default AppNavigator;
