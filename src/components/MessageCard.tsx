import React, { useState } from 'react';
import { Message } from '../types';
import { format } from 'date-fns';

interface MessageCardProps {
  message: Message;
  isAdmin: boolean;
  onDelete?: (id: string) => void;
  onToggleVisibility?: (id: string) => void;
  onReply?: (messageId: string, content: string) => void;
}

export const MessageCard: React.FC<MessageCardProps> = ({
  message,
  isAdmin,
  onDelete,
  onToggleVisibility,
  onReply,
}) => {
  const [replyContent, setReplyContent] = useState('');

  const handleReply = () => {
    if (replyContent.trim() && onReply) {
      onReply(message.id, replyContent);
      setReplyContent('');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium">{message.authorName}</p>
          <p className="text-gray-600 dark:text-gray-300">{message.content}</p>
          <p className="text-sm text-gray-500">
            {format(new Date(message.createdAt), 'yyyy-MM-dd HH:mm')}
          </p>
        </div>
        {isAdmin && (
          <div className="space-x-2">
            <button
              onClick={() => onToggleVisibility?.(message.id)}
              className="text-blue-500 hover:text-blue-700"
            >
              {message.isHidden ? '显示' : '隐藏'}
            </button>
            <button
              onClick={() => onDelete?.(message.id)}
              className="text-red-500 hover:text-red-700"
            >
              删除
            </button>
          </div>
        )}
      </div>

      {/* Replies */}
      <div className="mt-4 ml-4 space-y-2">
        {message.replies.map((reply) => (
          <div key={reply.id} className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
            <p className="font-medium">{reply.authorName}</p>
            <p className="text-gray-600 dark:text-gray-300">{reply.content}</p>
            <p className="text-sm text-gray-500">
              {format(new Date(reply.createdAt), 'yyyy-MM-dd HH:mm')}
            </p>
          </div>
        ))}
      </div>

      {/* Reply Form */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          placeholder="输入回复内容..."
          className="flex-1 rounded border p-2"
        />
        <button
          onClick={handleReply}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          回复
        </button>
      </div>
    </div>
  );
};