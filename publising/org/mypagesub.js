/* ============================================
   NOLI - data.js
   공통 데이터 정의 + localStorage 연동 로직
   (React 전환을 고려해 순수 데이터 배열 + 순수 함수로 구성)
   ============================================ */

(function (global) {
  'use strict';

  /* ---------- localStorage Key ---------- */
  var STORAGE_KEY = 'noli_app_data';

  /* ---------- 취향설정 화면(add.html)에서 사용하는 선택 옵션 ---------- */
  /* React 전환 시에도 동일한 옵션 소스를 재사용할 수 있도록 데이터로 정의 */
  var GENRE_OPTIONS = [
    { key: '콘서트', icon: '🎤', color: 'purple' },
    { key: '뮤지컬', icon: '🎭', color: 'pink' },
    { key: '밴드', icon: '💿', color: 'tan' },
    { key: '댄스', icon: '🕺', color: 'purple' },
    { key: '클래식', icon: '🎵', color: 'tan' },
    { key: '전시', icon: '🎨', color: 'pink' }
  ];

  var MOOD_OPTIONS = ['에너지 넘치는', '감성적인', '유쾌한', '몰입되는'];

  /* ---------- 설정완료 화면(complete.html)의 TASTE ANALYSIS 해시태그 매핑 ---------- */
  var MOOD_TAG_MAP = {
    '에너지 넘치는': '#에너지충만',
    '감성적인': '#감성적인',
    '유쾌한': '#유쾌한',
    '몰입되는': '#몰입감최고'
  };

  var GENRE_TAG_MAP = {
    '콘서트': '#라이브공연',
    '뮤지컬': '#뮤지컬덕후',
    '밴드': '#밴드홀릭',
    '댄스': '#댄스러버',
    '클래식': '#클래식애호가',
    '전시': '#전시덕후'
  };

  var DEFAULT_TASTE_TAGS = ['#감성적인', '#뮤지컬덕후', '#라이브공연'];

  /* ---------- 공연 플레이리스트 화면(play.html)에서 사용하는 데이터 ---------- */
  var PLAYLISTS = [
    {
      id: 'playlist_001',
      title: '보고 싶은 뮤지컬',
      tagline: '"언젠가 꼭 맨 앞줄에서 보고 싶은 작품들!"',
      likeCount: 12,
      accentColor: '#5B3E9E',
      buttonBg: '#7C5CFC',
      collaboratorColors: ['#C9B8FB', '#F0A6B8'],
      coverGradient: 'linear-gradient(180deg, #2A1B12 0%, #5C3A22 45%, #1A1210 100%), radial-gradient(circle at 50% 30%, rgba(255,214,140,0.55), transparent 55%)'
    },
    {
      id: 'playlist_002',
      title: '올해 꼭 갈 콘서트',
      tagline: '"티켓팅 성공 기원! 내 가수들 다 만나기 🔥"',
      likeCount: 8,
      accentColor: '#8B4A1F',
      buttonBg: '#7A4B2A',
      collaboratorColors: ['#F6C9C0'],
      coverGradient: 'linear-gradient(180deg, #120E24 0%, #2C1F4A 50%, #120E24 100%), radial-gradient(circle at 30% 70%, rgba(180,120,255,0.5), transparent 55%), radial-gradient(circle at 75% 35%, rgba(255,120,180,0.4), transparent 50%)'
    },
    {
      id: 'playlist_003',
      title: '혼자 보고 싶은 공연',
      tagline: '"오롯이 무대에 집중하고 싶은 날들을 위해 🕯️"',
      likeCount: 5,
      accentColor: '#3A3A45',
      buttonBg: '#3A3A45',
      collaboratorColors: ['#A78BFA'],
      coverGradient: 'linear-gradient(180deg, #1C140F 0%, #3C2A1D 55%, #14100D 100%), radial-gradient(circle at 65% 55%, rgba(255,190,120,0.35), transparent 50%)'
    }
  ];

  /* 최근 본 공연 추천 (performances와 별개의 가벼운 목데이터) */
  var RECENTLY_VIEWED = [
    { id: 'recent_001', title: '라 트라비아타', venue: '예술의전당', posterUrl: 'assets/images/traviata.jpg' },
    { id: 'recent_002', title: '위키드', venue: '샤롯데씨어터', posterUrl: 'assets/images/Wicked.jpg' }
  ];

  /* ---------- 공연 일정 화면(calendar.html)에서 사용하는 데이터 ---------- */
  /* 날짜별 이벤트 dot 표시용 (YYYY-MM-DD 기준, type에 따라 dot 색상만 다르게) */
  var CALENDAR_EVENT_DATES = [
    { date: '2026-10-05', type: 'pink' },
    { date: '2026-10-12', type: 'multi' },   // 점 2개 (여러 이벤트)
    { date: '2026-10-18', type: 'primary' },
    { date: '2026-10-25', type: 'gray' }
  ];

  var TICKET_OPEN_ALERTS = [
    {
      id: 'alert_001',
      title: "뮤지컬 '오페라의 유령'",
      dDay: 3,
      scheduleText: '10.18 (수) 오후 2:00',
      theme: 'primary',
      /* ---- 알람 설정 화면(alarm.html) 전용 필드 ---- */
      posterUrl: 'assets/images/phantom.jpg',
      genreTags: ['뮤지컬', '단독판매'],
      dateText: '2026.10.18 (수)',
      timeText: '오후 2:00',
      reminderOptions: [
        { key: '24h', label: '24시간 전', enabled: true },
        { key: '1h', label: '1시간 전', enabled: true },
        { key: '30m', label: '30분 전', enabled: false },
        { key: '10m', label: '10분 전', enabled: false }
      ]
    },
    {
      id: 'alert_002',
      title: "콘서트 '가을 재즈나이트'",
      dDay: 7,
      scheduleText: '10.22 (일) 오후 7:00',
      theme: 'muted',
      /* ---- 알람 설정 화면(alarm.html) 전용 필드 ---- */
      posterUrl: 'assets/images/jazznight.jpg',
      genreTags: ['콘서트', '얼리버드'],
      dateText: '2026.10.22 (일)',
      timeText: '오후 7:00',
      reminderOptions: [
        { key: '24h', label: '24시간 전', enabled: false },
        { key: '1h', label: '1시간 전', enabled: false },
        { key: '30m', label: '30분 전', enabled: false },
        { key: '10m', label: '10분 전', enabled: false }
      ]
    }
  ];

  var UPCOMING_PERFORMANCES = [
    {
      id: 'upcoming_001',
      title: '서울시립교향악단 정기공연',
      genreTag: '클래식',
      dateText: '10.25 (일)',
      venue: '예술의전당 콘서트홀',
      posterUrl: 'assets/images/philharmonic.jpg'
    },
    {
      id: 'upcoming_002',
      title: '가을 밤의 어쿠스틱',
      genreTag: '인디',
      dateText: '11.02 (월)',
      venue: '블루스퀘어 마스터카드홀',
      posterUrl: 'assets/images/acoustic.jpg'
    }
  ];

  /* ---------- 마이페이지(mypage.html)에서 사용하는 데이터 ---------- */
  var TASTE_DASHBOARD = {
    topGenre: '뮤지컬',
    curationMatchRate: 98
  };

  var MEMORY_PERFORMANCES = [
    {
      id: 'memory_001',
      title: '오페라의 유령',
      venue: '블루스퀘어 신한카드홀',
      viewedDateLabel: '23.10.15',
      posterUrl: 'assets/images/phantom.jpg'
    },
    {
      id: 'memory_002',
      title: '레베카',
      venue: '충무아트센터 대극장',
      viewedDateLabel: '23.09.28',
      posterUrl: 'assets/images/rebecca.jpg'
    }
  ];

  /* ---------- 관심 아티스트 선택 화면(artist.html)에서 사용하는 아티스트 목록 ---------- */
  var ARTISTS = [
    { id: 'artist_001', name: '조승우', photoUrl: 'assets/images/artists/josw.jpg' },
    { id: 'artist_002', name: '홍광호', photoUrl: 'assets/images/artists/honggh.jpg' },
    { id: 'artist_003', name: '박지연', photoUrl: 'assets/images/artists/parkjy.jpg' },
    { id: 'artist_004', name: '김준수', photoUrl: 'assets/images/artists/kimjs.jpg' },
    { id: 'artist_005', name: '옥주현', photoUrl: 'assets/images/artists/okjh.jpg' },
    { id: 'artist_006', name: '정선아', photoUrl: 'assets/images/artists/jungsa.jpg' }
  ];

  /* ---------- 초기 목데이터 ---------- */
  var DEFAULT_DATA = {
    /* 유저 프로필 */
    user: {
      name: '김노리',
      avatarUrl: 'assets/images/user-avatar.jpg',
      level: 12,
      titles: ['공연 애호가', '티켓 마스터'],
      favoriteGenreIcons: ['뮤지컬', '콘서트', '전시'],
      favoriteGenreExtraCount: 4
    },

    /* 유저 취향 */
    userPreference: {
      favoriteGenres: [],
      favoriteMoods: [],
      favoriteArtistIds: [],
      updatedAt: null
    },

    /* 공연 데이터 배열 */
    performances: [
      {
        id: 'perf_001',
        title: '뮤지컬 위키드',
        genre: '뮤지컬',
        mood: ['몰입되는', '감성적인'],
        matchRate: 94,
        posterUrl: 'assets/images/Wicked.jpg',
        period: '2026.09.15 - 10.20',
        venue: '블루스퀘어 신한카드홀',
        liked: false,
        status: null,
        /* ---- 상세 화면(detail.html) 전용 필드 ---- */
        isRunning: true,
        tagline: "BROADWAY'S BIGGEST BLOCKBUSTER",
        tags: ['뮤지컬', '서울', '샤롯데씨어터'],
        recommendReason: {
          summary: '평소 판타지 장르와 여성 중심 서사를 즐기시는군요! 위키드는 엘파바와 글린다의 깊은 우정을 통해 압도적인 무대 매력을 선사할 거예요.',
          genrePreferenceLabel: '판타지 뮤지컬 카테고리 1위',
          trendingLabel: '최근 24시간 내 2,580명 찜'
        },
        runtimeText: '170분 (인터미션 20분 포함)',
        priceRangeText: 'VIP 170,000원 ~ B석 70,000원',
        synopsis: '도로시가 오즈에 떨어지기 훨씬 전, 그곳에서 만난 두 소녀의 이야기. 똑똑하지만 불 같은 성격에 초록색 피부를 가진 엘파바와 야망 가득하고 모두에게 사랑받는 글린다. 전혀 다른 두 마녀가 나누는 진한 우정과 운명적인 선택이 시작됩니다.',
        cast: [
          { name: '옥주현', role: '엘파바 역', photoUrl: 'assets/images/cast/ok.jpg' },
          { name: '정선아', role: '글린다 역', photoUrl: 'assets/images/cast/jung.jpg' },
          { name: '고은성', role: '피에로 역', photoUrl: null }
        ]
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
        liked: false,
        status: null
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
        liked: false,
        status: null
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
        liked: false,
        status: null
      }
    ],

    /* 이미 담긴 리스트 카운트를 시안(12개/24개)처럼 보여주기 위한 기준값
       (실제 performances 배열 카운트에 이 기준값을 더해 표시) */
    baseCounts: {
      wish: 12,
      watched: 24
    },

    /* play.html에서 "담기" 버튼을 누른 플레이리스트 id 목록 */
    savedPlaylistIds: [],

    /* alarm.html에서 토글한 알람 시간 상태 (alertId -> { optionKey: boolean }) */
    alertReminders: {}
  };

  /* ---------- 내부 상태 (메모리 캐시) ---------- */
  var state = null;

  /* ---------- 저수준 유틸 ---------- */
  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function loadFromStorage() {
    try {
      var raw = global.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.warn('[NOLI data] localStorage 읽기 실패:', e);
      return null;
    }
  }

  function persist() {
    try {
      global.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('[NOLI data] localStorage 저장 실패:', e);
    }
  }

  /* ---------- 초기화 ---------- */
  function init() {
    if (state) return state;
    var stored = loadFromStorage();
    state = stored || clone(DEFAULT_DATA);
    // 이전 버전 저장 데이터에 새 필드가 없을 경우를 대비한 방어적 병합
    if (!state.baseCounts) state.baseCounts = clone(DEFAULT_DATA.baseCounts);
    if (!state.savedPlaylistIds) state.savedPlaylistIds = [];
    if (!state.alertReminders) state.alertReminders = {};
    if (!state.userPreference) state.userPreference = clone(DEFAULT_DATA.userPreference);
    if (!state.user) state.user = clone(DEFAULT_DATA.user);
    persist();
    return state;
  }

  /* ---------- Getter ---------- */
  function getData() {
    init();
    return state;
  }

  function getUser() {
    return getData().user;
  }

  function getPerformances() {
    return getData().performances;
  }

  function getPerformanceById(id) {
    return getPerformances().find(function (p) { return p.id === id; }) || null;
  }

  function getUserPreference() {
    return getData().userPreference;
  }

  /* 취향 매칭 기준 정렬된 추천 리스트 (matchRate 내림차순) */
  function getRecommendedPerformances() {
    var list = getPerformances().slice();
    list.sort(function (a, b) { return b.matchRate - a.matchRate; });
    return list;
  }

  /* "보고 싶은 공연" 개수 = 기준값 + 실제 위시 상태 카운트 */
  function getWishCount() {
    var data = getData();
    var actual = data.performances.filter(function (p) { return p.status === 'wish'; }).length;
    return data.baseCounts.wish + actual;
  }

  /* "관람 완료 공연" 개수 = 기준값 + 실제 완료 상태 카운트 */
  function getWatchedCount() {
    var data = getData();
    var actual = data.performances.filter(function (p) { return p.status === 'watched'; }).length;
    return data.baseCounts.watched + actual;
  }

  /* ---------- Setter (순수 액션 함수) ---------- */

  /* 좋아요(하트) 토글 */
  function toggleLike(id) {
    var data = getData();
    var target = data.performances.find(function (p) { return p.id === id; });
    if (!target) return null;
    target.liked = !target.liked;
    persist();
    return target;
  }

  /* 보고싶은 공연(보관함)에 담기 */
  function addToWishlist(id) {
    var data = getData();
    var target = data.performances.find(function (p) { return p.id === id; });
    if (!target) return null;
    target.status = 'wish';
    persist();
    return target;
  }

  /* 관람 완료로 상태 변경 */
  function markAsWatched(id) {
    var data = getData();
    var target = data.performances.find(function (p) { return p.id === id; });
    if (!target) return null;
    target.status = 'watched';
    persist();
    return target;
  }

  /* 취향(장르/분위기) 기준으로 각 공연의 matchRate를 재계산
     - 장르 일치: 기본 점수 60%
     - 분위기 겹치는 개수만큼 점수 가산 (겹치는 mood 1개당 +13, 최대 3개)
     - 최소 45 ~ 최대 99로 clamp */
  function recalculateMatchRates(preference) {
    var data = getData();
    var genres = preference.favoriteGenres || [];
    var moods = preference.favoriteMoods || [];

    data.performances.forEach(function (p) {
      var score = 45; // 기본 하한선
      if (genres.length === 0 && moods.length === 0) return; // 취향 미설정 시 기존 matchRate 유지

      if (genres.indexOf(p.genre) !== -1) {
        score += 40;
      }
      var overlap = p.mood.filter(function (m) { return moods.indexOf(m) !== -1; }).length;
      score += Math.min(overlap, 3) * 13;

      p.matchRate = Math.max(45, Math.min(99, score));
    });
  }

  /* 취향 설정 저장 (add.html에서 사용)
     저장과 동시에 추천 리스트 매칭율을 재계산하여
     메인 화면(index.html)에 즉시 반영되도록 한다 */
  function updatePreference(favoriteGenres, favoriteMoods) {
    var data = getData();
    data.userPreference = {
      favoriteGenres: favoriteGenres || [],
      favoriteMoods: favoriteMoods || [],
      updatedAt: new Date().toISOString()
    };
    recalculateMatchRates(data.userPreference);
    persist();
    return data.userPreference;
  }

  /* 관심 아티스트 선택 저장 (artist.html에서 사용) */
  function updateFavoriteArtists(artistIds) {
    var data = getData();
    data.userPreference.favoriteArtistIds = artistIds || [];
    data.userPreference.updatedAt = new Date().toISOString();
    persist();
    return data.userPreference;
  }

  /* 저장된 취향(mood/genre)을 기반으로 설정완료 화면용 해시태그 4개를 생성
     선택된 취향이 없으면 기본 목데이터 태그를 사용 */
  function generateTasteTags() {
    var pref = getUserPreference();
    var tags = [];

    (pref.favoriteMoods || []).forEach(function (m) {
      var tag = MOOD_TAG_MAP[m];
      if (tag && tags.indexOf(tag) === -1) tags.push(tag);
    });
    (pref.favoriteGenres || []).forEach(function (g) {
      var tag = GENRE_TAG_MAP[g];
      if (tag && tags.indexOf(tag) === -1) tags.push(tag);
    });

    var i = 0;
    while (tags.length < 3 && i < DEFAULT_TASTE_TAGS.length) {
      if (tags.indexOf(DEFAULT_TASTE_TAGS[i]) === -1) tags.push(DEFAULT_TASTE_TAGS[i]);
      i += 1;
    }
    tags = tags.slice(0, 3);
    tags.push('#취향저격'); // 항상 마지막에 붙는 고정 태그

    return tags;
  }

  /* ---------- 플레이리스트(play.html) 조회/토글 ---------- */
  function getPlaylists() {
    return PLAYLISTS;
  }

  function getRecentlyViewed() {
    return RECENTLY_VIEWED;
  }

  function isPlaylistSaved(playlistId) {
    return getData().savedPlaylistIds.indexOf(playlistId) !== -1;
  }

  function togglePlaylistSaved(playlistId) {
    var data = getData();
    var idx = data.savedPlaylistIds.indexOf(playlistId);
    if (idx === -1) {
      data.savedPlaylistIds.push(playlistId);
    } else {
      data.savedPlaylistIds.splice(idx, 1);
    }
    persist();
    return isPlaylistSaved(playlistId);
  }

  /* ---------- 공연 일정(calendar.html) 조회 ---------- */
  function getCalendarEventDates() {
    return CALENDAR_EVENT_DATES;
  }

  function getTicketOpenAlerts() {
    return TICKET_OPEN_ALERTS;
  }

  function getAlertById(alertId) {
    return TICKET_OPEN_ALERTS.find(function (a) { return a.id === alertId; }) || null;
  }

  /* 저장된 토글 상태를 반영해 알람 상세 데이터를 반환 (alarm.html에서 사용) */
  function getAlertWithReminderState(alertId) {
    var base = getAlertById(alertId);
    if (!base) return null;
    var saved = getData().alertReminders[alertId] || {};
    var merged = clone(base);
    merged.reminderOptions = base.reminderOptions.map(function (opt) {
      return {
        key: opt.key,
        label: opt.label,
        enabled: saved.hasOwnProperty(opt.key) ? saved[opt.key] : opt.enabled
      };
    });
    return merged;
  }

  /* 알람 시간 토글 (alarm.html) */
  function toggleAlertReminder(alertId, optionKey) {
    var data = getData();
    var base = getAlertById(alertId);
    if (!base) return null;

    if (!data.alertReminders[alertId]) data.alertReminders[alertId] = {};
    var savedForAlert = data.alertReminders[alertId];
    var baseOption = base.reminderOptions.find(function (o) { return o.key === optionKey; });
    var currentValue = savedForAlert.hasOwnProperty(optionKey) ? savedForAlert[optionKey] : (baseOption ? baseOption.enabled : false);

    savedForAlert[optionKey] = !currentValue;
    persist();
    return savedForAlert[optionKey];
  }

  function getUpcomingPerformances() {
    return UPCOMING_PERFORMANCES;
  }

  /* ---------- 마이페이지(mypage.html) 조회 ---------- */
  function getTasteDashboard() {
    return TASTE_DASHBOARD;
  }

  function getMemoryPerformances() {
    return MEMORY_PERFORMANCES;
  }

  /* ---------- 외부 공개 API ---------- */
  global.NoliData = {
    GENRE_OPTIONS: GENRE_OPTIONS,
    MOOD_OPTIONS: MOOD_OPTIONS,
    ARTISTS: ARTISTS,
    getData: getData,
    getUser: getUser,
    getPerformances: getPerformances,
    getPerformanceById: getPerformanceById,
    getUserPreference: getUserPreference,
    getRecommendedPerformances: getRecommendedPerformances,
    getWishCount: getWishCount,
    getWatchedCount: getWatchedCount,
    toggleLike: toggleLike,
    addToWishlist: addToWishlist,
    markAsWatched: markAsWatched,
    updatePreference: updatePreference,
    updateFavoriteArtists: updateFavoriteArtists,
    generateTasteTags: generateTasteTags,
    getPlaylists: getPlaylists,
    getRecentlyViewed: getRecentlyViewed,
    isPlaylistSaved: isPlaylistSaved,
    togglePlaylistSaved: togglePlaylistSaved,
    getCalendarEventDates: getCalendarEventDates,
    getTicketOpenAlerts: getTicketOpenAlerts,
    getAlertById: getAlertById,
    getAlertWithReminderState: getAlertWithReminderState,
    toggleAlertReminder: toggleAlertReminder,
    getUpcomingPerformances: getUpcomingPerformances,
    getTasteDashboard: getTasteDashboard,
    getMemoryPerformances: getMemoryPerformances
  };
})(window);
