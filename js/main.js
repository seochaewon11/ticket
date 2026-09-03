/* ==========================================================================
   NOLI - main.js
   메인 화면 렌더링 및 인터랙션(좋아요, 알람설정 토글 등)을 담당합니다.
   ========================================================================== */

const NOLI_MAIN = (() => {
  const { userPreference, performances, artistNews, monthlyPicks } = window.NOLI_DATA;
  const ICONS = NOLI_COMMON.ICONS;

  /* ---------- 렌더 함수 ---------- */

  function renderHero() {
    const hero = performances.find((p) => p.isHero);
    if (!hero) return "";

    const tagsHtml = hero.tags
      .map((tag) => `<span class="pill pill--outline">${tag}</span>`)
      .join("");

    return `
      <section class="hero">
        <div class="hero-media" data-action="open-detail" data-id="${hero.id}">
          <div class="img-ph" data-theme="${hero.theme}">
            <span class="watermark">${hero.title.split("(")[0].trim()}</span>
          </div>
          <button class="icon-btn icon-btn--float hero-like-btn ${hero.isLiked ? "is-active" : ""}"
            data-action="toggle-like" data-type="performance" data-id="${hero.id}"
            aria-label="찜하기">
            ${ICONS.heart(hero.isLiked)}
          </button>
        </div>
        <div class="hero-info" data-action="open-detail" data-id="${hero.id}">
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

  /* 하단 탭바는 공통 컴포넌트(NOLI_COMMON.renderBottomNav)를 사용합니다. */

  /* ---------- 초기화 & 이벤트 바인딩 ---------- */

  function render() {
    const root = document.getElementById("screen-main");
    if (!root) return;

    root.innerHTML = `
      ${NOLI_COMMON.renderHeader()}
      ${renderHero()}
      ${renderRecommendCarousel()}
      ${renderArtistNews()}
      ${renderMonthlyPicks()}
      ${NOLI_COMMON.renderBottomNav("")}
    `;

    // root(#screen-main)는 재렌더링돼도 재사용되므로, 이벤트 위임 리스너는 최초 1회만 등록한다.
    if (!root.dataset.bound) {
      bindEvents(root);
      NOLI_COMMON.bindCommonNav(root);
      root.dataset.bound = "true";
    }
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
        return;
      }
      const openBtn = e.target.closest('[data-action="open-detail"]');
      if (openBtn && window.NOLI_DETAIL) {
        window.NOLI_DETAIL.open(openBtn.dataset.id);
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

/* 화면 전환(초기 진입 화면 결정)은 splash.js가 담당합니다.
   main.js는 콘텐츠를 미리 렌더링해 두기만 합니다. */
document.addEventListener("DOMContentLoaded", () => {
  NOLI_MAIN.render();
});
