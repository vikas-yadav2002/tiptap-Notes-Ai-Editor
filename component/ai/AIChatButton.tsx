'use client';

import { Button } from '@/components/ui/button';
import useNotesStore from '@/lib/store';
import { Bot } from 'lucide-react';
import { motion } from 'framer-motion';

interface AIChatButtonProps {
  noteId: string;
}

export default function AIChatButton({ noteId }: AIChatButtonProps) {
  const { isChatOpen, setChatOpen } = useNotesStore();

  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  return (
    <motion.div
      className="absolute bottom-6 right-6 z-10"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      <Button
        onClick={toggleChat}
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg"
        variant={isChatOpen ? "secondary" : "default"}
      >
        <Bot className="h-6 w-6" />
        <span className="sr-only">{isChatOpen ? 'Close AI Chat' : 'Open AI Chat'}</span>
      </Button>
    </motion.div>
  );
}