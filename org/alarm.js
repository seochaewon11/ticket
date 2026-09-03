/* ==========================================================================
   NOLI - alarm.js
   알람설정 화면 : 대상 공연 카드 + 알람 시간(24/10/1시간 전) 토글 + 완료
   알람을 하나라도 켜면 캘린더 데이터(calendarMarkers)에도 반영됩니다.
   ========================================================================== */

const NOLI_ALARM = (() => {
  const { alarmTarget, alarmOptions, calendarMarkers } = window.NOLI_DATA;
  const ICONS = NOLI_COMMON.ICONS;

  function renderTargetCard() {
    const tagsHtml = alarmTarget.tags.map((t) => `<span class="pill pill--purple">${t}</span>`).join("");
    return `
      <div class="card alarm-target-card">
        <div class="alarm-target-thumb img-ph" data-theme="${alarmTarget.theme}"></div>
        <div class="alarm-target-body">
          <div class="alarm-target-tags">${tagsHtml}</div>
          <p class="alarm-target-title">${alarmTarget.title}</p>
          <p class="alarm-target-time">${ICONS.calendar} ${alarmTarget.datetime}</p>
        </div>
      </div>
    `;
  }

  function renderToggleList() {
    const rows = alarmOptions
      .map(
        (opt) => `
        <div class="alarm-toggle-row ${opt.checked ? "is-on" : ""}">
          <span class="alarm-toggle-label">${opt.label}</span>
          <button class="toggle-switch ${opt.checked ? "is-on" : ""}" data-action="toggle-alarm-option" data-id="${opt.id}" aria-label="${opt.label} 알람 ${opt.checked ? "끄기" : "켜기"}"></button>
        </div>`
      )
      .join("");
    return `<div class="alarm-toggle-list">${rows}</div>`;
  }

  function render() {
    const root = document.getElementById("screen-alarm");
    if (!root) return;

    root.innerHTML = `
      ${NOLI_COMMON.renderHeader({ back: true, title: "알람설정" })}
      <div style="padding-top: var(--space-5)">
        ${renderTargetCard()}
        <p class="alarm-guide-title"><em>원하는</em> 알람 시간을 <em>모두 선택</em>해주세요</p>
        <p class="alarm-guide-sub">티켓 오픈 전 푸시 알림을 보내드려요.</p>
        ${renderToggleList()}
      </div>
      <div class="alarm-cta">
        <button class="btn btn--primary" data-action="finish-alarm">설정 완료</button>
      </div>
    `;

    NOLI_COMMON.bindOnce(root, () => bindEvents(root));
  }

  function bindEvents(root) {
    root.addEventListener("click", (e) => {
      const toggleBtn = e.target.closest('[data-action="toggle-alarm-option"]');
      if (toggleBtn) {
        const opt = alarmOptions.find((o) => o.id === toggleBtn.dataset.id);
        if (opt) {
          opt.checked = !opt.checked;
          syncCalendarMarker();
          render();
        }
        return;
      }

      const finishBtn = e.target.closest('[data-action="finish-alarm"]');
      if (finishBtn) {
        NOLI_ROUTER.showScreen("calendar");
        if (typeof NOLI_CALENDAR !== "undefined") {
          NOLI_CALENDAR.render();
        }
      }
    });

    NOLI_COMMON.bindCommonNav(root, { onBack: () => NOLI_ROUTER.showScreen("calendar") });
  }

  /** 알람이 하나라도 켜져 있으면 캘린더에 해당 공연 날짜의 점 표시를 추가/제거한다. */
  function syncCalendarMarker() {
    // alarmTarget.datetime 예: "2026.11.24 (금) 오후 2:00" → "2026-11-24"
    const match = alarmTarget.datetime.match(/(\d{4})\.(\d{2})\.(\d{2})/);
    if (!match) return;
    const key = `${match[1]}-${match[2]}-${match[3]}`;

    const hasAnyOn = alarmOptions.some((o) => o.checked);
    const existingIdx = calendarMarkers.findIndex(
      (m) => m.date === key && m.dot === "purple" && m._fromAlarm
    );

    if (hasAnyOn && existingIdx === -1) {
      calendarMarkers.push({ date: key, dot: "purple", _fromAlarm: true });
    } else if (!hasAnyOn && existingIdx !== -1) {
      calendarMarkers.splice(existingIdx, 1);
    }
  }

  return { render };
})();

document.addEventListener("DOMContentLoaded", () => {
  NOLI_ALARM.render();
});
