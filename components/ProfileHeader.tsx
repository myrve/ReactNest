import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/components/ThemeProvider';
import { useAuthStore } from '@/store/auth-store';
import { useProgressStore } from '@/store/progress-store';
import { ProgressBar } from '@/components/ProgressBar';

export const ProfileHeader: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuthStore();
  const { dailyStreak } = useProgressStore();
  
  if (!user) return null;
  
  // Calculate progress to next level
  const pointsToNextLevel = (user.level * 100);
  const progressToNextLevel = (user.points % 100);
  const progressPercentage = (progressToNextLevel / 100) * 100;
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.userInfo}>
        <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
          <Text style={styles.avatarText}>
            {user.name ? user.name.charAt(0).toUpperCase() : 'G'}
          </Text>
        </View>
        
        <View style={styles.details}>
          <Text style={[styles.name, { color: theme.colors.text }]}>
            {user.name || 'Guest User'}
          </Text>
          
          {user.email && (
            <Text style={[styles.email, { color: theme.colors.subtext }]}>
              {user.email}
            </Text>
          )}
        </View>
      </View>
      
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.primary }]}>
            {user.level}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.subtext }]}>
            Level
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.primary }]}>
            {user.points}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.subtext }]}>
            Points
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.primary }]}>
            {dailyStreak}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.subtext }]}>
            Streak
          </Text>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={[styles.progressTitle, { color: theme.colors.text }]}>
            Next Level
          </Text>
          <Text style={[styles.progressPoints, { color: theme.colors.subtext }]}>
            {progressToNextLevel}/{pointsToNextLevel} points
          </Text>
        </View>
        
        <ProgressBar 
          progress={progressPercentage} 
          height={8}
          showPercentage
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressPoints: {
    fontSize: 12,
  },
});

export default ProfileHeader;