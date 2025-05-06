'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import useNotesStore, { Note } from '@/lib/store';
import { formatDistanceToNow } from 'date-fns';
import { Moon, Plus, Sun, Trash2 } from 'lucide-react';
import NoteCard from '../notes/NoteCard';
import { useTheme } from 'next-themes';

export default function Sidebar() {
  const { notes, activeNoteId, createNote, deleteNote, setActiveNote } = useNotesStore();
  const { theme, setTheme } = useTheme();

  const handleNoteClick = (noteId: string) => {
    setActiveNote(noteId);
  };

  const handleDeleteNote = (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation();
    deleteNote(noteId);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex h-full w-72 flex-col border-r">
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-semibold">Notes</h1>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleTheme}
            className="h-8 w-8"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button size="sm" onClick={createNote}>
            <Plus className="h-4 w-4 mr-1" />
            New
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {notes.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-muted-foreground">No notes yet</p>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={createNote}
              >
                Create your first note
              </Button>
            </div>
          ) : (
            notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                isActive={note.id === activeNoteId}
                onClick={() => handleNoteClick(note.id)}
                onDelete={(e) => handleDeleteNote(e, note.id)}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}