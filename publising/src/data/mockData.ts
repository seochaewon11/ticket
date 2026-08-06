// org/data.js의 목데이터를 그대로 이식
import type {
  AppData,
  CalendarEventDate,
  GenreDistributionItem,
  Playlist,
  TasteDashboard,
  TicketOpenAlert,
  ArtistRankingItem,
  UpcomingPerformance,
  ViewingTrend,
} from '../types'

export const PLAYLISTS: Playlist[] = [
  {
    id: 'playlist_001',
    title: '보고 싶은 뮤지컬',
    tagline: '"언젠가 꼭 맨 앞줄에서 보고 싶은 작품들!"',
    likeCount: 12,
    accentColor: '#5B3E9E',
    buttonBg: '#7C5CFC',
    coverImageUrl: '/img/playimage01.png',
    collaboratorPhotos: ['/img/playimage001.png', '/img/playimage002.png'],
    collaboratorColors: ['#C9B8FB', '#F0A6B8'],
    coverGradient:
      'linear-gradient(180deg, #2A1B12 0%, #5C3A22 45%, #1A1210 100%), radial-gradient(circle at 50% 30%, rgba(255,214,140,0.55), transparent 55%)',
  },
  {
    id: 'playlist_002',
    title: '올해 꼭 갈 콘서트',
    tagline: '"티켓팅 성공 기원! 내 가수들 다 만나기 🔥"',
    likeCount: 8,
    accentColor: '#8B4A1F',
    buttonBg: '#7A4B2A',
    coverImageUrl: '/img/playimage02.png',
    collaboratorPhotos: ['/img/playimage003.png'],
    collaboratorColors: ['#F6C9C0'],
    coverGradient:
      'linear-gradient(180deg, #120E24 0%, #2C1F4A 50%, #120E24 100%), radial-gradient(circle at 30% 70%, rgba(180,120,255,0.5), transparent 55%), radial-gradient(circle at 75% 35%, rgba(255,120,180,0.4), transparent 50%)',
  },
  {
    id: 'playlist_003',
    title: '혼자 보고 싶은 공연',
    tagline: '"오롯이 무대에 집중하고 싶은 날들을 위해 🕯️"',
    likeCount: 5,
    accentColor: '#3A3A45',
    buttonBg: '#3A3A45',
    coverImageUrl: '/img/playimage03.png',
    collaboratorPhotos: ['/img/playimage004.png'],
    collaboratorColors: ['#A78BFA'],
    coverGradient:
      'linear-gradient(180deg, #1C140F 0%, #3C2A1D 55%, #14100D 100%), radial-gradient(circle at 65% 55%, rgba(255,190,120,0.35), transparent 50%)',
  },
]

// 날짜별 이벤트 dot 표시용 (YYYY-MM-DD 기준, type에 따라 dot 색상만 다르게)
export const CALENDAR_EVENT_DATES: CalendarEventDate[] = [
  { date: '2026-10-05', type: 'pink' },
  { date: '2026-10-12', type: 'multi' }, // 점 2개 (여러 이벤트)
  { date: '2026-10-18', type: 'primary' },
  { date: '2026-10-25', type: 'gray' },
]

export const TICKET_OPEN_ALERTS: TicketOpenAlert[] = [
  {
    id: 'alert_001',
    title: "뮤지컬 '오페라의 유령'",
    dDay: 3,
    scheduleText: '10.18 (수) 오후 2:00',
    theme: 'primary',
    posterUrl: '/img/story.png',
    genreTags: ['뮤지컬', '단독판매'],
    dateText: '2026.10.18 (수)',
    timeText: '오후 2:00',
    reminderOptions: [
      { key: '24h', label: '24시간 전', enabled: true },
      { key: '1h', label: '1시간 전', enabled: true },
      { key: '30m', label: '30분 전', enabled: false },
      { key: '10m', label: '10분 전', enabled: false },
    ],
  },
  {
    id: 'alert_002',
    title: "콘서트 '가을 재즈나이트'",
    dDay: 7,
    scheduleText: '10.22 (일) 오후 7:00',
    theme: 'muted',
    posterUrl: '/img/story.png',
    genreTags: ['콘서트', '얼리버드'],
    dateText: '2026.10.22 (일)',
    timeText: '오후 7:00',
    reminderOptions: [
      { key: '24h', label: '24시간 전', enabled: false },
      { key: '1h', label: '1시간 전', enabled: false },
      { key: '30m', label: '30분 전', enabled: false },
      { key: '10m', label: '10분 전', enabled: false },
    ],
  },
]

export const UPCOMING_PERFORMANCES: UpcomingPerformance[] = [
  {
    id: 'upcoming_001',
    title: '서울시립교향악단 정기공연',
    genreTag: '클래식',
    dateText: '10.25 (일)',
    venue: '예술의전당 콘서트홀',
    posterUrl: '/img/poster01.png',
  },
  {
    id: 'upcoming_002',
    title: '가을 밤의 어쿠스틱',
    genreTag: '인디',
    dateText: '11.02 (월)',
    venue: '블루스퀘어 마스터카드홀',
    posterUrl: '/img/poster02.png',
  },
]

export const VIEWING_TREND: ViewingTrend = {
  totalCount: 12,
  months: [
    { label: '9월', count: 2 },
    { label: '10월', count: 1 },
    { label: '11월', count: 3 },
    { label: '12월', count: 3 },
    { label: '1월', count: 1 },
    { label: '2월', count: 2, isCurrent: true },
  ],
}

export const GENRE_DISTRIBUTION: GenreDistributionItem[] = [
  { genre: '뮤지컬', percentage: 45, color: '#7C5CFC' },
  { genre: '콘서트', percentage: 25, color: '#C9B8FF' },
  { genre: '전시회', percentage: 20, color: '#F0A6B8' },
]

