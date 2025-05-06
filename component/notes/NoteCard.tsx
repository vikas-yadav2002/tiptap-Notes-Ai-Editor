import { Note } from '@/lib/store';
import { formatDistanceToNow } from 'date-fns';
import { Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface NoteCardProps {
  note: Note;
  isActive: boolean;
  onClick: () => void;
  onDelete: (e: React.MouseEvent) => void;
}

export default function NoteCard({ note, isActive, onClick, onDelete }: NoteCardProps) {
  // Extract a preview from the note content
  // Strip HTML tags for the preview
  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };
  
  const contentPreview = note.content 
    ? stripHtml(note.content).slice(0, 80) + (stripHtml(note.content).length > 80 ? '...' : '')
    : 'Empty note';

  return (
    <div
      className={cn(
        'group flex flex-col rounded-lg p-3 text-sm transition-colors mb-2 cursor-pointer hover:bg-accent',
        isActive ? 'bg-accent' : 'bg-card'
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium line-clamp-1">{note.title}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
      <p className="line-clamp-2 text-xs text-muted-foreground mt-1">
        {contentPreview}
      </p>
      <span className="mt-2 text-xs text-muted-foreground">
        {formatDistanceToNow(note.updatedAt, { addSuffix: true })}
      </span>
    </div>
  );
}