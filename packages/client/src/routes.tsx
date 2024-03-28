import MainPage, { initMainPage } from '@pages/MainPage'
import LoginPage from '@pages/LoginPage'
import SignupPage from '@pages/SignupPage'
import ProfilePage, { initProfilePage } from '@pages/ProfilePage'
import GamePage, { initGamePage } from '@pages/GamePage'
import LeaderBoardPage, { initLeaderBoardPage } from '@pages/LeaderBoardPage'
import ForumPage, { initForumPage } from '@pages/ForumPage'
import ForumTopicPage, { initForumTopicPage } from '@pages/ForumTopicPage'
import ErrorPage from '@pages/ErrorPage'
import ProtectedRoute from '@components/protected-route'
import { routerPaths } from '@core/constants'
import ErrorBoundary from '@components/error-boundary'
import { AppDispatch, RootState } from './store'

export type PageInitArgs = {
  dispatch: AppDispatch
  state: RootState
}

export const routes = [
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <ProtectedRoute authProtected={false} />
      </ErrorBoundary>
    ),
    children: [
      {
        path: routerPaths.login,
        element: <LoginPage />,
      },
      {
        path: routerPaths.signup,
        element: <SignupPage />,
      },
    ],
  },
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <ProtectedRoute authProtected={true} />
      </ErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: <MainPage />,
        fetchData: initMainPage,
      },
      {
        path: routerPaths.profile,
        element: <ProfilePage />,
        fetchData: initProfilePage,
      },
      {
        path: routerPaths.game,
        element: <GamePage />,
        fetchData: initGamePage,
      },
      {
        path: routerPaths.leaderBoard,
        element: <LeaderBoardPage />,
        fetchData: initLeaderBoardPage,
      },
      {
        path: routerPaths.forum,
        element: <ForumPage />,
        fetchData: initForumPage,
      },
      {
        path: routerPaths.forumTopic,
        element: <ForumTopicPage />,
        fetchData: initForumTopicPage,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage type="404" />,
  },
]
