/* ==========================================================================
   NOLI - detail.js
   공연 상세화면 : 히어로 + 취향일치 분석 카드 + 상세정보 + 시놉시스 + 출연진
   ========================================================================== */

const NOLI_DETAIL = (() => {
  const { userPreference, performances } = window.NOLI_DATA;
  const ICONS = NOLI_COMMON.ICONS;

  let currentId = null;
  let synopsisExpanded = false;

  function renderMatchCard(p) {
    return `
      <div class="card analysis-match-card">
        <p class="analysis-match-head">
          ${ICONS.sparkleOutline}
          ${userPreference.userName} 님의 취향일치 <span class="match-rate">${p.matchRate}%</span>
        </p>
        <p class="analysis-match-reason">${p.matchReasonHtml || ""}</p>

        <div class="match-info-row">
          <span class="match-info-icon">${ICONS.genre}</span>
          <div>
            <p class="match-info-title">장르 선호도</p>
            <p class="match-info-sub">${p.genrePreferenceText || ""}</p>
          </div>
        </div>
        <div class="match-info-row">
          <span class="match-info-icon">${ICONS.trendUp}</span>
          <div>
            <p class="match-info-title">인기 급상승</p>
            <p class="match-info-sub">${p.trendingText || ""}</p>
          </div>
        </div>
      </div>
    `;
  }

  function renderInfoSection(p) {
    return `
      <div class="detail-section-title">
        공연 상세정보
        <button class="icon-btn" aria-label="더 보기">${ICONS.plus}</button>
      </div>
      <div class="detail-info-row">
        <span class="detail-info-icon">${ICONS.calendar}</span>
        <div>
          <p class="detail-info-label">기간</p>
          <p class="detail-info-value">${p.period || ""}</p>
        </div>
      </div>
      <div class="detail-info-row">
        <span class="detail-info-icon">${ICONS.clock}</span>
        <div>
          <p class="detail-info-label">러닝타임</p>
          <p class="detail-info-value">${p.runningTime || ""}</p>
        </div>
      </div>
      <div class="detail-info-row">
        <span class="detail-info-icon">${ICONS.ticket}</span>
        <div>
          <p class="detail-info-label">티켓 가격</p>
          <p class="detail-info-value">${p.priceRange || ""}</p>
        </div>
      </div>
    `;
  }

  function renderSynopsis(p) {
    return `
      <div class="detail-section-title">시놉시스</div>
      <p class="synopsis-text ${synopsisExpanded ? "" : "is-collapsed"}">${p.synopsis || ""}</p>
      <button class="synopsis-toggle ${synopsisExpanded ? "is-expanded" : ""}" data-action="toggle-synopsis">
        ${synopsisExpanded ? "접기" : "더 보기"} ${ICONS.chevron}
      </button>
    `;
  }

  function renderCast(p) {
    const items = (p.castList || [])
      .map(
        (c) => `
        <div class="cast-item">
          <span class="avatar-circle cast-avatar img-ph" data-theme="${c.theme}"></span>
          <p class="cast-name">${c.name}</p>
          <p class="cast-role">${c.role}</p>
        </div>`
      )
      .join("");

    return `
      <div class="detail-section-title" style="margin-top:${"var(--space-6)"}">출연진</div>
      <div class="cast-scroll">${items}</div>
    `;
  }

  function render() {
    const root = document.getElementById("screen-detail");
    if (!root) return;

    const p = performances.find((item) => item.id === currentId) || performances[0];
    if (!p) return;

    root.innerHTML = `
      ${NOLI_COMMON.renderHeader({ back: true })}
      <div class="detail-hero-media">
        <div class="img-ph" data-theme="${p.theme}">
          <span class="watermark">${p.title.split("(")[0].trim()}</span>
        </div>
      </div>
      <div class="detail-body">
        <h1 class="detail-title">${p.title}</h1>
        <button class="btn btn--primary detail-save-btn" data-action="toggle-save" data-id="${p.id}">
          ${p.isLiked ? "보관함에 담겼어요" : "나만의 보관함에 담기"}
        </button>

        ${renderMatchCard(p)}
        ${renderInfoSection(p)}
        ${renderSynopsis(p)}
        ${renderCast(p)}
      </div>
      ${NOLI_COMMON.renderBottomNav("")}
    `;

    NOLI_COMMON.bindOnce(root, () => bindEvents(root));
  }

  function bindEvents(root) {
    root.addEventListener("click", (e) => {
      const saveBtn = e.target.closest('[data-action="toggle-save"]');
      if (saveBtn) {
        const p = performances.find((item) => item.id === saveBtn.dataset.id);
        if (p) {
          p.isLiked = !p.isLiked;
          render();
        }
        return;
      }

      const synopsisBtn = e.target.closest('[data-action="toggle-synopsis"]');
      if (synopsisBtn) {
        synopsisExpanded = !synopsisExpanded;
        render();
      }
    });

    NOLI_COMMON.bindCommonNav(root, { onBack: () => NOLI_ROUTER.showScreen("main") });
  }

  /** 다른 화면(main.js 등)에서 특정 공연의 상세화면을 열 때 호출 */
  function open(id) {
    currentId = id;
    synopsisExpanded = false;
    render();
    NOLI_ROUTER.showScreen("detail");
  }

  /** 초기 로드시 내용만 미리 렌더링(화면 전환은 하지 않음) - 히어로 공연을 기본값으로 사용 */
  function init() {
    const hero = performances.find((p) => p.isHero) || performances[0];
    if (hero) {
      currentId = hero.id;
      render();
    }
  }

  return { render, open, init };
})();

document.addEventListener("DOMContentLoaded", () => {
  NOLI_DETAIL.init();
});
