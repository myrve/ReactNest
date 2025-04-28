export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export const quizzes: Record<string, Quiz> = {
  'getting-started-quiz': {
    id: 'getting-started-quiz',
    moduleId: 'getting-started',
    title: 'Getting Started Quiz',
    description: 'Test your knowledge of React Native basics',
    questions: [
      {
        id: 'q1',
        question: 'What is React Native?',
        options: [
          'A JavaScript framework for building native mobile apps',
          'A programming language for mobile development',
          'A database management system',
          'A design tool for mobile interfaces'
        ],
        correctOptionIndex: 0,
        explanation: 'React Native is a JavaScript framework that allows you to build native mobile applications using React.'
      },
      {
        id: 'q2',
        question: 'Which of the following is NOT a way to create a React Native project?',
        options: [
          'Using Expo CLI',
          'Using React Native CLI',
          'Using Create React App',
          'Using the React Native website'
        ],
        correctOptionIndex: 2,
        explanation: 'Create React App is used for web React applications, not React Native mobile apps.'
      },
      {
        id: 'q3',
        question: 'What is the entry point file for a React Native app?',
        options: [
          'index.js or App.js',
          'main.js',
          'start.js',
          'react-native.js'
        ],
        correctOptionIndex: 0,
        explanation: 'The entry point for a React Native app is typically index.js or App.js, depending on the project setup.'
      },
      {
        id: 'q4',
        question: 'Which command starts the development server in an Expo project?',
        options: [
          'expo start',
          'npm start',
          'react-native run',
          'All of the above'
        ],
        correctOptionIndex: 3,
        explanation: 'In an Expo project, you can use any of these commands to start the development server.'
      },
      {
        id: 'q5',
        question: 'What is the benefit of using Expo for React Native development?',
        options: [
          'It simplifies the setup process',
          'It provides access to many native APIs without writing native code',
          'It allows for easy testing on physical devices',
          'All of the above'
        ],
        correctOptionIndex: 3,
        explanation: 'Expo simplifies React Native development by providing an easy setup, access to native APIs, and simple device testing.'
      }
    ]
  },
  'components-quiz': {
    id: 'components-quiz',
    moduleId: 'components',
    title: 'Core Components Quiz',
    description: 'Test your knowledge of React Native core components',
    questions: [
      {
        id: 'q1',
        question: 'Which component is used as a container in React Native?',
        options: [
          'View',
          'Container',
          'Div',
          'Section'
        ],
        correctOptionIndex: 0,
        explanation: 'View is the fundamental component for building UI in React Native, similar to div in web development.'
      },
      {
        id: 'q2',
        question: 'Which component should be used to display text in React Native?',
        options: [
          'TextInput',
          'Label',
          'Text',
          'Paragraph'
        ],
        correctOptionIndex: 2,
        explanation: 'The Text component is used to display text in React Native applications.'
      },
      {
        id: 'q3',
        question: 'Which component is optimized for long lists in React Native?',
        options: [
          'ScrollView',
          'FlatList',
          'ListView',
          'LongList'
        ],
        correctOptionIndex: 1,
        explanation: 'FlatList is optimized for long lists as it implements lazy rendering of items.'
      },
      {
        id: 'q4',
        question: 'How do you include an image from a remote URL in React Native?',
        options: [
          '<Image source="https://example.com/image.jpg" />',
          '<Image src="https://example.com/image.jpg" />',
          '<Image uri="https://example.com/image.jpg" />',
          '<Image source={{ uri: "https://example.com/image.jpg" }} />'
        ],
        correctOptionIndex: 3,
        explanation: 'To include a remote image, you need to use the source prop with an object containing the uri.'
      },
      {
        id: 'q5',
        question: 'Which component would you use for user input in React Native?',
        options: [
          'Input',
          'TextInput',
          'TextField',
          'InputField'
        ],
        correctOptionIndex: 1,
        explanation: 'TextInput is the core component for user text input in React Native.'
      }
    ]
  },
  // Add more quizzes as needed
};

export const getQuizByModuleId = (moduleId: string): Quiz | undefined => {
  return Object.values(quizzes).find(quiz => quiz.moduleId === moduleId);
};