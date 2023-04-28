import GamePage from './../components/GamePage/GamePage';
import LandingPage from './../components/LandingPage/_Component';
import LeaderBoard from './../components/LeaderBoard/LeaderBoard';
import LoginPage from './../components/LoginPage/LoginPage';
import SignUpPage from './../components/SignUpPage/SignUpPage';
import ForumPage from './../components/Forum/Page/Page';
import Profile from '@/components/Profile/Profile';
import { Error404 } from '@/components/ErrorPage/ErrorPage';
// <Route path="/" element={<LandingPage />} />
//         <Route path="/signin" element={<LoginPage />} />
//         <Route path="/signup" element={<SignUpPage />} />
//         <Route path="/game/*" element={<GamePage />} />
//         <Route path="/leaderboard" element={<LeaderBoard />} />
//         <Route path="/forum/:param?" element={<ForumPage />} />
//         <Route
//           path="/profile"
//           element={
//             <Profile choice={link} handleChoiceChange={handleChoiceChange} />
//           }
//         />
//         <Route path="*" element={<Error404 />} />

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
    path: '/forum/:param?',
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
