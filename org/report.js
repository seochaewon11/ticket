/* ==========================================================================
   NOLI - report.js
   리포트 화면 : 관람 트렌드(막대그래프) + 장르별 분포(도넛) + 최애 아티스트 랭킹
   ========================================================================== */

const NOLI_REPORT = (() => {
  const { viewingTrend, genreDistribution, topArtists } = window.NOLI_DATA;

  function renderTrendChart() {
    const max = Math.max(...viewingTrend.map((v) => v.count));
    const nowIndex = viewingTrend.length - 1;
    const totalCount = viewingTrend[nowIndex].count;

    const bars = viewingTrend
      .map((v, i) => {
        const heightPercent = Math.max((v.count / max) * 100, 8);
        const isNow = i === nowIndex;
        return `
          <div class="trend-bar-col">
            ${isNow ? `<span class="trend-now-badge">NOW</span>` : ""}
            <div class="trend-bar ${isNow ? "is-now" : ""}" style="height:${heightPercent}%"></div>
          </div>`;
      })
      .join("");

    const labels = viewingTrend.map((v) => `<span>${v.month}</span>`).join("");

    return `
      <div class="card report-card">
        <div class="report-trend-head">
          <div>
            <p class="report-trend-title">관람 트렌드</p>
            <p class="report-trend-sub">지난 6개월간의 기록입니다</p>
          </div>
          <p class="report-trend-count"><strong>${totalCount}</strong>회 관람</p>
        </div>
        <div class="trend-chart">${bars}</div>
        <div class="trend-labels">${labels}</div>
      </div>
    `;
  }

  function renderDonutChart() {
    const r = 40;
    const circumference = 2 * Math.PI * r;
    let offsetAcc = 0;

    const segments = genreDistribution
      .map((g) => {
        const len = (g.percent / 100) * circumference;
        const seg = `<circle cx="50" cy="50" r="${r}" fill="none" stroke="${g.color}" stroke-width="14"
          stroke-dasharray="${len} ${circumference - len}" stroke-dashoffset="${-offsetAcc}" stroke-linecap="butt" />`;
        offsetAcc += len;
        return seg;
      })
      .join("");

    const top = genreDistribution[0];

    const legend = genreDistribution
      .map(
        (g) => `
        <div class="donut-legend-row">
          <span class="donut-legend-dot" style="background:${g.color}"></span>
          <span class="donut-legend-label">${g.label}</span>
          <span class="donut-legend-percent">${g.percent}%</span>
        </div>`
      )
      .join("");

    return `
      <div class="card report-card">
        <p class="report-donut-title">장르별 상세 분포</p>
        <div class="donut-row">
          <div class="donut-chart-wrap">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="${r}" fill="none" stroke="var(--color-chart-track)" stroke-width="14" />
              ${segments}
            </svg>
            <div class="donut-center">
              <span class="donut-center-percent">${top.percent}%</span>
              <span class="donut-center-label">${top.label}</span>
            </div>
          </div>
          <div class="donut-legend">${legend}</div>
        </div>
      </div>
    `;
  }

  function renderRankList() {
    const rows = topArtists
      .map(
        (a) => `
        <div class="rank-row">
          <span class="rank-badge">${a.rank}</span>
          <span class="avatar-circle rank-avatar img-ph" data-theme="${a.theme}"></span>
          <div class="rank-body">
            <p class="rank-name">${a.name}</p>
            <p class="rank-role">${a.role}</p>
          </div>
          <span class="rank-count">${a.count}회</span>
        </div>`
      )
      .join("");

    return `
      <div class="card report-card">
        <p class="report-rank-title">최애 아티스트 랭킹</p>
        ${rows}
      </div>
    `;
  }

  function render() {
    const root = document.getElementById("screen-report");
    if (!root) return;

    root.innerHTML = `
      ${NOLI_COMMON.renderHeader()}
      <div>
        ${renderTrendChart()}
        ${renderDonutChart()}
        ${renderRankList()}
        <button class="btn btn--primary report-share-btn" data-action="share-report">리포트 친구에게 공유하기</button>
      </div>
      ${NOLI_COMMON.renderBottomNav("report")}
    `;

    NOLI_COMMON.bindOnce(root, () => bindEvents(root));
  }

  function bindEvents(root) {
    root.addEventListener("click", (e) => {
      const shareBtn = e.target.closest('[data-action="share-report"]');
      if (shareBtn) {
        // 실제 공유 기능은 없는 목업입니다.
        alert("리포트 공유 링크가 복사되었어요! (데모)");
      }
    });

    NOLI_COMMON.bindCommonNav(root, { onBack: () => NOLI_ROUTER.showScreen("main") });
  }

  return { render };
})();

document.addEventListener("DOMContentLoaded", () => {
  NOLI_REPORT.render();
});
