// org/*.html에 흩어져 있던 인라인 SVG 마크업을 이름별로 모은 레지스트리.
// 각 항목은 <svg viewBox="..."> 내부에 들어갈 마크업만 담는다 (outer <svg> 태그 제외).
// 페이지 전용 아이콘은 각 페이지 구현 시 이 레지스트리에 추가한다.

export type IconName =
  | 'home'
  | 'search'
  | 'calendar'
  | 'analysisChart'
  | 'profile'
  | 'back'
  | 'chevronRight'
  | 'chevronDown'
  | 'chevronLeft'
  | 'bell'
  | 'share'
  | 'settings'
  | 'hamburger'
  | 'heart'
  | 'clock'
  | 'pin'
  | 'edit'
  | 'email'
  | 'check'
  | 'kakao'
  | 'naver'
  | 'ticket'
  | 'arrowRight'
  | 'plus'
  | 'preference'
  | 'headset'
  | 'notice'

interface IconDef {
  viewBox: string
  /** true면 fill=currentColor(선/획 없음), false(기본)면 stroke=currentColor(fill 없음) */
  filled?: boolean
  markup: string
}

export const ICONS: Record<IconName, IconDef> = {
  home: {
    viewBox: '0 0 24 24',
    markup:
      '<path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9z" stroke-linecap="round" stroke-linejoin="round" />',
  },
  search: {
    viewBox: '0 0 24 24',
    markup: '<circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.5-4.5" stroke-linecap="round" />',
  },
  calendar: {
    viewBox: '0 0 24 24',
    markup:
      '<rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 9.5h16M8 3v3.5M16 3v3.5" stroke-linecap="round" />',
  },
  analysisChart: {
    viewBox: '0 0 24 24',
    markup: '<path d="M5 19V10M12 19V5M19 19v-6" stroke-linecap="round" />',
  },
  profile: {
    viewBox: '0 0 24 24',
    markup: '<circle cx="12" cy="8" r="3.4" /><path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" />',
  },
  back: {
    viewBox: '0 0 24 24',
    markup: '<path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round" />',
  },
  chevronRight: {
    viewBox: '0 0 24 24',
    markup: '<path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />',
  },
  chevronDown: {
    viewBox: '0 0 24 24',
    markup: '<path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />',
  },
  chevronLeft: {
    viewBox: '0 0 24 24',
    markup: '<path d="M15 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round" />',
  },
  bell: {
    viewBox: '0 0 24 24',
    markup:
      '<path d="M6 9a6 6 0 0 1 12 0c0 4.5 1.5 6 1.5 6h-15S6 13.5 6 9z" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 19a2 2 0 0 0 4 0" />',
  },
  share: {
    viewBox: '0 0 24 24',
    markup:
      '<circle cx="18" cy="5" r="2.6" /><circle cx="6" cy="12" r="2.6" /><circle cx="18" cy="19" r="2.6" /><path d="M8.3 10.7l7.4-4.2M8.3 13.3l7.4 4.2" />',
  },
  settings: {
    viewBox: '0 0 24 24',
    markup:
      '<circle cx="12" cy="12" r="3.2"></circle><path d="M19.4 13.5a7.6 7.6 0 0 0 0-3l1.9-1.4-2-3.4-2.2.8a7.7 7.7 0 0 0-2.6-1.5L14 2.5h-4l-.5 2.5a7.7 7.7 0 0 0-2.6 1.5l-2.2-.8-2 3.4L4.6 10.5a7.6 7.6 0 0 0 0 3L2.7 15l2 3.4 2.2-.8c.75.65 1.63 1.15 2.6 1.5l.5 2.4h4l.5-2.5a7.7 7.7 0 0 0 2.6-1.5l2.2.8 2-3.4-1.9-1.4z"></path>',
  },
  hamburger: {
    viewBox: '0 0 24 24',
    markup: '<path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" />',
  },
  heart: {
    viewBox: '0 0 24 24',
    filled: true,
    markup:
      '<path d="M12 20.5s-7.5-4.6-10-9.1C.4 8.2 2 4.8 5.4 4.1c2-.4 3.9.5 5 2.1 1.1-1.6 3-2.5 5-2.1 3.4.7 5 4.1 3.4 7.3-2.5 4.5-10 9.1-10 9.1z" />',
  },
  clock: {
    viewBox: '0 0 24 24',
    markup: '<circle cx="12" cy="12" r="8.5"/><path d="M12 8v4l3 2" stroke-linecap="round" stroke-linejoin="round"/>',
  },
  pin: {
    viewBox: '0 0 24 24',
    markup:
      '<path d="M12 21s7-6.4 7-11.5A7 7 0 0 0 5 9.5C5 14.6 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.3"/>',
  },
  edit: {
    viewBox: '0 0 24 24',
    markup: '<path d="M17 2l5 5-12 12H5v-5L17 2z" stroke-linecap="round" stroke-linejoin="round" />',
  },
  email: {
    viewBox: '0 0 24 24',
    markup:
      '<rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" stroke-linecap="round" stroke-linejoin="round" />',
  },
  check: {
    viewBox: '0 0 24 24',
    markup: '<path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />',
  },
  kakao: {
    viewBox: '0 0 24 24',
    filled: true,
    markup:
      '<path d="M12 3C6.48 3 2 6.48 2 10.7c0 2.68 1.8 5.04 4.53 6.4-.2.75-.73 2.7-.84 3.13-.13.53.2.52.42.38.17-.11 2.7-1.83 3.8-2.58.68.1 1.38.15 2.09.15 5.52 0 10-3.48 10-7.48S17.52 3 12 3z" />',
  },
  naver: {
    viewBox: '0 0 24 24',
    filled: true,
    markup: '<path d="M16.5 3v9.6L7.8 3H3v18h5.7v-9.6l8.7 9.6H21V3h-4.5z" />',
  },
  ticket: {
    viewBox: '0 0 24 24',
    markup:
      '<path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8z"/><line x1="10" y1="6" x2="10" y2="18" stroke-dasharray="2 2"/>',
  },
  arrowRight: {
    viewBox: '0 0 24 24',
    markup: '<path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />',
  },
  plus: {
    viewBox: '0 0 24 24',
    markup: '<path d="M12 5v14M5 12h14" stroke-linecap="round" />',
  },
  preference: {
    viewBox: '0 0 24 24',
    markup: '<circle cx="12" cy="12" r="9" /><path d="M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0z" />',
  },
  headset: {
    viewBox: '0 0 24 24',
    markup:
      '<path d="M4 13a8 8 0 0 1 16 0" /><rect x="3" y="13" width="4" height="6" rx="1.5" /><rect x="17" y="13" width="4" height="6" rx="1.5" />',
  },
  notice: {
    viewBox: '0 0 24 24',
    markup: '<circle cx="12" cy="12" r="9" /><path d="M12 8h.01M11 12h1v5h1" stroke-linecap="round" stroke-linejoin="round" />',
  },
}
