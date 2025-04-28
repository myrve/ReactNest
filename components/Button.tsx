import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
  View
} from 'react-native';
import { useTheme } from '@/components/ThemeProvider';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
  ...props
}) => {
  const { theme } = useTheme();
  
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: theme.borderRadius.m,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };
    
    // Size styles
    switch (size) {
      case 'small':
        baseStyle.paddingVertical = theme.spacing.xs;
        baseStyle.paddingHorizontal = theme.spacing.m;
        break;
      case 'large':
        baseStyle.paddingVertical = theme.spacing.m;
        baseStyle.paddingHorizontal = theme.spacing.xl;
        break;
      default: // medium
        baseStyle.paddingVertical = theme.spacing.s;
        baseStyle.paddingHorizontal = theme.spacing.l;
    }
    
    // Variant styles
    switch (variant) {
      case 'secondary':
        baseStyle.backgroundColor = theme.colors.secondary;
        break;
      case 'outline':
        baseStyle.backgroundColor = 'transparent';
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = theme.colors.primary;
        break;
      case 'text':
        baseStyle.backgroundColor = 'transparent';
        break;
      default: // primary
        baseStyle.backgroundColor = theme.colors.primary;
    }
    
    // Disabled state
    if (disabled) {
      baseStyle.opacity = 0.5;
    }
    
    return baseStyle;
  };
  
  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontWeight: '600',
    };
    
    // Size styles
    switch (size) {
      case 'small':
        baseStyle.fontSize = theme.typography.fontSizes.s;
        break;
      case 'large':
        baseStyle.fontSize = theme.typography.fontSizes.l;
        break;
      default: // medium
        baseStyle.fontSize = theme.typography.fontSizes.m;
    }
    
    // Variant styles
    switch (variant) {
      case 'outline':
      case 'text':
        baseStyle.color = theme.colors.primary;
        break;
      default: // primary, secondary
        baseStyle.color = 'white';
    }
    
    return baseStyle;
  };
  
  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' || variant === 'text' ? theme.colors.primary : 'white'} 
        />
      ) : (
        <>
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
          {icon && <View style={{ marginLeft: 8 }}>{icon}</View>}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;