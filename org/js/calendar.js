/* ==========================================================================
   NOLI - calendar.js
   캘린더(공연 일정) : 월간 달력 + 티켓오픈 알림 리스트 + 예정된 공연
   ========================================================================== */

const NOLI_CALENDAR = (() => {
  const { calendarMarkers, ticketAlarms, upcomingShows } = window.NOLI_DATA;
  const ICONS = NOLI_COMMON.ICONS;

  // 시안 기준 초기값 : 2026년 8월, 15일 선택
  let viewYear = 2026;
  let viewMonth = 8; // 1~12
  let selectedDate = "2026-08-15";

  const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

  function pad2(n) {
    return String(n).padStart(2, "0");
  }

  function dateKey(y, m, d) {
    return `${y}-${pad2(m)}-${pad2(d)}`;
  }

  function getMarkersFor(key) {
    return calendarMarkers.filter((m) => m.date === key);
  }

  function renderCalendarCard() {
    const firstWeekday = new Date(viewYear, viewMonth - 1, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth, 0).getDate();

    const cells = [];
    for (let i = 0; i < firstWeekday; i++) {
      cells.push(`<div class="calendar-day is-empty"></div>`);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const key = dateKey(viewYear, viewMonth, d);
      const isSelected = key === selectedDate;
      const dots = getMarkersFor(key)
        .slice(0, 3)
        .map((m) => `<span class="dot-${m.dot}"></span>`)
        .join("");

      cells.push(`
        <button class="calendar-day ${isSelected ? "is-selected" : ""}" data-action="select-date" data-date="${key}">
          <span class="calendar-day-num">${d}</span>
          <span class="calendar-day-dots">${dots}</span>
        </button>
      `);
    }

    const weekdaysHtml = WEEKDAYS.map((w) => `<span>${w}</span>`).join("");

    return `
      <div class="card calendar-card">
        <div class="calendar-nav">
          <button class="calendar-nav-btn" data-action="prev-month" aria-label="이전 달">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 5-7 7 7 7"/></svg>
          </button>
          <span class="calendar-month-label">${pad2(viewMonth)}월 ${viewYear}</span>
          <button class="calendar-nav-btn" data-action="next-month" aria-label="다음 달">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 5 7 7-7 7"/></svg>
          </button>
        </div>
        <div class="calendar-weekdays">${weekdaysHtml}</div>
        <div class="calendar-grid">${cells.join("")}</div>
      </div>
    `;
  }

  function renderAlarmList() {
    const items = ticketAlarms
      .map(
        (a) => `
        <div class="alarm-card ${a.urgent ? "alarm-card--urgent" : ""}">
          <div class="alarm-card-top">
            <span class="badge-dday ${a.urgent ? "badge-dday--urgent" : ""}">D-${a.dday}</span>
            <span class="alarm-card-bell">${ICONS.bell}</span>
          </div>
          <p class="alarm-card-title">${a.title}</p>
          <p class="alarm-card-time">${a.datetime}</p>
        </div>`
      )
      .join("");

    return `
      <div class="calendar-section-title">
        티켓 오픈 알림
        <button class="icon-btn" aria-label="더 보기">${ICONS.plus}</button>
      </div>
      ${items}
    `;
  }

  function renderUpcomingList() {
    const items = upcomingShows
      .map(
        (u) => `
        <div class="upcoming-item">
          <div class="upcoming-thumb img-ph" data-theme="${u.theme}"></div>
          <div class="upcoming-body">
            <div class="upcoming-meta">
              <span class="pill pill--pink">${u.category}</span>
              <span class="upcoming-date">${u.date}</span>
            </div>
            <p class="upcoming-title">${u.title}</p>
            <p class="upcoming-venue">${ICONS.pin} ${u.venue}</p>
          </div>
        </div>`
      )
      .join("");

    return `
      <div class="calendar-section-title">예정된 공연</div>
      ${items}
    `;
  }

  function render() {
    const root = document.getElementById("screen-calendar");
    if (!root) return;

    root.innerHTML = `
      ${NOLI_COMMON.renderHeader()}
      <div>
        <h1 class="calendar-page-title">공연 일정</h1>
        <p class="calendar-page-sub">이번 달의 예술적 여정을 확인하세요.</p>
        ${renderCalendarCard()}
        ${renderAlarmList()}
        ${renderUpcomingList()}
      </div>
      ${NOLI_COMMON.renderBottomNav("calendar")}
    `;

    NOLI_COMMON.bindOnce(root, () => bindEvents(root));
  }

  function bindEvents(root) {
    root.addEventListener("click", (e) => {
      const dateBtn = e.target.closest('[data-action="select-date"]');
      if (dateBtn) {
        selectedDate = dateBtn.dataset.date;
        render();
        return;
      }
      const prevBtn = e.target.closest('[data-action="prev-month"]');
      if (prevBtn) {
        viewMonth -= 1;
        if (viewMonth < 1) {
          viewMonth = 12;
          viewYear -= 1;
        }
        render();
        return;
      }
      const nextBtn = e.target.closest('[data-action="next-month"]');
      if (nextBtn) {
        viewMonth += 1;
        if (viewMonth > 12) {
          viewMonth = 1;
          viewYear += 1;
        }
        render();
      }
    });

    NOLI_COMMON.bindCommonNav(root, { onBack: () => NOLI_ROUTER.showScreen("main") });
  }

  return { render };
})();

document.addEventListener("DOMContentLoaded", () => {
  NOLI_CALENDAR.render();
});
