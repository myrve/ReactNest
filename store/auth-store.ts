import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  email: string | null;
  name: string | null;
  isGuest: boolean;
  level: number;
  points: number;
  completedModules: string[];
  completedQuizzes: string[];
  dailyTasksCompleted: string[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginAsGuest: () => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  addPoints: (points: number) => void;
  completeModule: (moduleId: string) => void;
  completeQuiz: (quizId: string) => void;
  completeDailyTask: (taskId: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email, password) => {
        // In a real app, you would validate credentials with a backend
        // For this demo, we'll just create a user
        const newUser: User = {
          id: Date.now().toString(),
          email,
          name: email.split('@')[0],
          isGuest: false,
          level: 1,
          points: 0,
          completedModules: [],
          completedQuizzes: [],
          dailyTasksCompleted: [],
        };
        
        set({ user: newUser, isAuthenticated: true });
      },
      
      loginAsGuest: () => {
        const guestUser: User = {
          id: `guest-${Date.now()}`,
          email: null,
          name: "Guest User",
          isGuest: true,
          level: 1,
          points: 0,
          completedModules: [],
          completedQuizzes: [],
          dailyTasksCompleted: [],
        };
        
        set({ user: guestUser, isAuthenticated: true });
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
      
      addPoints: (points) => {
        set((state) => {
          if (!state.user) return state;
          
          const newPoints = state.user.points + points;
          const newLevel = Math.floor(newPoints / 100) + 1; // Simple level calculation
          
          return {
            user: {
              ...state.user,
              points: newPoints,
              level: newLevel,
            }
          };
        });
      },
      
      completeModule: (moduleId) => {
        set((state) => {
          if (!state.user) return state;
          
          const completedModules = [...state.user.completedModules];
          if (!completedModules.includes(moduleId)) {
            completedModules.push(moduleId);
          }
          
          return {
            user: {
              ...state.user,
              completedModules,
            }
          };
        });
      },
      
      completeQuiz: (quizId) => {
        set((state) => {
          if (!state.user) return state;
          
          const completedQuizzes = [...state.user.completedQuizzes];
          if (!completedQuizzes.includes(quizId)) {
            completedQuizzes.push(quizId);
          }
          
          return {
            user: {
              ...state.user,
              completedQuizzes,
            }
          };
        });
      },
      
      completeDailyTask: (taskId) => {
        set((state) => {
          if (!state.user) return state;
          
          const dailyTasksCompleted = [...state.user.dailyTasksCompleted];
          if (!dailyTasksCompleted.includes(taskId)) {
            dailyTasksCompleted.push(taskId);
          }
          
          return {
            user: {
              ...state.user,
              dailyTasksCompleted,
            }
          };
        });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);