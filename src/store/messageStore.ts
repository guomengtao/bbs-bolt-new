import { create } from 'zustand';
import { Message, Reply } from '../types';

interface MessageState {
  messages: Message[];
  addMessage: (content: string) => void;
  addReply: (messageId: string, content: string) => void;
  deleteMessage: (id: string) => void;
  toggleMessageVisibility: (id: string) => void;
}

// 生成唯一ID的辅助函数
const generateId = () => Math.random().toString(36).substr(2, 9);

// 示例用户数据
const currentUser = {
  id: 'user1',
  name: '访客用户',
};

const adminUser = {
  id: 'admin1',
  name: '管理员',
};

// 初始示例数据
const initialMessages: Message[] = [
  {
    id: '1',
    content: '欢迎来到留言板！这是第一条留言。',
    createdAt: new Date('2023-12-20T10:00:00'),
    authorId: adminUser.id,
    authorName: adminUser.name,
    isHidden: false,
    replies: [
      {
        id: 'r1',
        content: '感谢管理员的欢迎！',
        createdAt: new Date('2023-12-20T10:30:00'),
        authorId: 'user2',
        authorName: '访客小明',
        messageId: '1',
      },
    ],
  },
  {
    id: '2',
    content: '这是一个测试留言，测试留言板的功能是否正常。',
    createdAt: new Date('2023-12-20T11:00:00'),
    authorId: currentUser.id,
    authorName: currentUser.name,
    isHidden: false,
    replies: [],
  },
];

export const useMessageStore = create<MessageState>((set) => ({
  messages: initialMessages,
  
  addMessage: (content) => set((state) => ({
    messages: [
      {
        id: generateId(),
        content,
        createdAt: new Date(),
        authorId: currentUser.id,
        authorName: currentUser.name,
        isHidden: false,
        replies: [],
      },
      ...state.messages,
    ],
  })),

  addReply: (messageId, content) => set((state) => ({
    messages: state.messages.map((message) =>
      message.id === messageId
        ? {
            ...message,
            replies: [
              ...message.replies,
              {
                id: generateId(),
                content,
                createdAt: new Date(),
                authorId: currentUser.id,
                authorName: currentUser.name,
                messageId,
              },
            ],
          }
        : message
    ),
  })),

  deleteMessage: (id) => set((state) => ({
    messages: state.messages.filter((message) => message.id !== id),
  })),

  toggleMessageVisibility: (id) => set((state) => ({
    messages: state.messages.map((message) =>
      message.id === id
        ? { ...message, isHidden: !message.isHidden }
        : message
    ),
  })),
}));