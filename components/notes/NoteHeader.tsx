'use client';

import { Input } from '@/components/ui/input';
import useNotesStore from '@/lib/store';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

interface NoteHeaderProps {
  title: string;
  noteId: string;
}

export default function NoteHeader({ title, noteId }: NoteHeaderProps) {
  const { updateNote, notes } = useNotesStore();
  const [localTitle, setLocalTitle] = useState(title);
  
  const note = notes.find(note => note.id === noteId);
  const lastUpdated = note ? format(new Date(note.updatedAt), 'MMM d, yyyy h:mm a') : '';

  useEffect(() => {
    setLocalTitle(title);
  }, [title]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setLocalTitle(newTitle);
  };

  const handleTitleBlur = () => {
    if (localTitle !== title) {
      updateNote(noteId, { title: localTitle });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  return (
    <div className="px-6 py-4 border-b">
      <Input
        value={localTitle}
        onChange={handleTitleChange}
        onBlur={handleTitleBlur}
        onKeyDown={handleKeyDown}
        className="border-none bg-transparent p-0 text-xl font-semibold focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Untitled"
      />
      <p className="text-xs text-muted-foreground mt-1">
        Last updated: {lastUpdated}
      </p>
    </div>
  );
}