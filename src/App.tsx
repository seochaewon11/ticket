import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RootLayout } from "./components/common/RootLayout";
import { AppStateProvider } from "./context/AppStateContext";
import { SearchOverlayProvider } from "./context/SearchOverlayContext";
import { ShareSheetProvider } from "./context/ShareSheetContext";
import { AlarmPage } from "./pages/AlarmPage";
import { CalendarPage } from "./pages/CalendarPage";
import { DetailPage } from "./pages/DetailPage";
import { FavoritePage } from "./pages/FavoritePage";
import { LoginPage } from "./pages/LoginPage";
import { MainPage } from "./pages/MainPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ReportPage } from "./pages/ReportPage";
import { SplashPage } from "./pages/SplashPage";
import { StoragePage } from "./pages/StoragePage";
import { UpcomingPage } from "./pages/UpcomingPage";
import { ROUTES } from "./router/routes";

function App() {
  return (
    <AppStateProvider>
      <SearchOverlayProvider>
        <ShareSheetProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<RootLayout />}>
                <Route path={ROUTES.splash} element={<SplashPage />} />
                <Route path={ROUTES.login} element={<LoginPage />} />
                <Route path={ROUTES.favorite} element={<FavoritePage />} />
                <Route path={ROUTES.main} element={<MainPage />} />
                <Route path={ROUTES.detail} element={<DetailPage />} />
                <Route path={ROUTES.calendar} element={<CalendarPage />} />
                <Route path={ROUTES.upcoming} element={<UpcomingPage />} />
                <Route path={ROUTES.alarm} element={<AlarmPage />} />
                <Route path={ROUTES.alarmDetail} element={<AlarmPage />} />
                <Route path={ROUTES.storage} element={<StoragePage />} />
                <Route path={ROUTES.report} element={<ReportPage />} />
                <Route path={ROUTES.profile} element={<ProfilePage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ShareSheetProvider>
      </SearchOverlayProvider>
    </AppStateProvider>
  );
}

export default App;
