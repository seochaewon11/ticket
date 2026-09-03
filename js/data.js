/* ==========================================================================
   NOLI - data.js
   앱 전역에서 사용하는 데이터(취향 설정, 공연, 아티스트 소식 등)를 관리합니다.
   추후 React로 전환하기 쉽도록, 모든 리스트는 id를 가진 객체의 배열로 구성합니다.
   ========================================================================== */

/** 로그인 상태 (실제 인증 없음, 화면 흐름 제어용 임시 세션 상태) */
const session = {
  isLoggedIn: false,
};

/** 사용자 취향 설정 상태 (취향설정 화면에서 갱신, 메인 화면에서 참조) */
const userPreference = {
  userName: "소연",
  userGreetingName: "채원",
  step: 2,
  totalSteps: 3,
  selectedCategories: ["concert", "classic"], // categoryOptions.id 참조
  selectedMoods: ["warm"],                    // moodOptions.id 참조
  selectedArtists: ["parkhaeil"],             // artistOptions.id 참조
  completed: false, // false면 스플래시 이후 취향설정 화면으로, true면 메인으로 바로 이동
};

/** 취향설정 - 공연 카테고리 옵션 */
const categoryOptions = [
  { id: "concert", label: "콘서트", iconType: "mic" },
  { id: "musical", label: "뮤지컬", iconType: "mask" },
  { id: "band", label: "밴드", iconType: "vinyl" },
  { id: "dance", label: "댄스", iconType: "dance" },
  { id: "classic", label: "클래식", iconType: "note" },
  { id: "exhibit", label: "전시", iconType: "palette" },
];

/** 취향설정 - 분위기 옵션 */
const moodOptions = [
  { id: "emotional", label: "감성적인" },
  { id: "warm", label: "다정한" },
  { id: "romantic", label: "로맨틱" },
  { id: "sad", label: "슬픈" },
  { id: "beautiful", label: "아름다운" },
];

/** 취향설정 - 아티스트 검색용 데이터 */
const artistOptions = [
  { id: "leejoonyoung", name: "이준영", theme: "artist-1" },
  { id: "johseungwoo", name: "조승우", theme: "artist-2" },
  { id: "leehonggi", name: "이홍기", theme: "artist-3" },
  { id: "kimjunsu", name: "김준수", theme: "artist-4" },
  { id: "v", name: "뷔", theme: "artist-5" },
  { id: "parkhaeil", name: "박해일", theme: "artist-6" },
  { id: "taeyeon", name: "태연", theme: "artist-7" },
];

/** 메인 화면 - 히어로 및 맞춤 추천 공연 데이터 */
const performances = [
  {
    id: "wicked-2026",
    title: "위키드(Wicked)",
    category: "musical",
    theme: "wicked", // 이미지 플레이스홀더 테마 키
    rating: 4.8,
    duration: "2h 14m",
    dateRange: "2026.08.08-10.20",
    venue: "블루스퀘어 신한카드홀",
    ticketRank: 1,
    matchRate: 95,
    tags: ["감동적인", "뮤지컬영화", "연인과함께"],
    isLiked: false,
    isHero: true,
    // 상세화면 전용 필드
    matchReasonHtml: "평소 <em>판타지 장르</em>와 <em>여성 중심 서사</em>를 즐기시는군요! 위키드는 엘파바와 글린다의 깊은 우정을 통해 압도적인 무대 매력을 선사할 거예요.",
    genrePreferenceText: "판타지 뮤지컬 카테고리 1위",
    trendingText: "최근 24시간 내 2,580명 찜",
    period: "2026.10.05 ~ 2026.12.15",
    runningTime: "170분 (인터미션 20분 포함)",
    priceRange: "VIP 170,000원 ~ B석 70,000원",
    synopsis: "도로시가 오즈에 떨어지기 훨씬 전, 그곳에서 만난 두 소녀의 이야기. 똑똑하지만 불같은 성격에 초록색 피부를 가진 엘파바와 야망 가득하고 모두에게 사랑받는 글린다. 전혀 다른 두 마녀가 나누는 진한 우정과 운명적인 선택이 시작됩니다. 글린다는 노래를 부르며 하늘로 떠난 엘파바를 그리워하고, 둘의 이야기는 오즈의 전설이 됩니다.",
    castList: [
      { name: "옥주현", role: "엘파바 역", theme: "artist-6" },
      { name: "정선아", role: "글린다 역", theme: "artist-7" },
      { name: "고은성", role: "피에로 역", theme: "" },
    ],
  },
  {
    id: "marie-curie",
    title: "마리 퀴리",
    category: "musical",
    theme: "marie-curie",
    dateRange: "JUNE - 28 JULY 2024",
    venue: "CHARING CROSS THEATRE",
    matchRate: 90,
    isLiked: false,
    isHero: false,
  },
  {
    id: "beetlejuice",
    title: "비틀쥬스",
    category: "musical",
    theme: "beetlejuice",
    dateRange: "",
    venue: "",
    matchRate: 80,
    isLiked: false,
    isHero: false,
  },
];

