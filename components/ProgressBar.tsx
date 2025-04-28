import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/components/ThemeProvider';

interface ProgressBarProps {
  progress: number; // 0 to 100
  height?: number;
  showPercentage?: boolean;
  color?: string;
  backgroundColor?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  showPercentage = false,
  color,
  backgroundColor,
}) => {
  const { theme } = useTheme();
  
  // Ensure progress is between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.background, 
          { 
            height, 
            backgroundColor: backgroundColor || theme.colors.border,
          }
        ]}
      >
        <View 
          style={[
            styles.fill, 
            { 
              width: `${clampedProgress}%`,
              backgroundColor: color || theme.colors.primary,
              height,
            }
          ]}
        />
      </View>
      
      {showPercentage && (
        <Text style={[styles.percentage, { color: theme.colors.subtext }]}>
          {Math.round(clampedProgress)}%
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 4,
  },
  percentage: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: '500',
  },
});

export default ProgressBar;