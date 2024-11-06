export interface Message {
  id: string;
  content: string;
  createdAt: Date;
  authorId: string;
  authorName: string;
  isHidden: boolean;
  replies: Reply[];
}

export interface Reply {
  id: string;
  content: string;
  createdAt: Date;
  authorId: string;
  authorName: string;
  messageId: string;
}

export interface User {
  id: string;
  username: string;
  isAdmin: boolean;
}

export type ThemeMode = 'flat' | 'cartoon' | 'retro' | 'fresh' | 'minimal' | 'dark' | 'eyecare' | 'colorful';