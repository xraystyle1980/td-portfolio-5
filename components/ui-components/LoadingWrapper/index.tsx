'use client';

import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import Loading from '@/components/ui-components/Loading';

interface LoadingWrapperProps {
  children: React.ReactNode;
}

export default function LoadingWrapper({ children }: LoadingWrapperProps) {
  const { loading } = useAppContext();

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
} 