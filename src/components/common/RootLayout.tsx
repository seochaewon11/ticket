import { Outlet } from "react-router-dom";
import { SearchOverlay } from "./SearchOverlay";
import { ShareSheet } from "./ShareSheet";
import { SparkleCursor } from "./SparkleCursor";

/**
 * org/index.html의 .app-shell 래퍼를 이식.
 * 화면별 Header/BottomNav는 조합이 제각각이라(예: alarm은 하단탭바 없음,
 * login/favorite는 헤더 자체가 없음) 여기서는 강제하지 않고 각 페이지가 직접 구성한다.
 * 검색 모달(SearchOverlay)과 공유하기 시트(ShareSheet)는 어느 화면에서 열리든 항상 여기서 함께 렌더링한다.
 */
export function RootLayout() {
  return (
    <div className="app-shell">
      <Outlet />
      <SearchOverlay />
      <ShareSheet />
      <SparkleCursor />
    </div>
  );
}
