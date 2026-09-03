/* ==========================================================================
   NOLI - favorite.js
   취향설정 플로우 : 장르·분위기(Step 2) → 아티스트 검색(Step 2, favorite_artist와 동일 스텝) → 완료
   3개의 서브스텝을 이 파일 하나에서 관리합니다 (같은 온보딩 흐름이기 때문).
   ========================================================================== */

const NOLI_FAVORITE = (() => {
  const { userPreference, categoryOptions, moodOptions, artistOptions } = window.NOLI_DATA;

  // 이 화면 안에서만 쓰는 UI 상태 (전역 데이터가 아니라 네비게이션/입력 상태이므로 로컬로 관리)
  let subStep = "mood"; // "mood" | "artist" | "complete"
  let artistQuery = "";

  const ICONS = {
    mic: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/></svg>`,
    mask: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="10.5" r="5.5"/><circle cx="15" cy="10.5" r="5.5"/><path d="M6.7 12.3c.9 1 2.7 1 3.6 0"/><path d="M17.3 9.3c-.9-1-2.7-1-3.6 0"/><circle cx="7.2" cy="9" r=".6" fill="currentColor" stroke="none"/><circle cx="10.8" cy="9" r=".6" fill="currentColor" stroke="none"/><circle cx="13.2" cy="11.5" r=".6" fill="currentColor" stroke="none"/><circle cx="16.8" cy="11.5" r=".6" fill="currentColor" stroke="none"/></svg>`,
    vinyl: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.2"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/></svg>`,
    dance: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="4.5" r="1.8" fill="currentColor" stroke="none"/><path d="M9 21l2.5-6-3-2.5 1-4.5 4 1.5 2 3.5 3 1.5"/><path d="M11.5 15 8 18"/></svg>`,
    note: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 18a3 3 0 1 1-2-2.8V5.5a1 1 0 0 1 .8-1L17 2.6a1 1 0 0 1 1.2 1V15a3 3 0 1 1-2-2.8V6.7l-7 1.6V18Z"/></svg>`,
    palette: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 8 0 0 0 0 16c1.2 0 1.6-.7 1.6-1.4 0-.4-.2-.7-.4-1-.2-.3-.4-.6-.4-1 0-.8.6-1.4 1.4-1.4H16a4 4 0 0 0 4-4c0-4-3.6-7.2-8-7.2Z"/><circle cx="8.2" cy="10.5" r="1" fill="currentColor" stroke="none"/><circle cx="11.5" cy="7.3" r="1" fill="currentColor" stroke="none"/><circle cx="15.3" cy="9" r="1" fill="currentColor" stroke="none"/></svg>`,
  };

  /* ---------- 공통 진행바 ---------- */
  function renderProgress(step, total) {
    const percent = Math.round((step / total) * 100);
    return `
      <div class="progress-track">
        <div class="progress-fill" style="width:${percent}%"></div>
      </div>
      <p class="progress-step">Step ${step} of ${total}</p>
    `;
  }

  /* =========================================================
     Sub-step 1 : 장르 · 분위기 (Step 2 of 3)
     ========================================================= */
  function renderCategoryGrid() {
    const cards = categoryOptions
      .map((c) => {
        const selected = userPreference.selectedCategories.includes(c.id);
        return `
          <button class="category-card ${selected ? "is-selected" : ""}"
            data-action="toggle-category" data-id="${c.id}">
            <span class="category-icon category-icon--${c.id}">${ICONS[c.iconType]}</span>
            <span class="category-label">${c.label}</span>
          </button>`;
      })
      .join("");
    return `<div class="category-grid">${cards}</div>`;
  }

  function renderMoodList() {
    const chips = moodOptions
      .map((m) => {
        const selected = userPreference.selectedMoods.includes(m.id);
        return `
          <button class="mood-chip ${selected ? "is-selected" : ""}"
            data-action="toggle-mood" data-id="${m.id}">${m.label}</button>`;
      })
      .join("");
    return `<div class="mood-list">${chips}</div>`;
  }

  function canProceedMood() {
    return userPreference.selectedCategories.length > 0 && userPreference.selectedMoods.length > 0;
  }

  function renderMoodStep() {
    return `
      ${renderProgress(2, userPreference.totalSteps)}
      <h1 class="favorite-title">어떤 공연을 좋아하세요?</h1>
      <p class="favorite-subtitle">취향에 맞는 공연을 추천해 드릴게요.</p>
      ${renderCategoryGrid()}

      <h2 class="favorite-section-title">좋아하는 분위기는?</h2>
      ${renderMoodList()}

      <div class="favorite-cta">
        <button class="btn btn--primary" data-action="go-artist-step" ${canProceedMood() ? "" : "disabled"}>
          다음 단계로
        </button>
      </div>
    `;
  }

  /* =========================================================
     Sub-step 2 : 아티스트 검색 (Step 3 of 3)
     ========================================================= */
  function getFilteredArtists() {
    const q = artistQuery.trim();
    if (!q) {
      // 검색어가 없을 때는 이준영을 제외한 기본 추천 6명을 보여준다 (디자인 시안 기준)
      return artistOptions.filter((a) => a.id !== "leejoonyoung");
    }
    return artistOptions.filter((a) => a.name.includes(q));
  }

  function renderArtistResults() {
    const results = getFilteredArtists();

    if (results.length === 0) {
      return `<p class="artist-empty">검색 결과가 없어요. 다른 이름으로 검색해보세요.</p>`;
    }

    if (results.length === 1) {
      // 검색 결과가 1명일 때는 중앙 정렬된 단일 카드로 표시 (시안 기준)
      const a = results[0];
      const selected = userPreference.selectedArtists.includes(a.id);
      return `
        <div class="artist-single">
          <div class="avatar-circle artist-avatar-lg img-ph" data-theme="${a.theme}"></div>
          <p class="artist-single-name">${a.name}</p>
          <button class="artist-select-btn ${selected ? "is-selected" : ""}"
            data-action="toggle-artist" data-id="${a.id}">
            ${selected ? "선택 완료" : "선택"}
          </button>
        </div>
      `;
    }

    const cards = results
      .map((a) => {
        const selected = userPreference.selectedArtists.includes(a.id);
        return `
          <button class="artist-card-item" data-action="toggle-artist" data-id="${a.id}">
            <span class="avatar-circle artist-avatar-md img-ph ${selected ? "is-selected" : ""}" data-theme="${a.theme}"></span>
            <span class="artist-item-name ${selected ? "is-selected" : ""}">${a.name}</span>
          </button>`;
      })
      .join("");
    return `<div class="artist-grid">${cards}</div>`;
  }

  function canProceedArtist() {
    return userPreference.selectedArtists.length > 0;
  }

  function renderArtistStep() {
    return `
      ${renderProgress(2, userPreference.totalSteps)}
      <h1 class="favorite-title">좋아하는 아티스트가 있나요?</h1>
      <p class="favorite-subtitle">선택하신 아티스트의 공연소식을 빠르게 만나볼 수 있어요!</p>

      <div class="artist-search-box">
        ${NOLI_COMMON.ICONS.search}
        <input type="text" class="artist-search-input" placeholder="아티스트 이름을 검색해보세요"
          value="${artistQuery}" data-action="artist-query" />
      </div>

      <div class="artist-results">
        ${renderArtistResults()}
      </div>

      <div class="favorite-cta">
        <button class="btn btn--primary" data-action="go-complete-step" ${canProceedArtist() ? "" : "disabled"}>
          완료
        </button>
      </div>
    `;
  }

  /* =========================================================
     Sub-step 3 : 완료 (분석 결과 요약, 스텝 표시 없음)
     ========================================================= */
  function renderCompleteStep() {
    const categoryLabels = categoryOptions
      .filter((c) => userPreference.selectedCategories.includes(c.id))
      .map((c) => c.label);
    const moodLabels = moodOptions
      .filter((m) => userPreference.selectedMoods.includes(m.id))
      .map((m) => m.label);
    const artistLabels = artistOptions
      .filter((a) => userPreference.selectedArtists.includes(a.id))
      .map((a) => a.name);

    // "차가운 도시"는 실제 선택 UI에는 없는, NOLI가 취향을 분석해 덧붙인 추론 태그입니다 (시안 기준 고정 표시).
    const tags = [...categoryLabels, ...moodLabels, "차가운 도시", ...artistLabels];
    const tagsHtml = tags.map((t) => `<span class="pill pill--purple analysis-tag">${t}</span>`).join("");

    return `
      <div class="complete-wrap">
        <h1 class="complete-title">설정이 완료되었습니다!</h1>
        <p class="complete-subtitle">NOLI가 ${userPreference.userGreetingName}님 취향을 찾았어요.</p>

        <div class="analysis-card card">
          <span class="analysis-eyebrow">ANALYSIS</span>
          <h2 class="analysis-heading">${userPreference.userName}님을 위한<br>맞춤 공연을 준비했어요</h2>
          <div class="analysis-tags">${tagsHtml}</div>
          <p class="analysis-footer">${userPreference.userGreetingName}님이 좋아할 만한<br>공연 정보들을 매일 배달해 드릴게요!</p>
        </div>

        <button class="btn btn--primary complete-cta" data-action="finish">NOLI 시작하기</button>
      </div>
    `;
  }

  /* ---------- 총괄 렌더 ---------- */
  function render() {
    const root = document.getElementById("screen-favorite");
    if (!root) return;

    let body = "";
    if (subStep === "mood") body = renderMoodStep();
    else if (subStep === "artist") body = renderArtistStep();
    else body = renderCompleteStep();

    root.innerHTML = body;

    // root(#screen-favorite) 자체는 재렌더링돼도 재사용되므로, 이벤트 위임 리스너는
    // 최초 1회만 등록한다 (매번 등록하면 클릭할 때마다 중복 실행되는 버그가 생김).
    if (!root.dataset.bound) {
      bindEvents(root);
      root.dataset.bound = "true";
    }
  }

  function bindEvents(root) {
    root.addEventListener("click", (e) => {
      const categoryBtn = e.target.closest('[data-action="toggle-category"]');
      if (categoryBtn) {
        toggleSelection(userPreference.selectedCategories, categoryBtn.dataset.id);
        render();
        return;
      }

      const moodBtn = e.target.closest('[data-action="toggle-mood"]');
      if (moodBtn) {
        toggleSelection(userPreference.selectedMoods, moodBtn.dataset.id);
        render();
        return;
      }

      const artistBtn = e.target.closest('[data-action="toggle-artist"]');
      if (artistBtn) {
        toggleSelection(userPreference.selectedArtists, artistBtn.dataset.id);
        render();
        return;
      }

      const goArtistBtn = e.target.closest('[data-action="go-artist-step"]');
      if (goArtistBtn && canProceedMood()) {
        subStep = "artist";
        render();
        return;
      }

      const goCompleteBtn = e.target.closest('[data-action="go-complete-step"]');
      if (goCompleteBtn && canProceedArtist()) {
        subStep = "complete";
        render();
        return;
      }

      const finishBtn = e.target.closest('[data-action="finish"]');
      if (finishBtn) {
        handleFinish();
      }
    });

    root.addEventListener("input", (e) => {
      const input = e.target.closest('[data-action="artist-query"]');
      if (input) {
        artistQuery = input.value;
        render();
        // 리렌더 후 입력 포커스를 유지하고 커서를 맨 뒤로 이동
        const newInput = root.querySelector('[data-action="artist-query"]');
        if (newInput) {
          newInput.focus();
          const len = newInput.value.length;
          newInput.setSelectionRange(len, len);
        }
      }
    });
  }

  function toggleSelection(list, id) {
    const idx = list.indexOf(id);
    if (idx === -1) {
      list.push(id);
    } else {
      list.splice(idx, 1);
    }
  }

  function handleFinish() {
    userPreference.completed = true;
    userPreference.step = userPreference.totalSteps;
    NOLI_ROUTER.showScreen("main");
    if (typeof NOLI_MAIN !== "undefined") {
      NOLI_MAIN.render();
    }
  }

  /**
   * 특정 서브스텝으로 직접 진입 (개별 리뷰용 html, 예: favorite_search.html 에서 사용)
   * @param {"mood"|"artist"|"complete"} step
   */
  function goToStep(step) {
    subStep = step;
    render();
  }

  return { render, goToStep };
})();

document.addEventListener("DOMContentLoaded", () => {
  NOLI_FAVORITE.render();
});