/** 메인 화면 - 좋아하는 아티스트 공연 소식 */
const artistNews = [
  {
    id: "deathnote-kimjunsu",
    artistName: "김준수",
    theme: "deathnote",
    dDay: 20,
    title: "데스노트",
    date: "2026.08.28",
    venue: "서울콘서트홀",
    isLiked: false,
    alarmSet: false,
  },
  {
    id: "chicago-choijaerim",
    artistName: "최재림",
    theme: "chicago",
    dDay: 30,
    title: "시카고",
    date: "2026.09.28",
    venue: "서울콘서트홀",
    isLiked: false,
    alarmSet: false,
  },
  {
    id: "elizabeth-okjoohyun",
    artistName: "옥주현",
    theme: "elizabeth",
    dDay: 30,
    title: "엘리자벳",
    date: "2026.08.28",
    venue: "서울콘서트홀",
    isLiked: false,
    alarmSet: false,
  },
];

/** 메인 화면 - 이달의 추천 공연 (하단 그라데이션 박스) */
const monthlyPicks = [
  {
    id: "pick-seoul-phil-1",
    category: "클래식",
    theme: "orchestra",
    date: "10.25(수)",
    title: "서울시립교향악단 정기공연",
    venue: "예술의전당 콘서트홀",
  },
  {
    id: "pick-bts-daejeon",
    category: "콘서트",
    theme: "bts",
    date: "10.25(수)",
    title: "BTS 대전콘서트",
    venue: "예술의전당 콘서트홀",
  },
  {
    id: "pick-seoul-phil-2",
    category: "클래식",
    theme: "orchestra",
    date: "10.25(수)",
    title: "서울시립교향악단 정기공연",
    venue: "예술의전당 콘서트홀",
  },
];

/* ---------- 캘린더 ---------- */
/** 달력에 점으로 표시할 날짜 (yyyy-mm-dd, 색상은 dot 값으로 구분) */
const calendarMarkers = [
  { date: "2026-08-05", dot: "danger" },
  { date: "2026-08-12", dot: "purple" },
  { date: "2026-08-12", dot: "danger" },
  { date: "2026-08-18", dot: "purple" },
  { date: "2026-08-25", dot: "gray" },
];

/** 티켓 오픈 알람 카드 목록 */
const ticketAlarms = [
  { id: "alarm-phantom", dday: 3, title: "뮤지컬 '오페라의 유령'", datetime: "10.18 (수) 오후 2:00", urgent: true },
  { id: "alarm-dracula", dday: 10, title: "뮤지컬 '드라큘라'", datetime: "10.18 (수) 오후 2:00", urgent: false },
  { id: "alarm-chicago", dday: 10, title: "뮤지컬 '시카고'", datetime: "10.18 (수) 오후 2:00", urgent: false },
];

/** 캘린더 화면 - 예정된 공연 목록 (메인의 monthlyPicks와 유사한 구조 재사용) */
const upcomingShows = [
  { id: "up-1", category: "클래식", theme: "orchestra", date: "10.25(수)", title: "서울시립교향악단 정기공연", venue: "예술의전당 콘서트홀" },
  { id: "up-2", category: "클래식", theme: "orchestra", date: "10.25(수)", title: "서울시립교향악단 정기공연", venue: "예술의전당 콘서트홀" },
  { id: "up-3", category: "클래식", theme: "orchestra", date: "10.25(수)", title: "서울시립교향악단 정기공연", venue: "예술의전당 콘서트홀" },
];

/* ---------- 알람설정 ---------- */
/** 알람설정 화면에서 다루는 대상 공연 (임의의 단독 판매 공연) */
const alarmTarget = {
  id: "magic-forest",
  title: "뮤지컬 <마법의 숲 이야기>",
  theme: "magic-forest",
  tags: ["뮤지컬", "단독판매"],
  datetime: "2026.11.24 (금) 오후 2:00",
};

