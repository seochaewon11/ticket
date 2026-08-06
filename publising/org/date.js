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

  /* ---------- 초기 목데이터 ---------- */
  var DEFAULT_DATA = {
    /* 유저 프로필 (임시 고정값) */
    user: {
      name: '소연',
      avatarUrl: ''
    },

    /* 유저 취향 */
    userPreference: {
      favoriteGenres: [],
      favoriteMoods: [],
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
        posterUrl: 'img/wicked.jpg',
        period: '2026.09.15 - 10.20',
        venue: '블루스퀘어 신한카드홀',
        liked: false,
        status: null
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
    }
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

  /* ---------- 외부 공개 API ---------- */
  global.NoliData = {
    GENRE_OPTIONS: GENRE_OPTIONS,
    MOOD_OPTIONS: MOOD_OPTIONS,
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
    updatePreference: updatePreference
  };
})(window);
