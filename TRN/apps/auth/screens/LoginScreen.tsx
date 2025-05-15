import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { Button, Input, Typography } from '@ui/index';
import { useApi } from '@utils/useApi';

type LoginScreenProps = {
  navigation: any;
};

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { post, loading } = useApi();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await post('/auth/login', { email, password });
      
      if (response.success) {
        navigation.navigate('TwoFactor');
      } else {
        setError(response.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.logoContainer}>
        <Typography variant="heading" style={{ color: colors.primary }}>
          OKX Clone
        </Typography>
      </View>

      <View style={styles.formContainer}>
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          style={styles.input}
        />

        {error ? (
          <Typography variant="caption" style={{ color: colors.error, marginBottom: 16 }}>
            {error}
          </Typography>
        ) : null}

        <Button
          title="Log In"
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
          style={styles.button}
        />

        <View style={styles.divider}>
          <Typography variant="caption" style={{ color: colors.textSecondary }}>
            Or
          </Typography>
        </View>

        <TouchableOpacity style={styles.registerLink}>
          <Typography variant="body" style={{ color: colors.primary }}>
            Create New Account
          </Typography>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 60,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    marginTop: 16,
  },
  button: {
    marginTop: 24,
  },
  divider: {
    alignItems: 'center',
    marginVertical: 24,
  },
  registerLink: {
    alignItems: 'center',
  },
});

export default LoginScreen;
