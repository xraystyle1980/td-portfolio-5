// contexts/AppContext.tsx

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AppContextType {
  loading: boolean; // Tracks if the app is loading
  setLoading: (value: boolean) => void;
  scrollState: number; // Tracks the scroll progress
  setScrollState: (value: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true); // App loading state
  const [scrollState, setScrollState] = useState(0); // Scroll progress state

  useEffect(() => {
    // Simulate loading logic or replace with real initialization
    const simulateLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
      setLoading(false); // Mark loading as complete
    };

    simulateLoading();
  }, []);

  return (
    <AppContext.Provider value={{ loading, setLoading, scrollState, setScrollState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  console.log('useAppContext called');
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};