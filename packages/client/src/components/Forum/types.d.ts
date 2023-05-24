import { ForumPostType } from '@/store/forum/forum.types';

interface ForumThemeMessage {
  date: string;
  author: string;
  avatarUrl: null;
  text: string | null;
}

interface ForumThemeGroup {
  title: string;
  themes: ForumPostType[];
}
