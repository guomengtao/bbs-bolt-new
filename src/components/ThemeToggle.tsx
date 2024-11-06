import React from 'react';
import { useThemeStore } from '../store/themeStore';
import { ThemeMode } from '../types';

const themes: { label: string; value: ThemeMode }[] = [
  { label: '扁平模式', value: 'flat' },
  { label: '卡通模式', value: 'cartoon' },
  { label: '复古模式', value: 'retro' },
  { label: '清新模式', value: 'fresh' },
  { label: '极简模式', value: 'minimal' },
  { label: '黑暗模式', value: 'dark' },
  { label: '护眼模式', value: 'eyecare' },
  { label: '多彩模式', value: 'colorful' },
];

export const ThemeToggle: React.FC = () => {
  const { mode, setMode } = useThemeStore();

  return (
    <div className="flex flex-wrap gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow">
      {themes.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => setMode(value)}
          className={`px-3 py-1 rounded transition-all duration-200 ${
            mode === value
              ? 'bg-blue-500 text-white transform scale-105'
              : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};