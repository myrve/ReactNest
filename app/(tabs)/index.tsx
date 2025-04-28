import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useTheme } from '@/components/ThemeProvider';
import { useAuthStore } from '@/store/auth-store';
import { useProgressStore } from '@/store/progress-store';
import { ProfileHeader } from '@/components/ProfileHeader';
import { DailyTaskCard } from '@/components/DailyTaskCard';
import { ModuleCard } from '@/components/ModuleCard';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { modules } from '@/data/modules';
import { DailyTask, generateDailyTasks } from '@/data/daily-tasks';

export default function HomeScreen() {
  const { theme } = useTheme();
  const { user, addPoints, completeDailyTask } = useAuthStore();
  const { updateDailyStreak, lastVisitedModule } = useProgressStore();
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>([]);
  
  useEffect(() => {
    // Update daily streak when app is opened
    updateDailyStreak();
    
    // Generate daily tasks
    setDailyTasks(generateDailyTasks());
  }, []);
  
  const handleCompleteTask = (taskId: string) => {
    const task = dailyTasks.find(t => t.id === taskId);
    if (task) {
      completeDailyTask(taskId);
      addPoints(task.points);
      
      Alert.alert(
        'Task Completed!',
        `You earned ${task.points} points.`,
        [{ text: 'OK' }]
      );
    }
  };
  
  // Get recommended modules based on user progress
  const getRecommendedModules = () => {
    if (!user) return [];
    
    // If user has completed modules, recommend the next one
    if (user.completedModules.length > 0) {
      const completedIds = new Set(user.completedModules);
      return modules
        .filter(module => !completedIds.has(module.id))
        .slice(0, 2);
    }
    
    // Otherwise, recommend beginner modules
    return modules
      .filter(module => module.level === 'beginner')
      .slice(0, 2);
  };
  
  // Get the last visited module or first module
  const getContinueLearningModule = () => {
    if (lastVisitedModule) {
      return modules.find(m => m.id === lastVisitedModule) || modules[0];
    }
    return modules[0];
  };
  
  const recommendedModules = getRecommendedModules();
  const continueModule = getContinueLearningModule();
  
  // Calculate overall progress
  const calculateOverallProgress = () => {
    if (!user) return 0;
    
    const totalModules = modules.length;
    const completedModules = user.completedModules.length;
    
    return (completedModules / totalModules) * 100;
  };
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <ProfileHeader />
      
      <Card variant="elevated" style={styles.progressCard}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Your Progress
        </Text>
        
        <View style={styles.progressContainer}>
          <ProgressBar 
            progress={calculateOverallProgress()} 
            height={8}
            showPercentage
          />
        </View>
        
        <Text style={[styles.progressText, { color: theme.colors.subtext }]}>
          {user?.completedModules.length || 0} of {modules.length} modules completed
        </Text>
      </Card>
      
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        Continue Learning
      </Text>
      
      <ModuleCard module={continueModule} />
      
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        Recommended For You
      </Text>
      
      {recommendedModules.map(module => (
        <ModuleCard key={module.id} module={module} />
      ))}
      
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        Daily Tasks
      </Text>
      
      {dailyTasks.map(task => (
        <DailyTaskCard 
          key={task.id} 
          task={task} 
          onComplete={handleCompleteTask} 
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  progressCard: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  progressContainer: {
    marginVertical: 12,
  },
  progressText: {
    fontSize: 14,
    textAlign: 'center',
  },
});