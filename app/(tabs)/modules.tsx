import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '@/components/ThemeProvider';
import { ModuleCard } from '@/components/ModuleCard';
import { modules } from '@/data/modules';

export default function ModulesScreen() {
  const { theme } = useTheme();
  
  const renderModuleItem = ({ item }) => (
    <ModuleCard module={item} />
  );
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={modules}
        renderItem={renderModuleItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.text }]}>
              Learning Modules
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.subtext }]}>
              Explore our comprehensive React Native curriculum
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
    padding: 16,
  },
  header: {
    marginBottom: 24,
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