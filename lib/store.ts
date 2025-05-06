import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  chatHistory: ChatMessage[];
};

interface NotesState {
  notes: Note[];
  activeNoteId: string | null;
  isChatOpen: boolean;
  createNote: () => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  setActiveNote: (id: string) => void;
  setChatOpen: (isOpen: boolean) => void;
  addChatMessage: (noteId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
}

const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [],
      activeNoteId: null,
      isChatOpen: false,
      createNote: () => {
        const newNote: Note = {
          id: uuidv4(),
          title: 'Untitled',
          content: '',
          createdAt: Date.now(),
          updatedAt: Date.now(),
          chatHistory: [],
        };
        
        set((state) => ({
          notes: [newNote, ...state.notes],
          activeNoteId: newNote.id,
        }));
      },
      updateNote: (id, updates) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, ...updates, updatedAt: Date.now() } : note
          ),
        }));
      },
      deleteNote: (id) => {
        const { notes, activeNoteId } = get();
        const filteredNotes = notes.filter((note) => note.id !== id);
        
        set(() => ({
          notes: filteredNotes,
          activeNoteId: activeNoteId === id ? (filteredNotes[0]?.id || null) : activeNoteId,
        }));
      },
      setActiveNote: (id) => {
        set({ activeNoteId: id });
      },
      setChatOpen: (isOpen) => {
        set({ isChatOpen: isOpen });
      },
      addChatMessage: (noteId, message) => {
        const newMessage: ChatMessage = {
          id: uuidv4(),
          ...message,
          timestamp: Date.now(),
        };
        
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === noteId
              ? {
                  ...note,
                  chatHistory: [...note.chatHistory, newMessage],
                }
              : note
          ),
        }));
      },
    }),
    {
      name: 'notes-storage',
    }
  )
);

export default useNotesStore;