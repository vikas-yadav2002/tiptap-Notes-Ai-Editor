'use client';

import { useEffect } from 'react';
import NotesLayout from '@/components/layout/NotesLayout';
import { ThemeProvider } from '@/components/providers/theme-provider';

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NotesLayout />
    </ThemeProvider>
  );
}