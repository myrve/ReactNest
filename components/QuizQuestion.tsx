import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/components/ThemeProvider';
import { QuizQuestion as QuizQuestionType } from '@/data/quizzes';

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (isCorrect: boolean) => void;
  showExplanation: boolean;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswer,
  showExplanation,
}) => {
  const { theme } = useTheme();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  const handleOptionPress = (index: number) => {
    if (selectedOption !== null) return; // Prevent changing answer
    
    setSelectedOption(index);
    onAnswer(index === question.correctOptionIndex);
  };
  
  const getOptionStyle = (index: number) => {
    if (selectedOption === null) {
      return {
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border,
      };
    }
    
    if (index === question.correctOptionIndex) {
      return {
        backgroundColor: theme.colors.success + '20', // 20% opacity
        borderColor: theme.colors.success,
      };
    }
    
    if (index === selectedOption && index !== question.correctOptionIndex) {
      return {
        backgroundColor: theme.colors.error + '20', // 20% opacity
        borderColor: theme.colors.error,
      };
    }
    
    return {
      backgroundColor: theme.colors.card,
      borderColor: theme.colors.border,
    };
  };
  
  return (
    <View style={styles.container}>
      <Text style={[styles.question, { color: theme.colors.text }]}>
        {question.question}
      </Text>
      
      <View style={styles.options}>
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              getOptionStyle(index),
            ]}
            onPress={() => handleOptionPress(index)}
            disabled={selectedOption !== null}
            activeOpacity={0.7}
          >
            <Text style={[styles.optionText, { color: theme.colors.text }]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {showExplanation && selectedOption !== null && (
        <View style={[
          styles.explanation, 
          { 
            backgroundColor: selectedOption === question.correctOptionIndex 
              ? theme.colors.success + '10' 
              : theme.colors.error + '10',
            borderColor: selectedOption === question.correctOptionIndex 
              ? theme.colors.success 
              : theme.colors.error,
          }
        ]}>
          <Text style={[styles.explanationText, { color: theme.colors.text }]}>
            {question.explanation}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  options: {
    gap: 12,
  },
  option: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  optionText: {
    fontSize: 16,
  },
  explanation: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  explanationText: {
    fontSize: 14,
  },
});

export default QuizQuestion;