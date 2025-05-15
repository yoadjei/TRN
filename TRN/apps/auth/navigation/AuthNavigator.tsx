import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import TwoFactorScreen from '../screens/TwoFactorScreen';
import PinSetupScreen from '../screens/PinSetupScreen';
import { useTheme } from '@theme/ThemeProvider';

const Stack = createNativeStackNavigator();

type AuthNavigatorProps = {
  setAuthenticated: (value: boolean) => void;
};

const AuthNavigator = ({ setAuthenticated }: AuthNavigatorProps) => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="TwoFactor" component={TwoFactorScreen} />
      <Stack.Screen name="PinSetup">
        {(props) => <PinSetupScreen {...props} setAuthenticated={setAuthenticated} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthNavigator;