export const TOP_ARTISTS_RANKING: ArtistRankingItem[] = [
  { rank: 1, name: '김준수', role: '뮤지컬 배우', count: 4, photoUrl: '/img/artist001.png' },
  { rank: 2, name: '아이유', role: '가수', count: 2, photoUrl: '/img/artist002.png' },
]

export const TASTE_DASHBOARD: TasteDashboard = {
  topGenre: '뮤지컬',
  curationMatchRate: 98,
}

// localStorage(noli_app_data_v2)에 저장/복원되는 초기 상태
export const DEFAULT_DATA: AppData = {
  user: {
    name: '소연',
    avatarUrl: '/img/soyeon.png',
    level: 12,
    titles: ['공연 애호가', '티켓 마스터'],
    favoriteGenreIcons: ['뮤지컬', '콘서트', '전시'],
    favoriteGenreExtraCount: 4,
  },

  userPreference: {
    favoriteGenres: [],
    favoriteMoods: [],
    favoriteArtistIds: [],
    updatedAt: null,
  },

  performances: [
    {
      id: 'perf_001',
      title: '뮤지컬 위키드',
      genre: '뮤지컬',
      mood: ['몰입되는', '감성적인'],
      matchRate: 94,
      posterUrl: '/img/wicked.jpg',
      period: '2026.09.15 - 10.20',
      venue: '블루스퀘어 신한카드홀',
      liked: false,
      status: null,
      // ---- 상세 화면(detail) 전용 필드 ----
      isRunning: true,
      tagline: "BROADWAY'S BIGGEST BLOCKBUSTER",
      tags: ['뮤지컬', '서울', '샤롯데씨어터'],
      recommendReason: {
        summary:
          '평소 판타지 장르와 여성 중심 서사를 즐기시는군요! 위키드는 엘파바와 글린다의 깊은 우정을 통해 압도적인 무대 매력을 선사할 거예요.',
        genrePreferenceLabel: '판타지 뮤지컬 카테고리 1위',
        trendingLabel: '최근 24시간 내 2,580명 찜',
      },
      runtimeText: '170분 (인터미션 20분 포함)',
      priceRangeText: 'VIP 170,000원 ~ B석 70,000원',
      synopsis:
        '도로시가 오즈에 떨어지기 훨씬 전, 그곳에서 만난 두 소녀의 이야기. 똑똑하지만 불 같은 성격에 초록색 피부를 가진 엘파바와 야망 가득하고 모두에게 사랑받는 글린다. 전혀 다른 두 마녀가 나누는 진한 우정과 운명적인 선택이 시작됩니다.',
      cast: [
        { name: '옥주현', role: '엘파바 역', photoUrl: null },
        { name: '정선아', role: '글린다 역', photoUrl: null },
        { name: '고은성', role: '피에로 역', photoUrl: null },
      ],
    },
    {
      id: 'perf_002',
      title: '내한 콘서트 Coldplay',
      genre: '콘서트',
      mood: ['에너지 넘치는', '몰입되는'],
      matchRate: 88,
      posterUrl: 'assets/images/coldplay.jpg',
      period: '2026.11.02 - 11.03',
      venue: '고척스카이돔',
      synopsis:
        '전 세계를 무대로 한 콜드플레이의 내한 공연. 대형 스타디움을 가득 채우는 웅장한 사운드와 화려한 조명 연출, 관객과 함께 만드는 떼창까지 — 잊지 못할 라이브 경험을 선사합니다.',
      liked: false,
      status: null,
    },
    {
      id: 'perf_003',
      title: '발레 호두까기 인형',
      genre: '댄스',
      mood: ['감성적인', '유쾌한'],
      matchRate: 81,
      posterUrl: 'assets/images/ballet.jpg',
      period: '2026.12.10 - 12.25',
      venue: '예술의전당 오페라극장',
      synopsis:
        '크리스마스 이브, 클라라가 선물 받은 호두까기 인형이 왕자로 변신하며 펼쳐지는 환상의 여정. 눈송이 왈츠와 꽃의 왈츠 등 차이콥스키의 아름다운 선율과 함께하는 겨울 시즌 대표 발레 공연입니다.',
      liked: false,
      status: null,
    },
    {
      id: 'perf_004',
      title: '클래식 필하모닉 갈라',
      genre: '클래식',
      mood: ['감성적인', '몰입되는'],
      matchRate: 76,
      posterUrl: 'assets/images/classic.jpg',
      period: '2026.10.05',
      venue: '롯데콘서트홀',
      synopsis:
        '국내외 필하모닉 오케스트라가 한자리에 모여 선사하는 스페셜 갈라 콘서트. 대중에게 친숙한 클래식 명곡부터 오케스트라의 웅장함을 느낄 수 있는 대편성 곡까지 다채로운 프로그램으로 구성됩니다.',
      liked: false,
      status: null,
    },
  ],

  // 이미 담긴 리스트 카운트를 시안(12개/24개)처럼 보여주기 위한 기준값
  // (실제 performances 배열 카운트에 이 기준값을 더해 표시)
  baseCounts: {
    wish: 12,
    watched: 24,
  },

  // play.html에서 "담기" 버튼을 누른 플레이리스트 id 목록
  savedPlaylistIds: [],

  // alarm.html에서 토글한 알람 시간 옵션 저장 (alertId -> { optionKey: boolean })
  alertReminders: {},

  // play.html의 플레이리스트 목록 (새 플레이리스트 만들기로 추가된 항목 포함)
  playlists: PLAYLISTS,

  // detail 페이지 방문 시 기록되는 최근 본 공연 id 목록 (최신순)
  recentlyViewedIds: [],
}
