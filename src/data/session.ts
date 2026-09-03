import type { Session } from "../types";

/** AppStateContext의 초기 세션 값 (실제 인증 없음, 화면 흐름 제어용) */
export const initialSession: Session = {
  isLoggedIn: false,
};
