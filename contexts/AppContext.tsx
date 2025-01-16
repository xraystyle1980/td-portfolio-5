// contexts/AppContext.tsx

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AppContextType {
  loading: boolean;
  setLoading: (value: boolean) => void;
  scrollState: number;
  setScrollState: (value: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Start with loading false for SSR, then set to true on client
  const [loading, setLoading] = useState(false);
  const [scrollState, setScrollState] = useState(0);

  useEffect(() => {
    // Only set loading to true on client side
    setLoading(true);
    
    const simulateLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    simulateLoading();
  }, []);

  const value = {
    loading,
    setLoading,
    scrollState,
    setScrollState
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};