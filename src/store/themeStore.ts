import { create } from 'zustand';
import { ThemeMode } from '../types';

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'minimal',
  setMode: (mode) => set({ mode }),
}));