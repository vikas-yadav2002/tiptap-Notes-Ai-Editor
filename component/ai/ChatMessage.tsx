import { ChatMessage } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';
import { format } from 'date-fns';

interface ChatMessageProps {
  message: ChatMessage;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const formattedTime = format(new Date(message.timestamp), 'h:mm a');
  
  return (
    <div 
      className={cn(
        "flex items-start gap-2 group",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div 
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-muted text-muted-foreground"
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium">
            {isUser ? 'You' : 'AI Assistant'}
          </span>
          <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            {formattedTime}
          </span>
        </div>
        
        <div 
          className={cn(
            "rounded-lg px-3 py-2 text-sm",
            isUser 
              ? "bg-primary text-primary-foreground ml-auto max-w-[80%]" 
              : "bg-muted text-foreground max-w-[80%]"
          )}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
}