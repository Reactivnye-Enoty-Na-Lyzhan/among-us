export type ForumPostType = {
  id: string;
  text: string;
  title: string;
  pinned: boolean;
  date: string;
  author: ForumAuthorType;
  messagesCount: string;
  lastMessage: ForumLastMessageType[];
};

export type ForumAuthorType = {
  username: string;
  avatar: string | null;
  firstName: string;
  lastName: string;
};

export type ForumLastMessageType = {
  text: string;
  date: string;
  author: ForumAuthorType;
};
