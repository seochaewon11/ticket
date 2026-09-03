import type { CategoryOption } from "../types";

/** 취향설정 - 공연 카테고리 옵션 */
export const categoryOptions: CategoryOption[] = [
  { id: "concert", label: "콘서트", iconType: "mic" },
  { id: "musical", label: "뮤지컬", iconType: "mask" },
  { id: "band", label: "밴드", iconType: "vinyl" },
  { id: "dance", label: "댄스", iconType: "dance" },
  { id: "classic", label: "클래식", iconType: "note" },
  { id: "exhibit", label: "전시", iconType: "palette" },
];
