import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProgressState {
  lastVisitedModule: string | null;
  moduleProgress: Record<string, number>; // moduleId -> progress percentage
  quizScores: Record<string, number>; // quizId -> score
  dailyStreak: number;
  lastActiveDate: string | null;
  
  setLastVisitedModule: (moduleId: string) => void;
  updateModuleProgress: (moduleId: string, progress: number) => void;
  saveQuizScore: (quizId: string, score: number) => void;
  updateDailyStreak: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      lastVisitedModule: null,
      moduleProgress: {},
      quizScores: {},
      dailyStreak: 0,
      lastActiveDate: null,
      
      setLastVisitedModule: (moduleId) => {
        set({ lastVisitedModule: moduleId });
      },
      
      updateModuleProgress: (moduleId, progress) => {
        set((state) => ({
          moduleProgress: {
            ...state.moduleProgress,
            [moduleId]: progress,
          }
        }));
      },
      
      saveQuizScore: (quizId, score) => {
        set((state) => ({
          quizScores: {
            ...state.quizScores,
            [quizId]: score,
          }
        }));
      },
      
      updateDailyStreak: () => {
        set((state) => {
          const today = new Date().toISOString().split('T')[0];
          
          if (!state.lastActiveDate) {
            return {
              dailyStreak: 1,
              lastActiveDate: today,
            };
          }
          
          const lastActive = new Date(state.lastActiveDate);
          const currentDate = new Date(today);
          
          // Calculate the difference in days
          const timeDiff = currentDate.getTime() - lastActive.getTime();
          const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
          
          if (dayDiff === 1) {
            // Consecutive day
            return {
              dailyStreak: state.dailyStreak + 1,
              lastActiveDate: today,
            };
          } else if (dayDiff === 0) {
            // Same day, no change to streak
            return { lastActiveDate: today };
          } else {
            // Streak broken
            return {
              dailyStreak: 1,
              lastActiveDate: today,
            };
          }
        });
      },
    }),
    {
      name: 'progress-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);