import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/components/ThemeProvider';
import { Module } from '@/data/modules';
import { useAuthStore } from '@/store/auth-store';
import { Card } from '@/components/Card';

interface ModuleCardProps {
  module: Module;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  const router = useRouter();
  const { theme } = useTheme();
  const { user } = useAuthStore();
  
  const isCompleted = user?.completedModules.includes(module.id);
  
  const getLevelColor = () => {
    switch (module.level) {
      case 'beginner':
        return theme.colors.success;
      case 'intermediate':
        return theme.colors.warning;
      case 'advanced':
        return theme.colors.error;
      default:
        return theme.colors.info;
    }
  };
  
  const handlePress = () => {
    router.push(`/module/${module.id}`);
  };
  
  return (
    <TouchableOpacity 
      activeOpacity={0.7} 
      onPress={handlePress}
      style={styles.container}
    >
      <Card variant="elevated" style={styles.card}>
        <View style={styles.header}>
          <Text style={[styles.icon, { fontSize: 32 }]}>{module.icon}</Text>
          <View style={[styles.levelBadge, { backgroundColor: getLevelColor() }]}>
            <Text style={styles.levelText}>{module.level}</Text>
          </View>
        </View>
        
        <Text style={[styles.title, { color: theme.colors.text }]}>{module.title}</Text>
        
        <Text 
          style={[styles.description, { color: theme.colors.subtext }]} 
          numberOfLines={2}
        >
          {module.description}
        </Text>
        
        <View style={styles.footer}>
          <Text style={[styles.duration, { color: theme.colors.subtext }]}>
            {module.duration}
          </Text>
          
          {isCompleted && (
            <View style={[styles.completedBadge, { backgroundColor: theme.colors.success }]}>
              <Text style={styles.completedText}>Completed</Text>
            </View>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  card: {
    minHeight: 160,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    marginRight: 8,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  duration: {
    fontSize: 12,
  },
  completedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default ModuleCard;