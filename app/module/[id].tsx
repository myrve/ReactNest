import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { useTheme } from '@/components/ThemeProvider';
import { useAuthStore } from '@/store/auth-store';
import { useProgressStore } from '@/store/progress-store';
import { Card } from '@/components/Card';
import { CodeBlock } from '@/components/CodeBlock';
import { Button } from '@/components/Button';
import { getModuleById } from '@/data/modules';
import { getModuleContent } from '@/data/module-content';
import { getQuizByModuleId } from '@/data/quizzes';

export default function ModuleDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const { user, completeModule, addPoints } = useAuthStore();
  const { setLastVisitedModule, updateModuleProgress } = useProgressStore();
  
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  
  const moduleId = Array.isArray(id) ? id[0] : id;
  const module = getModuleById(moduleId);
  const moduleContent = getModuleContent(moduleId);
  const quiz = getQuizByModuleId(moduleId);
  
  const isCompleted = user?.completedModules.includes(moduleId);
  
  useEffect(() => {
    if (moduleId) {
      setLastVisitedModule(moduleId);
    }
  }, [moduleId]);
  
  if (!module || !moduleContent) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.errorText, { color: theme.colors.text }]}>
          Module not found
        </Text>
      </View>
    );
  }
  
  const handleNextSection = () => {
    if (currentSectionIndex < moduleContent.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      
      // Update progress
      const progress = Math.round(
        ((currentSectionIndex + 1) / moduleContent.sections.length) * 100
      );
      updateModuleProgress(moduleId, progress);
      
      // Scroll to top
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    } else {
      // Complete module if not already completed
      if (!isCompleted) {
        completeModule(moduleId);
        addPoints(50); // Award points for completing the module
      }
      
      // Navigate to quiz if available
      if (quiz) {
        router.push(`/quiz/${quiz.id}`);
      }
    }
  };
  
  const currentSection = moduleContent.sections[currentSectionIndex];
  const isLastSection = currentSectionIndex === moduleContent.sections.length - 1;
  
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: module.title,
          headerTintColor: theme.colors.text,
          headerStyle: { backgroundColor: theme.colors.card },
        }} 
      />
      
      <ScrollView 
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        <Card variant="elevated" style={styles.moduleInfo}>
          <Text style={[styles.moduleTitle, { color: theme.colors.text }]}>
            {module.title}
          </Text>
          
          <Text style={[styles.moduleDescription, { color: theme.colors.subtext }]}>
            {module.description}
          </Text>
          
          <View style={styles.moduleDetails}>
            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, { color: theme.colors.subtext }]}>
                Duration
              </Text>
              <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                {module.duration}
              </Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, { color: theme.colors.subtext }]}>
                Level
              </Text>
              <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                {module.level}
              </Text>
            </View>
          </View>
        </Card>
        
        <View style={styles.sectionNavigation}>
          {moduleContent.sections.map((section, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.sectionDot,
                {
                  backgroundColor: index === currentSectionIndex 
                    ? theme.colors.primary 
                    : theme.colors.border,
                }
              ]}
              onPress={() => setCurrentSectionIndex(index)}
            />
          ))}
        </View>
        
        <Card variant="default" style={styles.sectionContent}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            {currentSection.title}
          </Text>
          
          <Text style={[styles.sectionText, { color: theme.colors.text }]}>
            {currentSection.content}
          </Text>
          
          {currentSection.codeExample && (
            <CodeBlock 
              code={currentSection.codeExample.code} 
              language={currentSection.codeExample.language} 
            />
          )}
        </Card>
        
        <Button
          title={isLastSection ? (quiz ? 'Take Quiz' : 'Complete Module') : 'Next Section'}
          onPress={handleNextSection}
          style={styles.nextButton}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 24,
  },
  moduleInfo: {
    marginBottom: 24,
  },
  moduleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  moduleDescription: {
    fontSize: 16,
    marginBottom: 16,
  },
  moduleDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  sectionNavigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  sectionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  sectionContent: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  nextButton: {
    marginBottom: 24,
  },
});