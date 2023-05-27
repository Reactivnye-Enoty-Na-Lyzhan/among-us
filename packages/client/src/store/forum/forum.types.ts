export type ForumPostType = {
  id: number;
  text: string;
  title: string;
  pinned: boolean;
  date: string;
  author: ForumAuthorType;
  messagesCount?: string;
  lastMessage?: ForumMessageType[];
};

export type ForumAuthorType = {
  username: string;
  avatar: string | null;
  firstName: string;
  lastName: string;
};

export type ForumMessageType = {
  id: number;
  text: string;
  date: string;
  parentId: number;
  authorId: number;
  author: ForumAuthorType;
};
