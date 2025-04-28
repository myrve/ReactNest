import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '@/components/ThemeProvider';
import { MiniProjectCard } from '@/components/MiniProjectCard';
import { miniProjects } from '@/data/mini-projects';

export default function ProjectsScreen() {
  const { theme } = useTheme();
  
  const renderProjectItem = ({ item }) => (
    <MiniProjectCard project={item} />
  );
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={miniProjects}
        renderItem={renderProjectItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.text }]}>
              Mini Projects
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.subtext }]}>
              Apply your knowledge with these hands-on projects
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 8,
  },
  header: {
    padding: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
});