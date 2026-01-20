'use client';

import { createContext, useContext, ReactNode } from 'react';
import Toaster, { useToaster } from '@/components/Toaster';
import type { ToasterContextType } from '@/types';

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

export function ToasterProvider({ children }: { children: ReactNode }) {
  const { toasts, addToast, removeToast } = useToaster();

  return (
    <ToasterContext.Provider value={{ addToast, removeToast }}>
      {children}
      <Toaster toasts={toasts} onRemove={removeToast} />
    </ToasterContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error('useToast must be used within ToasterProvider');
  }
  return context;
}
