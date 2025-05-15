import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import Typography from './Typography';
import Icon from 'react-native-vector-icons/Feather';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  style?: ViewStyle;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  secure?: boolean;
};

const Input = ({
  label,
  error,
  style,
  leftIcon,
  rightIcon,
  onRightIconPress,
  secure,
  secureTextEntry,
  ...props
}: InputProps) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isSecure = secure || secureTextEntry;

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Typography
          variant="caption"
          style={[styles.label, { color: error ? colors.error : colors.textSecondary }]}
        >
          {label}
        </Typography>
      )}
      
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? colors.error
              : isFocused
              ? colors.primary
              : colors.border,
            backgroundColor: colors.backgroundSecondary,
          },
        ]}
      >
        {leftIcon && (
          <Icon
            name={leftIcon}
            size={18}
            color={error ? colors.error : colors.textSecondary}
            style={styles.leftIcon}
          />
        )}
        
        <TextInput
          style={[
            styles.input,
            {
              color: colors.text,
            },
          ]}
          placeholderTextColor={colors.textSecondary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isSecure && !isPasswordVisible}
          {...props}
        />
        
        {isSecure ? (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.rightIcon}
          >
            <Icon
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={18}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        ) : rightIcon ? (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.rightIcon}
            disabled={!onRightIconPress}
          >
            <Icon
              name={rightIcon}
              size={18}
              color={error ? colors.error : colors.textSecondary}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      
      {error && (
        <Typography variant="caption" style={[styles.error, { color: colors.error }]}>
          {error}
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  leftIcon: {
    marginLeft: 12,
  },
  rightIcon: {
    padding: 12,
  },
  error: {
    marginTop: 4,
  },
});

export default Input;
