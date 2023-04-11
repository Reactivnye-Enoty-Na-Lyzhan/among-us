interface ForumTheme {
  title: string;
  author: string;
  avatarUrl: string | null;
  messagesCount: number;
  lastMessage: ForumThemeMessage | null;
}

interface ForumThemeMessage {
  date: string;
  author: string;
  avatarUrl: null;
  text: string | null;
}

interface ForumThemeGroup {
  title: string;
  themes: ForumTheme[];
}
