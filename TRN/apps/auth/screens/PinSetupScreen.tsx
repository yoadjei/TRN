import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import { Button, Typography } from '@ui/index';
import Icon from 'react-native-vector-icons/Feather';
import { useApi } from '@utils/useApi';

type PinSetupScreenProps = {
  navigation: any;
  route: any;
  setAuthenticated: (value: boolean) => void;
};

const PinSetupScreen = ({ setAuthenticated }: PinSetupScreenProps) => {
  const { colors } = useTheme();
  const [pin, setPin] = useState<string[]>([]);
  const [confirmPin, setConfirmPin] = useState<string[]>([]);
  const [stage, setStage] = useState<'create' | 'confirm'>('create');
  const [error, setError] = useState('');
  const { post, loading } = useApi();

  const handleNumberPress = (number: number) => {
    if (stage === 'create' && pin.length < 6) {
      setPin([...pin, number.toString()]);
    } else if (stage === 'confirm' && confirmPin.length < 6) {
      setConfirmPin([...confirmPin, number.toString()]);
    }
  };

  const handleDelete = () => {
    if (stage === 'create' && pin.length > 0) {
      setPin(pin.slice(0, -1));
    } else if (stage === 'confirm' && confirmPin.length > 0) {
      setConfirmPin(confirmPin.slice(0, -1));
    }
  };

  React.useEffect(() => {
    if (pin.length === 6 && stage === 'create') {
      setStage('confirm');
    } else if (confirmPin.length === 6 && stage === 'confirm') {
      verifyPin();
    }
  }, [pin, confirmPin]);

  const verifyPin = async () => {
    const pinStr = pin.join('');
    const confirmPinStr = confirmPin.join('');

    if (pinStr !== confirmPinStr) {
      setError('PINs do not match. Please try again.');
      setStage('create');
      setPin([]);
      setConfirmPin([]);
      return;
    }

    try {
      const response = await post('/auth/set-pin', { pin: pinStr });
      
      if (response.success) {
        setAuthenticated(true);
      } else {
        setError(response.message || 'Failed to set PIN. Please try again.');
        setStage('create');
        setPin([]);
        setConfirmPin([]);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setStage('create');
      setPin([]);
      setConfirmPin([]);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Typography variant="heading" style={{ color: colors.text, marginBottom: 8 }}>
          {stage === 'create' ? 'Create PIN' : 'Confirm PIN'}
        </Typography>
        
        <Typography variant="body" style={{ color: colors.textSecondary, marginBottom: 40, textAlign: 'center' }}>
          {stage === 'create'
            ? 'Set a 6-digit PIN for quick access to your account'
            : 'Enter the PIN again to confirm'}
        </Typography>

        <View style={styles.dotsContainer}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      (stage === 'create' && index < pin.length) ||
                      (stage === 'confirm' && index < confirmPin.length)
                        ? colors.primary
                        : 'transparent',
                    borderColor: colors.border,
                  },
                ]}
              />
            ))}
        </View>

        {error ? (
          <Typography variant="caption" style={{ color: colors.error, marginVertical: 16, textAlign: 'center' }}>
            {error}
          </Typography>
        ) : null}

        <View style={styles.keypadContainer}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
            <TouchableOpacity
              key={number}
              style={[styles.keypadButton, { borderColor: colors.border }]}
              onPress={() => handleNumberPress(number)}
            >
              <Typography variant="heading" style={{ color: colors.text }}>
                {number}
              </Typography>
            </TouchableOpacity>
          ))}
          
          <View style={styles.keypadButton} />
          
          <TouchableOpacity
            style={[styles.keypadButton, { borderColor: colors.border }]}
            onPress={() => handleNumberPress(0)}
          >
            <Typography variant="heading" style={{ color: colors.text }}>
              0
            </Typography>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.keypadButton, { borderColor: colors.border }]}
            onPress={handleDelete}
          >
            <Icon name="delete" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 60,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginHorizontal: 8,
  },
  keypadContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '80%',
  },
  keypadButton: {
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 8,
    margin: '1.5%',
  },
});

export default PinSetupScreen;
