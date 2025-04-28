export interface DailyTask {
  id: string;
  title: string;
  description: string;
  points: number;
  type: 'learning' | 'practice' | 'challenge';
  difficulty: 'easy' | 'medium' | 'hard';
}

export const generateDailyTasks = (): DailyTask[] => {
  // In a real app, you might want to randomize these or fetch from a server
  return [
    {
      id: `task-${Date.now()}-1`,
      title: 'Complete a Module',
      description: 'Finish studying one complete module today',
      points: 50,
      type: 'learning',
      difficulty: 'medium',
    },
    {
      id: `task-${Date.now()}-2`,
      title: 'Take a Quiz',
      description: 'Complete at least one quiz with a score of 80% or higher',
      points: 30,
      type: 'learning',
      difficulty: 'easy',
    },
    {
      id: `task-${Date.now()}-3`,
      title: 'Code Challenge',
      description: 'Create a simple counter component using useState',
      points: 40,
      type: 'practice',
      difficulty: 'easy',
    },
    {
      id: `task-${Date.now()}-4`,
      title: 'Advanced Challenge',
      description: 'Implement a custom hook for form validation',
      points: 70,
      type: 'challenge',
      difficulty: 'hard',
    },
    {
      id: `task-${Date.now()}-5`,
      title: 'Review Concepts',
      description: 'Review your notes from a previous module',
      points: 20,
      type: 'learning',
      difficulty: 'easy',
    },
  ];
};

// Function to get a new set of daily tasks - fixed to use AsyncStorage instead of localStorage
export const getDailyTasks = async (): Promise<DailyTask[]> => {
  // For simplicity, we'll just return the generated tasks
  // In a real app, you would implement proper storage with AsyncStorage
  return generateDailyTasks();
};