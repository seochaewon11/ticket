import { cloneElement, type JSX, type SVGProps } from "react";

/** org/js/common.js의 NOLI_COMMON.ICONS를 이식한 공통 아이콘 세트 */
export type IconName =
  | "heart"
  | "star"
  | "plus"
  | "search"
  | "share"
  | "pin"
  | "back"
  | "chevron"
  | "sparkle"
  | "sparkleOutline"
  | "calendar"
  | "bookmark"
  | "chart"
  | "user"
  | "clock"
  | "ticket"
  | "trendUp"
  | "genre"
  | "bell"
  | "edit"
  | "settings"
  | "support"
  | "info"
  | "mail";

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  /** heart 아이콘 전용: 채워진(찜) 상태 여부 */
  filled?: boolean;
}

const iconBody: Record<IconName, (filled: boolean) => JSX.Element> = {
  heart: (filled) => (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2}>
      <path d="M12 21s-7.5-4.6-10-9.3C.6 8.4 2.1 5 5.6 5c2 0 3.4 1.1 4.4 2.6C11 6.1 12.4 5 14.4 5c3.5 0 5 3.4 3.6 6.7-2.5 4.7-10 9.3-10 9.3Z" />
    </svg>
  ),
  star: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.5l2.9 6.3 6.9.7-5.2 4.6 1.6 6.8L12 17.6l-6.2 3.3 1.6-6.8L2.2 9.5l6.9-.7L12 2.5Z" />
    </svg>
  ),
  plus: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  search: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <circle cx={11} cy={11} r={7} />
      <path d="m20 20-3.5-3.5" />
    </svg>
  ),
  share: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={18} cy={5} r={2.5} />
      <circle cx={6} cy={12} r={2.5} />
      <circle cx={18} cy={19} r={2.5} />
      <path d="M8.2 10.8 15.8 6.7M8.2 13.2l7.6 4.1" />
    </svg>
  ),
  pin: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" />
      <circle cx={12} cy={9.5} r={2.3} />
    </svg>
  ),
  back: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 5 8 12l7 7" />
    </svg>
  ),
  chevron: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 5 7 7-7 7" />
    </svg>
  ),
  sparkle: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c.5 3.6 1.9 5 5.5 5.5-3.6.5-5 1.9-5.5 5.5-.5-3.6-1.9-5-5.5-5.5C10.1 7 11.5 5.6 12 2Z" />
      <path d="M19 14c.3 1.8 1 2.5 2.8 2.8-1.8.3-2.5 1-2.8 2.8-.3-1.8-1-2.5-2.8-2.8 1.8-.3 2.5-1 2.8-2.8Z" />
    </svg>
  ),
  sparkleOutline: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round">
      <path d="M12 3c.6 4.3 2.3 6 6.6 6.6C14.3 10.2 12.6 11.9 12 16.2c-.6-4.3-2.3-6-6.6-6.6C9.7 9 11.4 7.3 12 3Z" />
    </svg>
  ),
  calendar: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x={3.5} y={5} width={17} height={16} rx={3} />
      <path d="M8 3v4M16 3v4M3.5 10h17" />
    </svg>
  ),
  bookmark: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={11} cy={11} r={7} />
      <path d="M9 8.3v5.4l2-1.2 2 1.2V8.3" />
    </svg>
  ),
  chart: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 5.5h16M4 5.5v13a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-13M8 12h8M8 16h5" />
    </svg>
  ),
  user: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x={4} y={4} width={16} height={16} rx={3} />
      <circle cx={12} cy={10.5} r={2.3} />
      <path d="M8 17c.6-2 2-3 4-3s3.4 1 4 3" />
    </svg>
  ),
  clock: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={12} cy={12} r={8.5} />
      <path d="M12 7.5V12l3 2" />
    </svg>
  ),
  ticket: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1.2a1.7 1.7 0 0 0 0 3.6V15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1.2a1.7 1.7 0 0 0 0-3.6V9Z" />
      <path d="M9 7v10" strokeDasharray="2 2" />
    </svg>
  ),
  trendUp: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 16 6-6 4 4 8-9" />
      <path d="M15 5h6v6" />
    </svg>
  ),
  genre: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={9} cy={10.5} r={5.5} />
      <circle cx={15} cy={10.5} r={5.5} />
    </svg>
  ),
  bell: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3.5a1.3 1.3 0 0 0-1.3 1.3v.5C8.2 6 6.5 8.4 6.5 11v3.5L4.8 16.8a.7.7 0 0 0 .5 1.2h13.4a.7.7 0 0 0 .5-1.2L17.5 14.5V11c0-2.6-1.7-5-4.2-5.7v-.5A1.3 1.3 0 0 0 12 3.5Z" />
      <path d="M9.7 19.5a2.4 2.4 0 0 0 4.6 0" />
    </svg>
  ),
  edit: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5.5 16 4 20Z" />
    </svg>
  ),
  settings: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={12} cy={12} r={3} />
      <path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3.8a7 7 0 0 0-2.1-1.2L14 3h-4l-.5 2.5a7 7 0 0 0-2.1 1.2l-2.3-.8-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-.8c.6.5 1.3.9 2.1 1.2L10 21h4l.5-2.5c.8-.3 1.5-.7 2.1-1.2l2.3.8 2-3.4-2-1.5c.1-.4.1-.8.1-1.2Z" />
    </svg>
  ),
  support: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={12} cy={12} r={8.5} />
      <path d="M9.2 9.6a2.8 2.8 0 1 1 3.9 2.6c-.8.4-1.1.8-1.1 1.6" />
      <circle cx={12} cy={16.6} r={0.2} fill="currentColor" />
    </svg>
  ),
  info: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={12} cy={12} r={8.5} />
      <path d="M12 11v5.3M12 8v.1" />
    </svg>
  ),
  mail: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x={3} y={5} width={18} height={14} rx={2.5} />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
};

/**
 * 공통 아이콘 컴포넌트. width/height는 지정하지 않으므로
 * 사용하는 쪽의 styled-components에서 `svg { width; height; }`로 크기를 제어한다.
 */
export function Icon({ name, filled = false, ...svgProps }: IconProps) {
  return cloneElement(iconBody[name](filled), svgProps);
}
