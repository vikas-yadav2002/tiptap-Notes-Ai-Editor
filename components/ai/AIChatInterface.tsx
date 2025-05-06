'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import useNotesStore, { ChatMessage } from '@/lib/store';
import { getMockAIResponse } from '@/lib/mock-ai';
import { Send, X } from 'lucide-react';
import ChatMessageComponent from './ChatMessage';
import { motion, AnimatePresence } from 'framer-motion';

interface AIChatInterfaceProps {
  noteId: string;
}

export default function AIChatInterface({ noteId }: AIChatInterfaceProps) {
  const { notes, addChatMessage, setChatOpen } = useNotesStore();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const note = notes.find((note) => note.id === noteId);
  const chatHistory = note?.chatHistory || [];

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;
    
    // Add user message
    addChatMessage(noteId, {
      role: 'user',
      content: message,
    });
    
    setMessage('');
    setIsLoading(true);
    
    try {
      // Get AI response (simulated)
      const aiResponse = await getMockAIResponse(message);
      
      // Add AI response
      addChatMessage(noteId, {
        role: 'assistant',
        content: aiResponse,
      });
    } catch (error) {
      console.error('Error getting AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [chatHistory]);
  
  // Focus input when chat opens
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 bg-card border-t shadow-lg z-10 rounded-t-xl overflow-hidden"
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 300, opacity: 0 }}
      transition={{ type: 'spring', damping: 30, stiffness: 400 }}
    >
      <div className="flex items-center justify-between border-b p-2">
        <h3 className="text-sm font-medium ml-2">AI Assistant</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setChatOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div 
        className="h-64 overflow-y-auto p-4"
        ref={scrollAreaRef}
      >
        {chatHistory.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-muted-foreground">
              Ask the AI assistant anything about your note
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {chatHistory.map((msg) => (
              <ChatMessageComponent key={msg.id} message={msg} />
            ))}
            {isLoading && (
              <div className="flex gap-1 items-center text-sm text-muted-foreground ml-2">
                <div className="animate-bounce h-1.5 w-1.5 bg-primary rounded-full" />
                <div className="animate-bounce h-1.5 w-1.5 bg-primary rounded-full animation-delay-200" />
                <div className="animate-bounce h-1.5 w-1.5 bg-primary rounded-full animation-delay-500" />
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="p-2 border-t flex items-center gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything..."
          className="flex-1"
          disabled={isLoading}
          ref={inputRef}
        />
        <Button 
          size="icon" 
          onClick={handleSendMessage}
          disabled={!message.trim() || isLoading}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}