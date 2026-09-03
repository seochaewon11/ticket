import type { CategoryIconType } from "../../types";

/** org/js/favorite.js의 카테고리 전용 아이콘 세트 (공통 Icon과 별개) */
export interface CategoryIconProps {
  type: CategoryIconType;
}

export function CategoryIcon({ type }: CategoryIconProps) {
  switch (type) {
    case "mic":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <rect x={9} y={2} width={6} height={12} rx={3} />
          <path d="M5 11a7 7 0 0 0 14 0" />
          <path d="M12 18v3" />
        </svg>
      );
    case "mask":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <circle cx={9} cy={10.5} r={5.5} />
          <circle cx={15} cy={10.5} r={5.5} />
          <path d="M6.7 12.3c.9 1 2.7 1 3.6 0" />
          <path d="M17.3 9.3c-.9-1-2.7-1-3.6 0" />
          <circle cx={7.2} cy={9} r={0.6} fill="currentColor" stroke="none" />
          <circle cx={10.8} cy={9} r={0.6} fill="currentColor" stroke="none" />
          <circle cx={13.2} cy={11.5} r={0.6} fill="currentColor" stroke="none" />
          <circle cx={16.8} cy={11.5} r={0.6} fill="currentColor" stroke="none" />
        </svg>
      );
    case "vinyl":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <circle cx={12} cy={12} r={9} />
          <circle cx={12} cy={12} r={3.2} />
          <circle cx={12} cy={12} r={1} fill="currentColor" stroke="none" />
        </svg>
      );
    case "dance":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <circle cx={14} cy={4.5} r={1.8} fill="currentColor" stroke="none" />
          <path d="M9 21l2.5-6-3-2.5 1-4.5 4 1.5 2 3.5 3 1.5" />
          <path d="M11.5 15 8 18" />
        </svg>
      );
    case "note":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 18a3 3 0 1 1-2-2.8V5.5a1 1 0 0 1 .8-1L17 2.6a1 1 0 0 1 1.2 1V15a3 3 0 1 1-2-2.8V6.7l-7 1.6V18Z" />
        </svg>
      );
    case "palette":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a9 8 0 0 0 0 16c1.2 0 1.6-.7 1.6-1.4 0-.4-.2-.7-.4-1-.2-.3-.4-.6-.4-1 0-.8.6-1.4 1.4-1.4H16a4 4 0 0 0 4-4c0-4-3.6-7.2-8-7.2Z" />
          <circle cx={8.2} cy={10.5} r={1} fill="currentColor" stroke="none" />
          <circle cx={11.5} cy={7.3} r={1} fill="currentColor" stroke="none" />
          <circle cx={15.3} cy={9} r={1} fill="currentColor" stroke="none" />
        </svg>
      );
  }
}
