/* ==========================================================================
   NOLI - profile.js
   프로필 화면 : 인사 + 취향 태그 + 나의 공연 기억 + 메뉴 + 로그아웃
   ========================================================================== */

const NOLI_PROFILE = (() => {
  const { userPreference, memoryList, profileMenu, profileTags } = window.NOLI_DATA;
  const ICONS = NOLI_COMMON.ICONS;

  // 간단한 일러스트풍 아바타 (실제 사진 대신 벡터로 대체)
  const AVATAR_SVG = `
    <svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
      <circle cx="26" cy="26" r="26" fill="#EFE7DD"/>
      <circle cx="26" cy="23" r="10" fill="#F6CBA3"/>
      <path d="M12 27c1-9 6-15 14-15s13 6 14 15" fill="none" stroke="#4A3B2A" stroke-width="3" stroke-linecap="round"/>
      <circle cx="21.5" cy="23" r="1.4" fill="#4A3B2A"/>
      <circle cx="30.5" cy="23" r="1.4" fill="#4A3B2A"/>
      <path d="M22 27.5c1.4 1.4 6.6 1.4 8 0" fill="none" stroke="#4A3B2A" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M6 52c1-10 9-17 20-17s19 7 20 17" fill="#8A7CF0"/>
    </svg>
  `;

  const MENU_ICONS = {
    edit: ICONS.edit,
    settings: ICONS.settings,
    support: ICONS.support,
    info: ICONS.info,
  };

  function renderTags() {
    return profileTags.map((t) => `<span class="profile-tag">${t}</span>`).join("");
  }

  function renderMemoryGrid() {
    return memoryList
      .map(
        (m) => `
        <div class="memory-card">
          <div class="memory-media img-ph" data-theme="${m.theme}">
            <span class="memory-date-badge">${m.date}</span>
          </div>
          <p class="memory-title">${m.title}</p>
        </div>`
      )
      .join("");
  }

  function renderMenu() {
    const rows = profileMenu
      .map(
        (m) => `
        <div class="menu-row" data-action="menu-item" data-id="${m.id}" role="button">
          <span class="menu-row-icon">${MENU_ICONS[m.iconType] || ""}</span>
          <span class="menu-row-label">${m.label}</span>
          <span class="menu-row-chevron">${ICONS.chevron}</span>
        </div>`
      )
      .join("");
    return `<div class="profile-menu-card">${rows}</div>`;
  }

  function render() {
    const root = document.getElementById("screen-profile");
    if (!root) return;

    root.innerHTML = `
      ${NOLI_COMMON.renderHeader({ back: true })}
      <div class="profile-body">
        <div class="profile-greet-row">
          <span class="profile-avatar">${AVATAR_SVG}</span>
          <div class="profile-greet-text">
            <p class="profile-greet-hi">오늘도 반가워요!</p>
            <p class="profile-greet-name">${userPreference.userName}님!</p>
          </div>
          <button class="profile-search-btn" data-action="go-storage" aria-label="보관함으로 이동">${ICONS.search}</button>
        </div>

        <div class="profile-tags">${renderTags()}</div>

        <h2 class="profile-section-title">나의 공연 기억</h2>
        <div class="memory-grid">${renderMemoryGrid()}</div>

        ${renderMenu()}

        <button class="profile-logout-btn" data-action="logout">로그아웃</button>
      </div>
      ${NOLI_COMMON.renderBottomNav("profile")}
    `;

    NOLI_COMMON.bindOnce(root, () => bindEvents(root));
  }

  function bindEvents(root) {
    root.addEventListener("click", (e) => {
      // 우측 상단 아이콘은 시안상 돋보기(검색) 모양이지만,
      // 요청에 따라 클릭 동작은 보관함(storage) 화면으로 이동하도록 연결합니다.
      const searchBtn = e.target.closest('[data-action="go-storage"]');
      if (searchBtn) {
        NOLI_ROUTER.showScreen("storage");
        if (typeof NOLI_STORAGE !== "undefined") {
          NOLI_STORAGE.render();
        }
        return;
      }

      const logoutBtn = e.target.closest('[data-action="logout"]');
      if (logoutBtn) {
        window.NOLI_DATA.session.isLoggedIn = false;
        NOLI_ROUTER.showScreen("login");
        return;
      }

      // 메뉴 항목(취향 프로필 수정/설정/고객센터/공지사항)은 이번 범위에서는
      // 실제 이동 없이 자리만 유지합니다.
    });

    NOLI_COMMON.bindCommonNav(root, { onBack: () => NOLI_ROUTER.showScreen("main") });
  }

  return { render };
})();

document.addEventListener("DOMContentLoaded", () => {
  NOLI_PROFILE.render();
});
