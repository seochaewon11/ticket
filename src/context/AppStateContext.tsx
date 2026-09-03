import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { initialSession, initialUserPreference } from "../data";
import type { Session, UserPreference } from "../types";

/**
 * org/js/data.js의 session / userPreference 전역 변수를 이식한 전역 상태.
 * 화면 흐름(스플래시 분기, 취향설정 완료 여부 등)을 좌우하는 최소 상태만 여기서 관리하고,
 * 찜/알람 토글 같은 화면 로컬 상호작용은 각 페이지의 로컬 state로 둔다.
 */
interface AppStateValue {
  session: Session;
  userPreference: UserPreference;
  /** 소셜/이메일 로그인 버튼 클릭 시 호출 (실제 인증 없음) */
  login: () => void;
  /** 취향설정 화면에서 단계별 선택값 갱신 */
  updatePreference: (patch: Partial<UserPreference>) => void;
  /** 취향설정 마지막 단계 완료 처리 */
  completeFavorite: () => void;
}

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session>(initialSession);
  const [userPreference, setUserPreference] = useState<UserPreference>(initialUserPreference);

  const value = useMemo<AppStateValue>(
    () => ({
      session,
      userPreference,
      login: () => setSession((prev) => ({ ...prev, isLoggedIn: true })),
      updatePreference: (patch) => setUserPreference((prev) => ({ ...prev, ...patch })),
      completeFavorite: () =>
        setUserPreference((prev) => ({ ...prev, completed: true, step: prev.totalSteps })),
    }),
    [session, userPreference],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useAppState는 AppStateProvider 내부에서만 사용할 수 있습니다.");
  }
  return ctx;
}
