import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Image } from 'expo-image';
import { ExternalLink } from 'lucide-react-native';
import { useTheme } from '@/components/ThemeProvider';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { getMiniProjectById } from '@/data/mini-projects';

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();
  
  const projectId = Array.isArray(id) ? id[0] : id;
  const project = getMiniProjectById(projectId);
  
  if (!project) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.errorText, { color: theme.colors.text }]}>
          Project not found
        </Text>
      </View>
    );
  }
  
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
  
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: project.title,
          headerTintColor: theme.colors.text,
          headerStyle: { backgroundColor: theme.colors.card },
        }} 
      />
      
      <ScrollView 
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        <Image 
          source={{ uri: project.image }}
          style={styles.image}
          contentFit="cover"
        />
        
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {project.title}
          </Text>
          
          <View style={[
            styles.difficultyBadge, 
            { backgroundColor: getDifficultyColor() }
          ]}>
            <Text style={styles.difficultyText}>{project.difficulty}</Text>
          </View>
        </View>
        
        <Text style={[styles.description, { color: theme.colors.text }]}>
          {project.description}
        </Text>
        
        <Card variant="elevated" style={styles.infoCard}>
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: theme.colors.subtext }]}>
              Estimated Time
            </Text>
            <Text style={[styles.infoValue, { color: theme.colors.text }]}>
              {project.estimatedTime}
            </Text>
          </View>
          
          <View style={styles.topicsContainer}>
            <Text style={[styles.topicsLabel, { color: theme.colors.subtext }]}>
              Topics Covered
            </Text>
            <View style={styles.topicsList}>
              {project.topics.map((topic, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.topicBadge, 
                    { backgroundColor: theme.colors.primary + '20' }
                  ]}
                >
                  <Text style={[styles.topicText, { color: theme.colors.primary }]}>
                    {topic}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </Card>
        
        <Card variant="default" style={styles.instructionsCard}>
          <Text style={[styles.instructionsTitle, { color: theme.colors.text }]}>
            Project Instructions
          </Text>
          
          <Text style={[styles.instructionsText, { color: theme.colors.text }]}>
            This is a hands-on project to apply what you've learned. Follow these steps:
          </Text>
          
          <View style={styles.stepsList}>
            <View style={styles.step}>
              <View style={[styles.stepNumber, { backgroundColor: theme.colors.primary }]}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={[styles.stepText, { color: theme.colors.text }]}>
                Create a new React Native project using Expo
              </Text>
            </View>
            
            <View style={styles.step}>
              <View style={[styles.stepNumber, { backgroundColor: theme.colors.primary }]}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={[styles.stepText, { color: theme.colors.text }]}>
                Set up the necessary components and screens
              </Text>
            </View>
            
            <View style={styles.step}>
              <View style={[styles.stepNumber, { backgroundColor: theme.colors.primary }]}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={[styles.stepText, { color: theme.colors.text }]}>
                Implement the core functionality based on the project requirements
              </Text>
            </View>
            
            <View style={styles.step}>
              <View style={[styles.stepNumber, { backgroundColor: theme.colors.primary }]}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
              <Text style={[styles.stepText, { color: theme.colors.text }]}>
                Style your app to make it look professional
              </Text>
            </View>
            
            <View style={styles.step}>
              <View style={[styles.stepNumber, { backgroundColor: theme.colors.primary }]}>
                <Text style={styles.stepNumberText}>5</Text>
              </View>
              <Text style={[styles.stepText, { color: theme.colors.text }]}>
                Test your app and fix any bugs
              </Text>
            </View>
          </View>
        </Card>
        
        <Button
          title="Start Project"
          style={styles.startButton}
        />
        
        <TouchableOpacity style={styles.resourceLink}>
          <Text style={[styles.resourceLinkText, { color: theme.colors.primary }]}>
            View Sample Code
          </Text>
          <ExternalLink size={16} color={theme.colors.primary} />
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 24,
  },
  image: {
    width: '100%',
    height: 200,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  difficultyText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  infoCard: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  infoItem: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  topicsContainer: {
    marginBottom: 8,
  },
  topicsLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  topicsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  topicBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  topicText: {
    fontSize: 12,
    fontWeight: '500',
  },
  instructionsCard: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  instructionsText: {
    fontSize: 16,
    marginBottom: 16,
  },
  stepsList: {
    marginBottom: 8,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 16,
    flex: 1,
  },
  startButton: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  resourceLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  resourceLinkText: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
});