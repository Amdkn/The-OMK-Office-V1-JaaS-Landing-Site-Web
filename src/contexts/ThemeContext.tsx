import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'glassmorphism' | 'warm-paper' | 'brutalism' | 'dark-oled' | 'claymorphism';

export interface ThemeOption {
  id: ThemeMode;
  name: string;
  description: string;
  previewBg: string;
  previewBorder: string;
  accentColor: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    description: 'Aéro moderne, verre dépoli & bleuté',
    previewBg: 'bg-slate-900/60 backdrop-blur-md',
    previewBorder: 'border-blue-500/40',
    accentColor: '#3b82f6',
  },
  {
    id: 'warm-paper',
    name: 'Warm Paper',
    description: 'Éditorial doux, sépia & ivoire',
    previewBg: 'bg-[#f7f4ed] text-stone-900',
    previewBorder: 'border-amber-700/30',
    accentColor: '#d97706',
  },
  {
    id: 'brutalism',
    name: 'Brutalism',
    description: 'Néo-brutaliste, contours noirs nets',
    previewBg: 'bg-yellow-100 text-black',
    previewBorder: 'border-black border-2',
    accentColor: '#000000',
  },
  {
    id: 'dark-oled',
    name: 'Dark OLED',
    description: 'Noir absolu #000 & contraste max',
    previewBg: 'bg-black text-white',
    previewBorder: 'border-white/20',
    accentColor: '#10b981',
  },
  {
    id: 'claymorphism',
    name: 'Claymorphism',
    description: 'Relief tactile 3D & ombres douces',
    previewBg: 'bg-slate-200 text-slate-800',
    previewBorder: 'border-white/60 shadow-inner',
    accentColor: '#8b5cf6',
  },
];

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isThemePanelOpen: boolean;
  setIsThemePanelOpen: (open: boolean) => void;
  isThemePinned: boolean;
  setIsThemePinned: (pinned: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const VALID_THEMES: ThemeMode[] = ['glassmorphism', 'warm-paper', 'brutalism', 'dark-oled', 'claymorphism'];

const getStoredTheme = (): ThemeMode => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('omk-theme') as ThemeMode;
      if (saved && VALID_THEMES.includes(saved)) {
        return saved;
      }
    } catch (e) {
      console.warn("Could not read theme from localStorage", e);
    }
  }
  return 'glassmorphism';
};

const getStoredPinned = (): boolean => {
  if (typeof window !== 'undefined') {
    try {
      return localStorage.getItem('omk-theme-pinned') === 'true';
    } catch {
      return false;
    }
  }
  return false;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(getStoredTheme);
  const [isThemePinned, setIsThemePinnedState] = useState<boolean>(getStoredPinned);
  const [isThemePanelOpen, setIsThemePanelOpen] = useState<boolean>(() => {
    // If it was pinned, stay open on load
    return getStoredPinned();
  });

  // Apply theme to DOM immediately on mount and sync
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('omk-theme', newTheme);
    } catch (e) {
      console.warn("Could not save theme to localStorage", e);
    }
    document.documentElement.setAttribute('data-theme', newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  const setIsThemePinned = (pinned: boolean) => {
    setIsThemePinnedState(pinned);
    try {
      localStorage.setItem('omk-theme-pinned', pinned ? 'true' : 'false');
    } catch (e) {
      console.warn("Could not save pinned state to localStorage", e);
    }
    if (pinned) {
      setIsThemePanelOpen(true);
    }
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      isThemePanelOpen, 
      setIsThemePanelOpen, 
      isThemePinned, 
      setIsThemePinned 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
