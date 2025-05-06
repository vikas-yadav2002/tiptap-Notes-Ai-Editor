'use client';

import { useEffect } from 'react';
import Sidebar from './Sidebar';
import NoteEditor from '../notes/NoteEditor';
import useNotesStore from '@/lib/store';
import { PanelRightOpen } from 'lucide-react';
import { Button } from '../ui/button';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useState } from 'react';

export default function NotesLayout() {
  const { notes, activeNoteId, createNote } = useNotesStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  
  // Create a note if there are none
  useEffect(() => {
    if (notes.length === 0) {
      createNote();
    }
  }, [notes.length, createNote]);
  
  // Auto-open sidebar on desktop, auto-close on mobile
  useEffect(() => {
    setSidebarOpen(isDesktop);
  }, [isDesktop]);

  const activeNote = notes.find((note) => note.id === activeNoteId);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div
        className={`fixed inset-y-0 z-20 flex flex-col bg-card shadow-lg transition-all duration-300 ${
          sidebarOpen ? 'left-0' : '-left-72'
        } lg:relative lg:shadow-none`}
        style={{ width: '18rem' }}
      >
        <Sidebar />
      </div>
      
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full flex-col">
          {!isDesktop && (
            <div className="flex items-center p-4 border-b">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                <PanelRightOpen className="h-5 w-5" />
              </Button>
            </div>
          )}
          
          <main className="flex-1 overflow-hidden relative">
            {activeNote ? (
              <NoteEditor note={activeNote} />
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">No note selected</p>
              </div>
            )}
          </main>
        </div>
      </div>
      
      {/* Overlay to close sidebar on mobile */}
      {sidebarOpen && !isDesktop && (
        <div 
          className="fixed inset-0 z-10 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}