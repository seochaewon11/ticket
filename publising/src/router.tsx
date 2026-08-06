import { createBrowserRouter } from 'react-router-dom'
import { SplashPage } from './pages/Splash/SplashPage'
import { LoginPage } from './pages/Login/LoginPage'
import { HomePage } from './pages/Home/HomePage'
import { DetailPage } from './pages/Detail/DetailPage'
import { AddPage } from './pages/Add/AddPage'
import { ArtistPage } from './pages/Artist/ArtistPage'
import { CompletePage } from './pages/Complete/CompletePage'
import { CalendarPage } from './pages/Calendar/CalendarPage'
import { AlarmPage } from './pages/Alarm/AlarmPage'
import { PlayPage } from './pages/Play/PlayPage'
import { AnalysisPage } from './pages/Analysis/AnalysisPage'
import { MyPage } from './pages/MyPage/MyPage'

// 작업계획.md 7번 섹션 라우팅 설계
export const router = createBrowserRouter(
  [
    { path: '/', element: <SplashPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/home', element: <HomePage /> },
    { path: '/detail/:id', element: <DetailPage /> },
    { path: '/add', element: <AddPage /> },
    { path: '/artist', element: <ArtistPage /> },
    { path: '/complete', element: <CompletePage /> },
    { path: '/calendar', element: <CalendarPage /> },
    { path: '/alarm/:id', element: <AlarmPage /> },
    { path: '/play', element: <PlayPage /> },
    { path: '/analysis', element: <AnalysisPage /> },
    { path: '/mypage', element: <MyPage /> },
  ],
  { basename: '/' },
)
