export interface MiniProject {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  topics: string[];
  image: string;
}

export const miniProjects: MiniProject[] = [
  {
    id: 'todo-app',
    title: 'Todo App',
    description: 'Build a simple todo list application with add, delete, and complete functionality.',
    difficulty: 'beginner',
    estimatedTime: '2-3 hours',
    topics: ['useState', 'FlatList', 'TextInput', 'AsyncStorage'],
    image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'weather-app',
    title: 'Weather App',
    description: 'Create a weather application that fetches data from a weather API and displays current conditions.',
    difficulty: 'intermediate',
    estimatedTime: '3-4 hours',
    topics: ['API Fetching', 'Geolocation', 'AsyncStorage', 'Custom Hooks'],
    image: 'https://images.unsplash.com/photo-1530908295418-a12e326966ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'photo-gallery',
    title: 'Photo Gallery',
    description: 'Build a photo gallery app with image picker and grid layout.',
    difficulty: 'intermediate',
    estimatedTime: '3-4 hours',
    topics: ['Image Picker', 'FlatList', 'Grid Layout', 'Navigation'],
    image: 'https://images.unsplash.com/photo-1506241537529-eefea1fbe44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'chat-app',
    title: 'Chat App',
    description: 'Create a simple chat application with message input and display.',
    difficulty: 'advanced',
    estimatedTime: '5-6 hours',
    topics: ['Firebase', 'Authentication', 'Real-time Database', 'KeyboardAvoidingView'],
    image: 'https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'fitness-tracker',
    title: 'Fitness Tracker',
    description: 'Build a fitness tracking app with step counter and activity log.',
    difficulty: 'advanced',
    estimatedTime: '6-8 hours',
    topics: ['Sensors', 'Charts', 'AsyncStorage', 'Context API'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
];

export const getMiniProjectById = (id: string): MiniProject | undefined => {
  return miniProjects.find(project => project.id === id);
};