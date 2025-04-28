import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Alert 
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useTheme } from '@/components/ThemeProvider';
import { useAuthStore } from '@/store/auth-store';
import { useProgressStore } from '@/store/progress-store';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { QuizQuestion } from '@/components/QuizQuestion';
import { quizzes } from '@/data/quizzes';

export default function QuizScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const { user, completeQuiz, addPoints } = useAuthStore();
  const { saveQuizScore } = useProgressStore();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResults, setShowResults] = useState(false);
  
  const quizId = Array.isArray(id) ? id[0] : id;
  const quiz = quizzes[quizId];
  
  const isCompleted = user?.completedQuizzes.includes(quizId);
  
  useEffect(() => {
    if (!quiz) {
      Alert.alert('Error', 'Quiz not found', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    }
  }, [quiz, router]);
  
  if (!quiz) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.errorText, { color: theme.colors.text }]}>
          Quiz not found
        </Text>
      </View>
    );
  }
  
  const handleAnswer = (isCorrect: boolean) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = isCorrect;
    setAnswers(newAnswers);
  };
  
  const handleNext = () => {
    if (answers[currentQuestionIndex] === undefined) {
      Alert.alert('Please answer the question before proceeding');
      return;
    }
    
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      
      // Scroll to top
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    } else {
      // Show results
      setShowResults(true);
      
      // Calculate score
      const correctAnswers = answers.filter(a => a).length;
      const totalQuestions = quiz.questions.length;
      const score = Math.round((correctAnswers / totalQuestions) * 100);
      
      // Save score
      saveQuizScore(quizId, score);
      
      // Complete quiz if not already completed
      if (!isCompleted) {
        completeQuiz(quizId);
        
        // Award points based on score
        const pointsEarned = Math.round(score / 2);
        addPoints(pointsEarned);
        
        Alert.alert(
          'Quiz Completed!',
          `You scored ${score}% and earned ${pointsEarned} points.`,
          [{ text: 'OK' }]
        );
      }
    }
  };
  
  const handleFinish = () => {
    router.replace('/(tabs)');
  };
  
  const calculateScore = () => {
    const correctAnswers = answers.filter(a => a).length;
    const totalQuestions = quiz.questions.length;
    return Math.round((correctAnswers / totalQuestions) * 100);
  };
  
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: quiz.title,
          headerTintColor: theme.colors.text,
          headerStyle: { backgroundColor: theme.colors.card },
        }} 
      />
      
      <ScrollView 
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        {!showResults ? (
          <>
            <Card variant="elevated" style={styles.quizInfo}>
              <Text style={[styles.quizTitle, { color: theme.colors.text }]}>
                {quiz.title}
              </Text>
              
              <Text style={[styles.quizDescription, { color: theme.colors.subtext }]}>
                {quiz.description}
              </Text>
              
              <View style={styles.progressInfo}>
                <Text style={[styles.progressText, { color: theme.colors.text }]}>
                  Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </Text>
              </View>
            </Card>
            
            <Card variant="default" style={styles.questionCard}>
              <QuizQuestion 
                question={quiz.questions[currentQuestionIndex]} 
                onAnswer={handleAnswer}
                showExplanation={answers[currentQuestionIndex] !== undefined}
              />
            </Card>
            
            <Button
              title={currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              onPress={handleNext}
              disabled={answers[currentQuestionIndex] === undefined}
              style={styles.nextButton}
            />
          </>
        ) : (
          <Card variant="elevated" style={styles.resultsCard}>
            <Text style={[styles.resultsTitle, { color: theme.colors.text }]}>
              Quiz Results
            </Text>
            
            <View style={styles.scoreContainer}>
              <View style={[
                styles.scoreCircle, 
                { 
                  borderColor: theme.colors.primary,
                  backgroundColor: theme.colors.primary + '20',
                }
              ]}>
                <Text style={[styles.scoreText, { color: theme.colors.primary }]}>
                  {calculateScore()}%
                </Text>
              </View>
            </View>
            
            <Text style={[styles.resultsSubtitle, { color: theme.colors.text }]}>
              {calculateScore() >= 80 
                ? 'Great job! You passed the quiz.' 
                : 'Keep practicing! You can retake the quiz later.'}
            </Text>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={[styles.statLabel, { color: theme.colors.subtext }]}>
                  Correct Answers
                </Text>
                <Text style={[styles.statValue, { color: theme.colors.success }]}>
                  {answers.filter(a => a).length}
                </Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={[styles.statLabel, { color: theme.colors.subtext }]}>
                  Incorrect Answers
                </Text>
                <Text style={[styles.statValue, { color: theme.colors.error }]}>
                  {answers.filter(a => !a).length}
                </Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={[styles.statLabel, { color: theme.colors.subtext }]}>
                  Total Questions
                </Text>
                <Text style={[styles.statValue, { color: theme.colors.text }]}>
                  {quiz.questions.length}
                </Text>
              </View>
            </View>
            
            <Button
              title="Return to Home"
              onPress={handleFinish}
              style={styles.finishButton}
            />
          </Card>
        )}
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
  quizInfo: {
    marginBottom: 24,
  },
  quizTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  quizDescription: {
    fontSize: 16,
    marginBottom: 16,
  },
  progressInfo: {
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
  },
  questionCard: {
    marginBottom: 24,
  },
  nextButton: {
    marginBottom: 24,
  },
  resultsCard: {
    padding: 24,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  resultsSubtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  finishButton: {
    marginTop: 16,
  },
});