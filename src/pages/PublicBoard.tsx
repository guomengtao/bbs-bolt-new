import React, { useState } from 'react';
import { MessageList } from '../components/MessageList';
import { MessageForm } from '../components/MessageForm';
import { ThemeToggle } from '../components/ThemeToggle';
import { Pagination } from '../components/Pagination';
import { useThemeStore } from '../store/themeStore';
import { useMessageStore } from '../store/messageStore';

const ITEMS_PER_PAGE = 10;

export const PublicBoard: React.FC = () => {
  const { mode } = useThemeStore();
  const [currentPage, setCurrentPage] = useState(1);
  const { messages, addMessage, addReply } = useMessageStore();

  const visibleMessages = messages.filter((message) => !message.isHidden);
  const totalPages = Math.ceil(visibleMessages.length / ITEMS_PER_PAGE);
  const paginatedMessages = visibleMessages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getThemeClasses = () => {
    switch (mode) {
      case 'flat':
        return 'bg-gray-50 text-gray-800';
      case 'cartoon':
        return 'bg-yellow-100 text-purple-900';
      case 'retro':
        return 'bg-amber-50 text-amber-900';
      case 'fresh':
        return 'bg-emerald-50 text-emerald-900';
      case 'dark':
        return 'bg-gray-900 text-white';
      case 'eyecare':
        return 'bg-green-50 text-gray-800';
      case 'colorful':
        return 'bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300';
      default:
        return 'bg-gray-100 text-gray-900';
    }
  };

  const getCardClasses = () => {
    switch (mode) {
      case 'flat':
        return 'shadow-none border border-gray-200';
      case 'cartoon':
        return 'border-4 border-purple-400 shadow-lg';
      case 'retro':
        return 'border-2 border-amber-700 shadow-inner';
      case 'fresh':
        return 'shadow-md border border-emerald-200';
      default:
        return 'shadow';
    }
  };

  return (
    <div className={`min-h-screen ${getThemeClasses()} transition-colors duration-300`}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-2xl font-bold">留言板</h1>
          <ThemeToggle />
        </div>
        <div className={`max-w-2xl mx-auto space-y-6 ${getCardClasses()}`}>
          <MessageForm onSubmit={addMessage} />
          <MessageList
            messages={paginatedMessages}
            onReply={addReply}
          />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};