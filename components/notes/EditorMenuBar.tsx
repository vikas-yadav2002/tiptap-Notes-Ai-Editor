import { type Editor } from '@tiptap/react';
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Heading3 } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';

interface EditorMenuBarProps {
  editor: Editor;
}

export default function EditorMenuBar({ editor }: EditorMenuBarProps) {
  if (!editor) {
    return null;
  }

  const toggleHeading = (level: 1 | 2 | 3) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };

  const iconSize = 'h-4 w-4';

  return (
    <div className="border-b p-2 flex flex-wrap gap-1 items-center justify-center">
      <Toggle
        size="sm"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        aria-label="Bold"
      >
        <Bold className={iconSize} />
      </Toggle>
      
      <Toggle
        size="sm"
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        aria-label="Italic"
      >
        <Italic className={iconSize} />
      </Toggle>
      
      <div className="w-px h-6 bg-border mx-1" />
      
      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 1 })}
        onPressedChange={() => toggleHeading(1)}
        aria-label="Heading 1"
      >
        <Heading1 className={iconSize} />
      </Toggle>
      
      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 2 })}
        onPressedChange={() => toggleHeading(2)}
        aria-label="Heading 2"
      >
        <Heading2 className={iconSize} />
      </Toggle>
      
      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 3 })}
        onPressedChange={() => toggleHeading(3)}
        aria-label="Heading 3"
      >
        <Heading3 className={iconSize} />
      </Toggle>
      
      <div className="w-px h-6 bg-border mx-1" />
      
      <Toggle
        size="sm"
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        aria-label="Bullet List"
      >
        <List className={iconSize} />
      </Toggle>
      
      <Toggle
        size="sm"
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        aria-label="Ordered List"
      >
        <ListOrdered className={iconSize} />
      </Toggle>
    </div>
  );
}