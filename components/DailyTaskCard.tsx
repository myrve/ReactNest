import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/components/ThemeProvider';
import { DailyTask } from '@/data/daily-tasks';
import { useAuthStore } from '@/store/auth-store';
import { Card } from '@/components/Card';

interface DailyTaskCardProps {
  task: DailyTask;
  onComplete: (taskId: string) => void;
}

export const DailyTaskCard: React.FC<DailyTaskCardProps> = ({ 
  task, 
  onComplete 
}) => {
  const { theme } = useTheme();
  const { user } = useAuthStore();
  
  const isCompleted = user?.dailyTasksCompleted.includes(task.id);
  
  const getTypeColor = () => {
    switch (task.type) {
      case 'learning':
        return theme.colors.info;
      case 'practice':
        return theme.colors.secondary;
      case 'challenge':
        return theme.colors.accent;
      default:
        return theme.colors.primary;
    }
  };
  
  const getDifficultyColor = () => {
    switch (task.difficulty) {
      case 'easy':
        return theme.colors.success;
      case 'medium':
        return theme.colors.warning;
      case 'hard':
        return theme.colors.error;
      default:
        return theme.colors.info;
    }
  };
  
  const handleComplete = () => {
    if (!isCompleted) {
      onComplete(task.id);
    }
  };
  
  return (
    <Card variant="elevated" style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.typeBadge, { backgroundColor: getTypeColor() }]}>
          <Text style={styles.typeText}>{task.type}</Text>
        </View>
        
        <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor() }]}>
          <Text style={styles.difficultyText}>{task.difficulty}</Text>
        </View>
      </View>
      
      <Text style={[styles.title, { color: theme.colors.text }]}>{task.title}</Text>
      
      <Text 
        style={[styles.description, { color: theme.colors.subtext }]}
      >
        {task.description}
      </Text>
      
      <View style={styles.footer}>
        <View style={styles.pointsContainer}>
          <Text style={[styles.pointsLabel, { color: theme.colors.subtext }]}>
            Points:
          </Text>
          <Text style={[styles.pointsValue, { color: theme.colors.primary }]}>
            {task.points}
          </Text>
        </View>
        
        <TouchableOpacity
          style={[
            styles.completeButton,
            {
              backgroundColor: isCompleted 
                ? theme.colors.success 
                : theme.colors.primary,
              opacity: isCompleted ? 0.7 : 1,
            }
          ]}
          onPress={handleComplete}
          disabled={isCompleted}
        >
          <Text style={styles.completeButtonText}>
            {isCompleted ? 'Completed' : 'Complete'}
          </Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  typeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
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
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsLabel: {
    fontSize: 14,
    marginRight: 4,
  },
  pointsValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  completeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  completeButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default DailyTaskCard;