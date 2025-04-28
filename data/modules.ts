export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  hasQuiz: boolean;
}

export const modules: Module[] = [
  {
    id: 'getting-started',
    title: 'Getting Started with React Native',
    description: 'Learn the basics of React Native and set up your development environment.',
    icon: '🚀',
    duration: '30 min',
    level: 'beginner',
    topics: ['Introduction', 'Setup', 'Hello World'],
    hasQuiz: true,
  },
  {
    id: 'components',
    title: 'Core Components',
    description: 'Explore the fundamental building blocks of React Native apps.',
    icon: '🧩',
    duration: '45 min',
    level: 'beginner',
    topics: ['View', 'Text', 'Image', 'ScrollView', 'FlatList'],
    hasQuiz: true,
  },
  {
    id: 'styling',
    title: 'Styling & Layout',
    description: 'Master Flexbox and styling in React Native.',
    icon: '🎨',
    duration: '60 min',
    level: 'beginner',
    topics: ['StyleSheet', 'Flexbox', 'Dimensions', 'Responsive Design'],
    hasQuiz: true,
  },
  {
    id: 'navigation',
    title: 'Navigation',
    description: 'Implement navigation between screens in your app.',
    icon: '🧭',
    duration: '75 min',
    level: 'intermediate',
    topics: ['Stack Navigator', 'Tab Navigator', 'Drawer Navigator', 'Params'],
    hasQuiz: true,
  },
  {
    id: 'state-management',
    title: 'State Management',
    description: 'Learn different approaches to manage state in React Native.',
    icon: '⚙️',
    duration: '90 min',
    level: 'intermediate',
    topics: ['useState', 'useReducer', 'Context API', 'Redux', 'Zustand'],
    hasQuiz: true,
  },
  {
    id: 'networking',
    title: 'Networking & APIs',
    description: 'Connect your app to external services and APIs.',
    icon: '🌐',
    duration: '60 min',
    level: 'intermediate',
    topics: ['Fetch API', 'Axios', 'REST', 'GraphQL', 'Authentication'],
    hasQuiz: true,
  },
  {
    id: 'animations',
    title: 'Animations',
    description: 'Create smooth and engaging animations in your app.',
    icon: '✨',
    duration: '75 min',
    level: 'advanced',
    topics: ['Animated API', 'Reanimated', 'Gesture Handler', 'Transitions'],
    hasQuiz: true,
  },
  {
    id: 'native-modules',
    title: 'Native Modules',
    description: 'Extend your app with native functionality.',
    icon: '🔌',
    duration: '90 min',
    level: 'advanced',
    topics: ['Native Modules', 'Linking', 'Camera', 'Maps', 'Notifications'],
    hasQuiz: true,
  },
  {
    id: 'performance',
    title: 'Performance Optimization',
    description: 'Make your React Native app fast and efficient.',
    icon: '⚡',
    duration: '60 min',
    level: 'advanced',
    topics: ['Memoization', 'Lazy Loading', 'Hermes', 'Profiling'],
    hasQuiz: true,
  },
  {
    id: 'deployment',
    title: 'Deployment',
    description: 'Prepare and publish your app to app stores.',
    icon: '🚢',
    duration: '45 min',
    level: 'advanced',
    topics: ['App Icons', 'Splash Screen', 'App Store', 'Play Store', 'CI/CD'],
    hasQuiz: true,
  },
];

export const getModuleById = (id: string): Module | undefined => {
  return modules.find(module => module.id === id);
};