import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useTheme } from '@/components/ThemeProvider';
import { MiniProject } from '@/data/mini-projects';

interface MiniProjectCardProps {
  project: MiniProject;
}

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 24; // Two cards per row with spacing

export const MiniProjectCard: React.FC<MiniProjectCardProps> = ({ project }) => {
  const router = useRouter();
  const { theme } = useTheme();
  
  const getDifficultyColor = () => {
    switch (project.difficulty) {
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
    router.push(`/project/${project.id}`);
  };
  
  return (
    <TouchableOpacity 
      activeOpacity={0.7} 
      onPress={handlePress}
      style={[styles.container, { width: cardWidth }]}
    >
      <View style={[
        styles.card, 
        { 
          backgroundColor: theme.colors.card,
          shadowColor: theme.colors.cardShadow,
        }
      ]}>
        <Image 
          source={{ uri: project.image }}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />
        
        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {project.title}
          </Text>
          
          <View style={[
            styles.difficultyBadge, 
            { backgroundColor: getDifficultyColor() }
          ]}>
            <Text style={styles.difficultyText}>{project.difficulty}</Text>
          </View>
          
          <Text 
            style={[styles.description, { color: theme.colors.subtext }]} 
            numberOfLines={2}
          >
            {project.description}
          </Text>
          
          <Text style={[styles.time, { color: theme.colors.subtext }]}>
            {project.estimatedTime}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  difficultyText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 12,
    marginBottom: 8,
  },
  time: {
    fontSize: 10,
    fontWeight: '500',
  },
});

export default MiniProjectCard;