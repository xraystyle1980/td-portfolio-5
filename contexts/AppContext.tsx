// contexts/AppContext.tsx

'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  loading: boolean;
  setLoading: (value: boolean) => void;
  scrollState: number;
  setScrollState: (value: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [scrollState, setScrollState] = useState(0);

  return (
    <AppContext.Provider value={{ loading, setLoading, scrollState, setScrollState }}>
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