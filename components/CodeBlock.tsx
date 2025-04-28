import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/components/ThemeProvider';

interface CodeBlockProps {
  code: string;
  language: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const { theme, themeType } = useTheme();
  
  const getBackgroundColor = () => {
    return themeType === 'dark' ? '#1E1E1E' : '#F5F5F5';
  };
  
  const getTextColor = () => {
    return themeType === 'dark' ? '#D4D4D4' : '#333333';
  };
  
  const getKeywordColor = () => {
    return themeType === 'dark' ? '#569CD6' : '#0000FF';
  };
  
  const getStringColor = () => {
    return themeType === 'dark' ? '#CE9178' : '#A31515';
  };
  
  const getCommentColor = () => {
    return themeType === 'dark' ? '#6A9955' : '#008000';
  };
  
  // Very simple syntax highlighting
  const highlightSyntax = (code: string, language: string) => {
    if (language === 'jsx' || language === 'javascript' || language === 'js') {
      // This is a very simplified version of syntax highlighting
      // In a real app, you'd want to use a proper syntax highlighting library
      const keywords = ['import', 'export', 'from', 'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'extends', 'new', 'this', 'super', 'async', 'await', 'try', 'catch', 'default'];
      
      const lines = code.split('\n');
      
      return lines.map((line, index) => {
        // Handle comments
        if (line.trim().startsWith('//')) {
          return (
            <Text key={index} style={{ color: getCommentColor() }}>
              {line}
            </Text>
          );
        }
        
        // Very basic highlighting for keywords, strings, etc.
        let highlightedLine = line;
        let parts = [];
        
        // Check for strings
        const stringRegex = /(["'`])(?:(?=(\\?))\2.)*?\1/g;
        let stringMatch;
        let lastIndex = 0;
        
        while ((stringMatch = stringRegex.exec(line)) !== null) {
          // Add text before the string
          if (stringMatch.index > lastIndex) {
            const beforeText = line.substring(lastIndex, stringMatch.index);
            parts.push(
              <Text key={`${index}-${lastIndex}`} style={{ color: getTextColor() }}>
                {beforeText}
              </Text>
            );
          }
          
          // Add the string
          parts.push(
            <Text key={`${index}-${stringMatch.index}`} style={{ color: getStringColor() }}>
              {stringMatch[0]}
            </Text>
          );
          
          lastIndex = stringMatch.index + stringMatch[0].length;
        }
        
        // Add remaining text
        if (lastIndex < line.length) {
          const remainingText = line.substring(lastIndex);
          
          // Highlight keywords
          const words = remainingText.split(/(\s+|[.,;:(){}[\]<>])/);
          const highlightedWords = words.map((word, wordIndex) => {
            if (keywords.includes(word)) {
              return (
                <Text key={wordIndex} style={{ color: getKeywordColor() }}>
                  {word}
                </Text>
              );
            }
            return (
              <Text key={wordIndex} style={{ color: getTextColor() }}>
                {word}
              </Text>
            );
          });
          
          parts.push(...highlightedWords);
        }
        
        return (
          <Text key={index}>
            {parts.length > 0 ? parts : <Text style={{ color: getTextColor() }}>{line}</Text>}
            {'\n'}
          </Text>
        );
      });
    }
    
    // For other languages or fallback
    return <Text style={{ color: getTextColor() }}>{code}</Text>;
  };
  
  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <View style={styles.header}>
        <Text style={[styles.language, { color: theme.colors.subtext }]}>
          {language}
        </Text>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.codeScrollView}
      >
        <ScrollView 
          style={styles.codeContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.code}>
            {highlightSyntax(code, language)}
          </Text>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginVertical: 16,
    overflow: 'hidden',
  },
  header: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  language: {
    fontSize: 12,
    fontWeight: '500',
  },
  codeScrollView: {
    maxHeight: 300,
  },
  codeContainer: {
    padding: 16,
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 14,
  },
});

export default CodeBlock;