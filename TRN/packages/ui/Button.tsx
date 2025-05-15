import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { useTheme } from '@theme/ThemeProvider';
import Icon from 'react-native-vector-icons/Feather';

type ButtonProps = TouchableOpacityProps & {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  icon?: string;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const Button = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  icon,
  iconPosition = 'left',
  style,
  textStyle,
  ...props
}: ButtonProps) => {
  const { colors } = useTheme();

  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: disabled ? colors.disabled : colors.primary,
          borderColor: colors.primary,
          borderWidth: 1,
        };
      case 'secondary':
        return {
          backgroundColor: disabled ? colors.disabled : colors.primaryLight,
          borderColor: colors.primary,
          borderWidth: 1,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: disabled ? colors.disabled : colors.primary,
          borderWidth: 1,
        };
      case 'text':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
        };
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
        return colors.white;
      case 'secondary':
        return colors.primary;
      case 'outline':
        return disabled ? colors.disabled : colors.primary;
      case 'text':
        return disabled ? colors.disabled : colors.primary;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        disabled && { opacity: 0.7 },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <Icon
              name={icon}
              size={16}
              color={getTextColor()}
              style={styles.leftIcon}
            />
          )}
          <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
            {title}
          </Text>
          {icon && iconPosition === 'right' && (
            <Icon
              name={icon}
              size={16}
              color={getTextColor()}
              style={styles.rightIcon}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});

export default Button;
