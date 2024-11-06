import React, { useState } from 'react';

interface MessageFormProps {
  onSubmit: (content: string) => void;
}

const MAX_CHARS = 1000;

export const MessageForm: React.FC<MessageFormProps> = ({ onSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value.slice(0, MAX_CHARS);
    setContent(newContent);
  };

  const remainingChars = MAX_CHARS - content.length;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <textarea
          value={content}
          onChange={handleChange}
          placeholder="输入留言内容..."
          className="w-full p-2 border rounded-lg h-32 resize-none"
        />
        <div className="absolute bottom-2 right-2 text-sm text-gray-500">
          已输入 {content.length} 字，还可输入 {remainingChars} 字
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        发布留言
      </button>
    </form>
  );
};