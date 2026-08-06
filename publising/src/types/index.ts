// org/data.js의 데이터 구조를 그대로 이식한 타입 정의

export type GenreKey = '콘서트' | '뮤지컬' | '밴드' | '댄스' | '클래식' | '전시'

export interface GenreOption {
  key: GenreKey
  icon: string
  color: 'purple' | 'pink' | 'tan'
}

export type MoodKey =
  | '에너지 넘치는'
  | '감성적인'
  | '유쾌한'
  | '몰입되는'
  | '잔잔한'
  | '웅장한'
  | '로맨틱한'
  | '몽환적인'
  | '힐링되는'
  | '트렌디한'

export interface User {
  name: string
  avatarUrl: string
  level: number
  titles: string[]
  favoriteGenreIcons: string[]
  favoriteGenreExtraCount: number
}

export interface UserPreference {
  favoriteGenres: string[]
  favoriteMoods: string[]
  favoriteArtistIds: string[]
  updatedAt: string | null
}

export interface RecommendReason {
  summary: string
  genrePreferenceLabel: string
  trendingLabel: string
}

export interface CastMember {
  name: string
  role: string
  photoUrl: string | null
}

export type PerformanceStatus = 'wish' | 'watched' | null

// 공연마다 상세 화면(detail) 전용 필드 유무가 달라 옵셔널로 정의
export interface Performance {
  id: string
  title: string
  genre: string
  mood: string[]
  matchRate: number
  posterUrl: string
  period: string
  venue: string
  liked: boolean
  status: PerformanceStatus
  synopsis?: string
  isRunning?: boolean
  tagline?: string
  tags?: string[]
  recommendReason?: RecommendReason
  runtimeText?: string
  priceRangeText?: string
  cast?: CastMember[]
}

export interface Playlist {
  id: string
  title: string
  tagline: string
  likeCount: number
  accentColor: string
  buttonBg: string
  coverImageUrl: string
  collaboratorPhotos: string[]
  collaboratorColors: string[]
  coverGradient: string
}

export interface RecentlyViewed {
  id: string
  title: string
  venue: string
  posterUrl: string
}

export interface CalendarEventDate {
  date: string // YYYY-MM-DD
  type: 'pink' | 'multi' | 'primary' | 'gray'
}

export interface ReminderOption {
  key: string
  label: string
  enabled: boolean
}

export interface TicketOpenAlert {
  id: string
  title: string
  dDay: number
  scheduleText: string
  theme: 'primary' | 'muted'
  posterUrl: string
  genreTags: string[]
  dateText: string
  timeText: string
  reminderOptions: ReminderOption[]
}

export interface UpcomingPerformance {
  id: string
  title: string
  genreTag: string
  dateText: string
  venue: string
  posterUrl: string
}

export interface ViewingTrendMonth {
  label: string
  count: number
  isCurrent?: boolean
}

export interface ViewingTrend {
  totalCount: number
  months: ViewingTrendMonth[]
}

export interface GenreDistributionItem {
  genre: string
  percentage: number
  color: string
}

export interface ArtistRankingItem {
  rank: number
  name: string
  role: string
  count: number
  photoUrl: string
}

export interface TasteDashboard {
  topGenre: string
  curationMatchRate: number
}

export interface MemoryPerformance {
  id: string
  title: string
  venue: string
  viewedDateLabel: string
  posterUrl: string
}

export interface Artist {
  id: string
  name: string
  photoUrl: string
}

export interface BaseCounts {
  wish: number
  watched: number
}

// alertId -> { reminderOptionKey: enabled }
export type AlertReminders = Record<string, Record<string, boolean>>

// localStorage(noli_app_data_v2)에 저장되는 전체 상태
export interface AppData {
  user: User
  userPreference: UserPreference
  performances: Performance[]
  baseCounts: BaseCounts
  savedPlaylistIds: string[]
  alertReminders: AlertReminders
  playlists: Playlist[]
  // 최근 본 공연 id 목록 (최신순, detail 페이지 방문 시 기록)
  recentlyViewedIds: string[]
}
