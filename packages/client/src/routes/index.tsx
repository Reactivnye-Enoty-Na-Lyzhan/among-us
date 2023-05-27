import GamePage from './../components/GamePage/GamePage';
import LandingPage from './../components/LandingPage/_Component';
import LeaderBoard from './../components/LeaderBoard/LeaderBoard';
import LoginPage from './../components/LoginPage/LoginPage';
import SignUpPage from './../components/SignUpPage/SignUpPage';
import ForumPage from './../components/Forum/Page/Page';
import ForumPostPage from '../components/Forum/PostPage/PostPage';
import Profile from '@/components/Profile/Profile';
import { Error404 } from '@/components/ErrorPage/ErrorPage';
import ForumEditPostPage from '@/components/Forum/EditPostPage/EditPostPage';

export const routes = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/signin',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/game/*',
    element: <GamePage />,
  },
  {
    path: '/leaderboard',
    element: <LeaderBoard />,
  },
  {
    path: '/forum/create',
    element: <ForumEditPostPage />,
  },
  {
    path: '/forum/edit/:postId',
    element: <ForumEditPostPage />,
  },
  {
    path: '/forum/:postId',
    element: <ForumPostPage />,
  },
  {
    path: '/forum',
    element: <ForumPage />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/*',
    element: <Error404 />,
  },
];
