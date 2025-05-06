'use client';

import { Note } from '@/lib/store';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Placeholder from '@tiptap/extension-placeholder';
import useNotesStore from '@/lib/store';
import { useCallback, useEffect, useRef } from 'react';
import EditorMenuBar from './EditorMenuBar';
import AIChatButton from '../ai/AIChatButton';
import AIChatInterface from '../ai/AIChatInterface';
import NoteHeader from './NoteHeader';

interface NoteEditorProps {
  note: Note;
}

export default function NoteEditor({ note }: NoteEditorProps) {
  const { updateNote, isChatOpen } = useNotesStore();
  const editorRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      BulletList,
      OrderedList,
      ListItem,
      Placeholder.configure({
        placeholder: 'Start writing...',
      }),
    ],
    content: note.content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      updateNote(note.id, { content: html });
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base max-w-none focus:outline-none',
      },
    },
    autofocus: 'end',
  });

  useEffect(() => {
    if (editor && note.content !== editor.getHTML()) {
      editor.commands.setContent(note.content);
    }
  }, [note.id, editor]);

  const adjustEditorHeight = useCallback(() => {
    if (editorRef.current) {
      const container = editorRef.current;
      const containerHeight = container.getBoundingClientRect().height;
      const chatHeight = isChatOpen ? 300 : 0;
      
      if (editor) {
        const editorElement = container.querySelector('.ProseMirror');
        if (editorElement) {
          (editorElement as HTMLElement).style.height = `${containerHeight - chatHeight - 100}px`;
        }
      }
    }
  }, [editor, isChatOpen]);

  useEffect(() => {
    adjustEditorHeight();
    window.addEventListener('resize', adjustEditorHeight);
    return () => window.removeEventListener('resize', adjustEditorHeight);
  }, [adjustEditorHeight]);

  if (!editor) {
    return <div className="p-8">Loading editor...</div>;
  }

  return (
    <div 
      className="flex flex-col h-full overflow-hidden"
      ref={editorRef}
    >
      <NoteHeader 
        title={note.title} 
        noteId={note.id} 
      />
      
      <EditorMenuBar editor={editor} />
      
      <div className="overflow-y-auto flex-1 p-6">
        <EditorContent editor={editor} />
      </div>
      
      <AIChatButton noteId={note.id} />
      
      {isChatOpen && <AIChatInterface noteId={note.id} />}
    </div>
  );
}