/* ==========================================================================
   NOLI - main.js
   메인 화면 렌더링 및 인터랙션(좋아요, 알람설정 토글 등)을 담당합니다.
   ========================================================================== */

const NOLI_MAIN = (() => {
  const { userPreference, performances, artistNews, monthlyPicks } = window.NOLI_DATA;

  /* ---------- 아이콘 (inline SVG, currentColor 사용) ---------- */
  const ICONS = {
    heart: (filled) =>
      `<svg viewBox="0 0 24 24" fill="${filled ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2"><path d="M12 21s-7.5-4.6-10-9.3C.6 8.4 2.1 5 5.6 5c2 0 3.4 1.1 4.4 2.6C11 6.1 12.4 5 14.4 5c3.5 0 5 3.4 3.6 6.7-2.5 4.7-10 9.3-10 9.3Z"/></svg>`,
    star: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l2.9 6.3 6.9.7-5.2 4.6 1.6 6.8L12 17.6l-6.2 3.3 1.6-6.8L2.2 9.5l6.9-.7L12 2.5Z"/></svg>`,
    plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`,
    search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>`,
    share: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8 15.8 6.7M8.2 13.2l7.6 4.1"/></svg>`,
    pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.3"/></svg>`,
    home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9.5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V10"/></svg>`,
    compass: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="m14.8 9.2-1.6 4.8-4.8 1.6 1.6-4.8 4.8-1.6Z"/></svg>`,
    sparkle: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c.5 3.6 1.9 5 5.5 5.5-3.6.5-5 1.9-5.5 5.5-.5-3.6-1.9-5-5.5-5.5C10.1 7 11.5 5.6 12 2Z"/><path d="M19 14c.3 1.8 1 2.5 2.8 2.8-1.8.3-2.5 1-2.8 2.8-.3-1.8-1-2.5-2.8-2.8 1.8-.3 2.5-1 2.8-2.8Z"/></svg>`,
    chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19V10M12 19V5M19 19v-6"/></svg>`,
    user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.2-3.6 4-5.5 7-5.5s5.8 1.9 7 5.5"/></svg>`,
  };

  /* ---------- 렌더 함수 ---------- */

  function renderHero() {
    const hero = performances.find((p) => p.isHero);
    if (!hero) return "";

    const tagsHtml = hero.tags
      .map((tag) => `<span class="pill pill--outline">${tag}</span>`)
      .join("");

    return `
      <section class="hero">
        <div class="hero-media">
          <div class="img-ph" data-theme="${hero.theme}">
            <span class="watermark">${hero.title.split("(")[0].trim()}</span>
          </div>
          <button class="icon-btn icon-btn--float hero-like-btn ${hero.isLiked ? "is-active" : ""}"
            data-action="toggle-like" data-type="performance" data-id="${hero.id}"
            aria-label="찜하기">
            ${ICONS.heart(hero.isLiked)}
          </button>
        </div>
        <div class="hero-info">
          <div class="hero-meta-row">
            <span class="pill pill--gray pill--rating">${ICONS.star} ${hero.rating.toFixed(1)}</span>
            <span class="pill pill--gray">${hero.duration}</span>
            <span class="pill pill--gray">현재예매율 ${hero.ticketRank}위</span>
          </div>
          <h1 class="hero-title">${hero.title}</h1>
          <p class="hero-schedule">${hero.dateRange} ${hero.venue}</p>
          <div class="hero-match">
            <span class="pill pill--purple">내 취향 일치 ${hero.matchRate}%</span>
          </div>
          <div class="hero-tags">${tagsHtml}</div>
        </div>
      </section>
    `;
  }

  function renderRecommendCarousel() {
    const items = performances
      .filter((p) => !p.isHero)
      .map(
        (p) => `
        <div class="reco-card">
          <div class="img-ph" data-theme="${p.theme}"></div>
          <div class="reco-card-body">
            <p class="reco-card-title">${p.title}</p>
            <span class="pill pill--purple">내 취향 일치 ${p.matchRate}%</span>
            ${p.venue ? `<p class="reco-card-sub">${p.dateRange} ${p.venue}</p>` : ""}
          </div>
        </div>`
      )
      .join("");

    return `
      <section class="section">
        <div class="section-head">
          <h2 class="section-title"><strong>${userPreference.userName}</strong> 님의 취향에 맞게<br>NOLI가 찾은 맞춤 공연들</h2>
          <div class="section-actions">
            <button class="icon-btn" aria-label="더 찾기">${ICONS.plus}</button>
            <button class="icon-btn" aria-label="검색">${ICONS.search}</button>
          </div>
        </div>
        <div class="scroll-x">${items}</div>
      </section>
    `;
  }

  function renderArtistNews() {
    const items = artistNews
      .map(
        (a) => `
        <article class="artist-card card">
          <div class="artist-card-media">
            <div class="img-ph" data-theme="${a.theme}"></div>
            <div class="artist-card-actions">
              <button class="icon-btn icon-btn--float" aria-label="공유하기">${ICONS.share}</button>
              <button class="icon-btn icon-btn--float ${a.isLiked ? "is-active" : ""}"
                data-action="toggle-like" data-type="artist" data-id="${a.id}"
                aria-label="찜하기">${ICONS.heart(a.isLiked)}</button>
            </div>
          </div>
          <div class="artist-card-body">
            <div class="artist-card-badges">
              <span class="pill pill--purple">${a.artistName}</span>
              <span class="pill pill--outline">D-${a.dDay}</span>
            </div>
            <h3 class="artist-card-title">${a.title}</h3>
            <p class="artist-card-sub">${a.date} | ${a.venue}</p>
            <button class="btn btn--outline ${a.alarmSet ? "is-active" : ""}"
              data-action="toggle-alarm" data-id="${a.id}">
              ${a.alarmSet ? "알람설정 완료" : "알람설정하기"}
            </button>
          </div>
        </article>`
      )
      .join("");

    return `
      <section class="section">
        <div class="section-head">
          <h2 class="section-title"><strong>${userPreference.userName}</strong>님이 좋아하는<br>아티스트 공연소식</h2>
          <div class="section-actions">
            <button class="icon-btn" aria-label="더 찾기">${ICONS.plus}</button>
            <button class="icon-btn" aria-label="검색">${ICONS.search}</button>
          </div>
        </div>
        ${items}
      </section>
    `;
  }

  function renderMonthlyPicks() {
    const items = monthlyPicks
      .map(
        (m) => `
        <div class="monthly-item">
          <div class="monthly-item-thumb img-ph" data-theme="${m.theme}"></div>
          <div class="monthly-item-body">
            <div class="monthly-item-meta">
              <span class="pill pill--pink">${m.category}</span>
              <span class="monthly-item-date">${m.date}</span>
            </div>
            <p class="monthly-item-title">${m.title}</p>
            <p class="monthly-item-venue">${ICONS.pin} ${m.venue}</p>
          </div>
        </div>`
      )
      .join("");

    return `
      <div class="monthly-box">
        <div class="monthly-box-head">
          <h2 class="monthly-box-title">NOLI의 이달의 추천 공연들</h2>
          <button class="icon-btn" aria-label="더 보기">${ICONS.plus}</button>
        </div>
        <div class="monthly-list">${items}</div>
      </div>
    `;
  }

  function renderBottomNav() {
    return `
      <nav class="bottom-nav">
        <button class="nav-item is-active">${ICONS.home}<span>홈</span></button>
        <button class="nav-item">${ICONS.compass}<span>브로드</span></button>
        <button class="nav-item nav-item--center" aria-label="빠른 추천">
          <span class="nav-center-btn">${ICONS.sparkle}</span>
        </button>
        <button class="nav-item">${ICONS.chart}<span>리포트</span></button>
        <button class="nav-item">${ICONS.user}<span>프로필</span></button>
      </nav>
    `;
  }

  /* ---------- 초기화 & 이벤트 바인딩 ---------- */

  function render() {
    const root = document.getElementById("screen-main");
    if (!root) return;

    root.innerHTML = `
      <header class="main-header"><span class="logo">NOLI</span></header>
      ${renderHero()}
      ${renderRecommendCarousel()}
      ${renderArtistNews()}
      ${renderMonthlyPicks()}
      ${renderBottomNav()}
    `;

    bindEvents(root);
  }

  function bindEvents(root) {
    root.addEventListener("click", (e) => {
      const likeBtn = e.target.closest('[data-action="toggle-like"]');
      if (likeBtn) {
        toggleLike(likeBtn.dataset.type, likeBtn.dataset.id);
        return;
      }
      const alarmBtn = e.target.closest('[data-action="toggle-alarm"]');
      if (alarmBtn) {
        toggleAlarm(alarmBtn.dataset.id);
      }
    });
  }

  function toggleLike(type, id) {
    const list = type === "performance" ? performances : artistNews;
    const item = list.find((i) => i.id === id);
    if (!item) return;
    item.isLiked = !item.isLiked;
    render();
  }

  function toggleAlarm(id) {
    const item = artistNews.find((i) => i.id === id);
    if (!item) return;
    item.alarmSet = !item.alarmSet;
    render();
  }

  return { render };
})();

document.addEventListener("DOMContentLoaded", () => {
  NOLI_ROUTER.showScreen("main");
  NOLI_MAIN.render();
});
