/**
 * org/js/data.js에 있던 데이터 모양을 타입으로 이식.
 * 모든 리스트는 원본과 동일하게 id를 가진 객체의 배열로 유지한다.
 */
import type { IconName } from "../components/common/Icon";
import type { PosterTheme } from "../components/common/PosterPlaceholder";

/** 로그인 상태 (실제 인증 없음, 화면 흐름 제어용 임시 세션 상태) */
export interface Session {
  isLoggedIn: boolean;
}

/** 사용자 취향 설정 상태 (취향설정 화면에서 갱신, 메인 화면에서 참조) */
export interface UserPreference {
  userName: string;
  userGreetingName: string;
  step: number;
  totalSteps: number;
  /** categoryOptions.id 참조 */
  selectedCategories: string[];
  /** moodOptions.id 참조 */
  selectedMoods: string[];
  /** artistOptions.id 참조 */
  selectedArtists: string[];
  /** false면 스플래시 이후 취향설정 화면으로, true면 메인으로 바로 이동 */
  completed: boolean;
}

/** 취향설정 화면(favorite.js) 전용 카테고리 아이콘 세트 */
export type CategoryIconType = "mic" | "mask" | "vinyl" | "dance" | "note" | "palette";

export interface CategoryOption {
  id: string;
  label: string;
  iconType: CategoryIconType;
}

export interface MoodOption {
  id: string;
  label: string;
}

export interface ArtistOption {
  id: string;
  name: string;
  theme: PosterTheme;
  /** 실제 프로필 사진이 있는 경우에만 존재 (없으면 theme 그라디언트로 대체) */
  imageUrl?: string;
}

export interface CastMember {
  name: string;
  role: string;
  /** 원본 데이터에 theme이 빈 문자열인 출연진이 존재(포스터 없음) */
  theme: PosterTheme | "";
  /** 실제 프로필 사진이 있는 경우에만 존재 (없으면 theme 그라디언트로 대체) */
  imageUrl?: string;
}

/**
 * 공연 데이터. 메인 화면 리스트/히어로용 최소 필드와
 * 상세화면 전용 필드를 한 인터페이스에 모은다(원본 performances 배열과 동일 구조).
 */
export interface Performance {
  id: string;
  title: string;
  category: string;
  /** 이미지 플레이스홀더 테마 키 */
  theme: PosterTheme;
  dateRange: string;
  venue: string;
  matchRate: number;
  isLiked: boolean;
  isHero: boolean;
  /** 실제 포스터 사진이 있는 경우에만 존재 (없으면 theme 그라디언트로 대체) */
  imageUrl?: string;

  // 상세화면 전용 필드 (일부 공연만 존재)
  rating?: number;
  duration?: string;
  ticketRank?: number;
  tags?: string[];
  matchReasonHtml?: string;
  genrePreferenceText?: string;
  trendingText?: string;
  period?: string;
  runningTime?: string;
  priceRange?: string;
  synopsis?: string;
  castList?: CastMember[];
}

export interface ArtistNewsItem {
  id: string;
  artistName: string;
  theme: PosterTheme;
  dDay: number;
  title: string;
  date: string;
  venue: string;
  isLiked: boolean;
  alarmSet: boolean;
  imageUrl?: string;
}

export interface MonthlyPick {
  id: string;
  category: string;
  theme: PosterTheme;
  date: string;
  title: string;
  venue: string;
  imageUrl?: string;
}

/** 캘린더 화면의 예정된 공연 목록은 monthlyPicks와 동일한 구조를 재사용 */
export type UpcomingShow = MonthlyPick;

export type CalendarDotColor = "danger" | "purple" | "gray";

export interface CalendarMarker {
  /** yyyy-mm-dd */
  date: string;
  dot: CalendarDotColor;
}

export interface TicketAlarm {
  id: string;
  dday: number;
  title: string;
  datetime: string;
  urgent: boolean;
}

export interface AlarmTarget {
  id: string;
  title: string;
  theme: PosterTheme;
  tags: string[];
  datetime: string;
  imageUrl?: string;
}

export interface AlarmOption {
  id: string;
  label: string;
  checked: boolean;
}

/** 보관함 화면의 저장한 공연 / 최근 본 공연 카드 */
export interface StorageItem {
  id: string;
  category: string;
  title: string;
  theme: PosterTheme;
  imageUrl?: string;
}

export interface ViewingTrendPoint {
  month: string;
  count: number;
}

export interface GenreDistributionSlice {
  label: string;
  percent: number;
  color: string;
}

export interface TopArtist {
  rank: number;
  name: string;
  role: string;
  count: number;
  theme: PosterTheme;
  imageUrl?: string;
}

export interface MemoryItem {
  id: string;
  title: string;
  theme: PosterTheme;
  date: string;
  imageUrl?: string;
}

export interface ProfileMenuItem {
  id: string;
  label: string;
  iconType: IconName;
}
