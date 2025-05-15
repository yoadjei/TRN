import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { Button, Typography } from '@ui/index';
import { useApi } from '@utils/useApi';

type TwoFactorScreenProps = {
  navigation: any;
  route: any;
};

const TwoFactorScreen = ({ navigation, route }: TwoFactorScreenProps) => {
  const { colors } = useTheme();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const { post, loading } = useApi();
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    // Focus the first input when the component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next field if current field is filled
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Move to previous field on backspace if current field is empty
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      setError('Please enter the 6-digit code');
      return;
    }

    try {
      const response = await post('/auth/verify-2fa', { code: otpCode });
      
      if (response.success) {
        navigation.navigate('PinSetup');
      } else {
        setError(response.message || 'Verification failed. Please try again.');
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
      <View style={styles.content}>
        <Typography variant="heading" style={{ color: colors.text, marginBottom: 16 }}>
          Two-Factor Authentication
        </Typography>
        
        <Typography variant="body" style={{ color: colors.textSecondary, marginBottom: 32, textAlign: 'center' }}>
          Enter the 6-digit code from your authenticator app
        </Typography>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[
                styles.otpInput,
                {
                  borderColor: colors.border,
                  color: colors.text,
                  backgroundColor: colors.backgroundSecondary,
                },
              ]}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>

        {error ? (
          <Typography variant="caption" style={{ color: colors.error, marginVertical: 16, textAlign: 'center' }}>
            {error}
          </Typography>
        ) : null}

        <Button
          title="Verify"
          onPress={handleVerify}
          loading={loading}
          disabled={loading || otp.join('').length !== 6}
          style={styles.button}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 32,
  },
  otpInput: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
  },
});

export default TwoFactorScreen;
