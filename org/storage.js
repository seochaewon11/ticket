/* ==========================================================================
   NOLI - storage.js
   보관함(공연 플레이리스트) 화면 : 저장한 공연 / 최근 본 공연 그리드
   ========================================================================== */

const NOLI_STORAGE = (() => {
  const { userPreference, savedShows, recentlyViewed } = window.NOLI_DATA;
  const ICONS = NOLI_COMMON.ICONS;

  function renderCard(item, showHeart) {
    return `
      <div class="storage-card">
        <div class="storage-card-media img-ph" data-theme="${item.theme}">
          ${showHeart ? `<span class="storage-card-heart">${ICONS.heart(true)}</span>` : ""}
        </div>
        <p class="storage-card-category">${item.category}</p>
        <p class="storage-card-title">${item.title}</p>
      </div>
    `;
  }

  function render() {
    const root = document.getElementById("screen-storage");
    if (!root) return;

    const savedHtml = savedShows.map((s) => renderCard(s, true)).join("");
    const recentHtml = recentlyViewed.map((r) => renderCard(r, false)).join("");

    root.innerHTML = `
      ${NOLI_COMMON.renderHeader()}
      <div>
        <h1 class="storage-page-title">나의 공연 보관함</h1>
        <p class="storage-page-sub">${userPreference.userGreetingName}님의 보고 싶은 무대들을 저장했어요</p>
        <div class="storage-grid">${savedHtml}</div>

        <h2 class="storage-section-title">최근 본 공연</h2>
        <div class="storage-grid">${recentHtml}</div>
      </div>
      ${NOLI_COMMON.renderBottomNav("storage")}
    `;

    NOLI_COMMON.bindOnce(root, () => bindEvents(root));
  }

  function bindEvents(root) {
    NOLI_COMMON.bindCommonNav(root, { onBack: () => NOLI_ROUTER.showScreen("main") });
  }

  return { render };
})();

document.addEventListener("DOMContentLoaded", () => {
  NOLI_STORAGE.render();
});