/** 알람 시점 토글 옵션 (설정 상태는 여기서 직접 관리) */
const alarmOptions = [
  { id: "24h", label: "24시간 전", checked: true },
  { id: "10h", label: "10시간 전", checked: false },
  { id: "1h", label: "1시간 전", checked: false },
];

/* ---------- 보관함 ---------- */
const savedShows = [
  { id: "saved-1", category: "뮤지컬", title: "드라큘라", theme: "dracula" },
  { id: "saved-2", category: "뮤지컬", title: "드라큘라", theme: "dracula" },
  { id: "saved-3", category: "뮤지컬", title: "드라큘라", theme: "dracula" },
  { id: "saved-4", category: "뮤지컬", title: "드라큘라", theme: "dracula" },
  { id: "saved-5", category: "뮤지컬", title: "드라큘라", theme: "dracula" },
  { id: "saved-6", category: "뮤지컬", title: "드라큘라", theme: "dracula" },
  { id: "saved-7", category: "뮤지컬", title: "드라큘라", theme: "dracula" },
  { id: "saved-8", category: "뮤지컬", title: "드라큘라", theme: "dracula" },
  { id: "saved-9", category: "뮤지컬", title: "드라큘라", theme: "dracula" },
];

const recentlyViewed = [
  { id: "recent-1", category: "뮤지컬", title: "드라큘라", theme: "dracula" },
  { id: "recent-2", category: "콘서트", title: "시카고", theme: "chicago" },
  { id: "recent-3", category: "뮤지컬", title: "비더슈틴트", theme: "beetlejuice" },
  { id: "recent-4", category: "공연", title: "빨래", theme: "ppallae" },
  { id: "recent-5", category: "공연", title: "프랑켄슈타인", theme: "frankenstein" },
  { id: "recent-6", category: "뮤지컬", title: "레베카", theme: "rebecca" },
  { id: "recent-7", category: "콘서트", title: "태연", theme: "taeyeon" },
  { id: "recent-8", category: "콘서트", title: "드라큘라", theme: "dracula" },
  { id: "recent-9", category: "콘서트", title: "드라큘라", theme: "dracula" },
];

/* ---------- 리포트 ---------- */
const viewingTrend = [
  { month: "9월", count: 4 },
  { month: "10월", count: 7 },
  { month: "11월", count: 8 },
  { month: "12월", count: 7 },
  { month: "1월", count: 4 },
  { month: "2월", count: 12 },
];

const genreDistribution = [
  { label: "뮤지컬", percent: 45, color: "#5B6CF0" },
  { label: "콘서트", percent: 30, color: "#F5A623" },
  { label: "음악회", percent: 25, color: "#E0355B" },
];

const topArtists = [
  { rank: 1, name: "김준수", role: "뮤지컬 배우", count: 4, theme: "artist-4" },
  { rank: 2, name: "박해일", role: "뮤지컬,영화배우", count: 4, theme: "artist-6" },
  { rank: 3, name: "이홍기", role: "뮤지컬 배우", count: 3, theme: "artist-3" },
  { rank: 4, name: "태연", role: "콘서트 아티스트", count: 2, theme: "artist-7" },
];

/* ---------- 프로필 ---------- */
const memoryList = [
  { id: "memory-1", title: "오페라의 유령", theme: "opera-ghost", date: "23.10.15" },
  { id: "memory-2", title: "오페라의 유령", theme: "opera-ghost", date: "23.10.15" },
  { id: "memory-3", title: "오페라의 유령", theme: "opera-ghost", date: "23.10.15" },
  { id: "memory-4", title: "오페라의 유령", theme: "opera-ghost", date: "23.10.15" },
];

const profileMenu = [
  { id: "edit-preference", label: "취향 프로필 수정", iconType: "edit" },
  { id: "settings", label: "설정", iconType: "settings" },
  { id: "support", label: "고객센터", iconType: "support" },
  { id: "terms", label: "공지사항 및 약관", iconType: "info" },
];

/* 브라우저 전역에서 화면별 js가 접근할 수 있도록 노출 (모듈 번들러 도입 전 임시 방식) */
window.NOLI_DATA = {
  session,
  userPreference,
  categoryOptions,
  moodOptions,
  artistOptions,
  performances,
  artistNews,
  monthlyPicks,
  calendarMarkers,
  ticketAlarms,
  upcomingShows,
  alarmTarget,
  alarmOptions,
  savedShows,
  recentlyViewed,
  viewingTrend,
  genreDistribution,
  topArtists,
  memoryList,
  profileMenu,
};
