import type { ProfileMenuItem } from "../types";

/** 프로필 화면 - 설정 메뉴 목록 */
export const profileMenu: ProfileMenuItem[] = [
  { id: "edit-preference", label: "취향 프로필 수정", iconType: "edit" },
  { id: "settings", label: "설정", iconType: "settings" },
  { id: "support", label: "고객센터", iconType: "support" },
  { id: "terms", label: "공지사항 및 약관", iconType: "info" },
];
