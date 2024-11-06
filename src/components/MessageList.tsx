import React from 'react';
import { Message } from '../types';
import { MessageCard } from './MessageCard';

interface MessageListProps {
  messages: Message[];
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
  onToggleVisibility?: (id: string) => void;
  onReply?: (messageId: string, content: string) => void;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  isAdmin = false,
  onDelete,
  onToggleVisibility,
  onReply,
}) => {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <MessageCard
          key={message.id}
          message={message}
          isAdmin={isAdmin}
          onDelete={onDelete}
          onToggleVisibility={onToggleVisibility}
          onReply={onReply}
        />
      ))}
    </div>
  );
};