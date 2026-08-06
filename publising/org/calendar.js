/* ============================================
   NOLI - calendar.js (공연 일정 화면)
   월별 캘린더 렌더링, 이전/다음 달 이동,
   날짜 선택, 티켓 오픈 알람/예정된 공연 렌더링
   ============================================ */

(function () {
  'use strict';

  var WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

  var viewYear = 2026;
  var viewMonth = 10; // 1~12
  var selectedDateKey = '2026-10-15';

  function qs(selector) {
    return document.querySelector(selector);
  }

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function dateKey(y, m, d) {
    return y + '-' + pad(m) + '-' + pad(d);
  }

  /* ---------- 파일명 대소문자 자동 탐색 (다른 화면과 동일한 유틸) ---------- */
  function fileCaseVariants(path) {
    var parts = path.split('/');
    var file = parts.pop();
    var dotIdx = file.lastIndexOf('.');
    var name = file.substring(0, dotIdx);
    var ext = file.substring(dotIdx + 1);
    var dir = parts.join('/');
    var seen = {};
    var variants = [];
    [
      dir + '/' + name + '.' + ext,
      dir + '/' + name.toLowerCase() + '.' + ext.toLowerCase(),
      dir + '/' + name.toUpperCase() + '.' + ext.toLowerCase(),
      dir + '/' + name + '.' + ext.toUpperCase(),
      dir + '/' + name.toLowerCase() + '.' + ext.toUpperCase(),
      dir + '/' + name.toUpperCase() + '.' + ext.toUpperCase()
    ].forEach(function (v) {
      if (!seen[v]) {
        seen[v] = true;
        variants.push(v);
      }
    });
    return variants;
  }

  function loadImageWithFallbacks(imgEl, candidates, onAllFail) {
    var idx = 0;
    function tryNext() {
      if (idx >= candidates.length) {
        onAllFail();
        return;
      }
      imgEl.src = candidates[idx];
      idx += 1;
    }
    imgEl.addEventListener('error', tryNext);
    tryNext();
  }

  var ICONS = {
    chevronLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M15 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8.5"/><path d="M12 8v4l3 2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-6.4 7-11.5A7 7 0 0 0 5 9.5C5 14.6 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.3"/></svg>'
  };

  var DOT_CLASS_MAP = { pink: 'dot-pink', multi: 'dot-primary', primary: 'dot-primary', gray: 'dot-gray' };
  var GENRE_TAG_CLASS_MAP = { '클래식': 'tag-classic', '인디': 'tag-indie' };

  /* ---------- 캘린더 렌더링 ---------- */
  function renderCalendar() {
    qs('#calendarMonthTitle').textContent = viewYear + '년 ' + viewMonth + '월';

    var firstWeekday = new Date(viewYear, viewMonth - 1, 1).getDay(); // 0(일)~6(토)
    var daysInMonth = new Date(viewYear, viewMonth, 0).getDate();

    var eventMap = {};
    window.NoliData.getCalendarEventDates().forEach(function (e) {
      eventMap[e.date] = e.type;
    });

    var cells = [];
    for (var i = 0; i < firstWeekday; i++) {
      cells.push('<div class="calendar-cell is-empty"><span class="calendar-date-btn">0</span></div>');
    }
    for (var d = 1; d <= daysInMonth; d++) {
      var key = dateKey(viewYear, viewMonth, d);
      var isSelected = key === selectedDateKey;
      var dotType = eventMap[key];
      var dotsHtml = '';
      if (dotType === 'multi') {
        dotsHtml = '<span class="event-dot-row"><span class="event-dot dot-primary"></span><span class="event-dot dot-pink"></span></span>';
      } else if (dotType) {
        dotsHtml = '<span class="event-dot-row"><span class="event-dot ' + DOT_CLASS_MAP[dotType] + '"></span></span>';
      } else {
        dotsHtml = '<span class="event-dot-row"></span>';
      }
      cells.push(
        '<div class="calendar-cell">' +
          '<button type="button" class="calendar-date-btn' + (isSelected ? ' is-selected' : '') + '" data-date-key="' + key + '">' + d + '</button>' +
          dotsHtml +
        '</div>'
      );
    }

    qs('#calendarGrid').innerHTML = cells.join('');

    qs('#calendarGrid').querySelectorAll('.calendar-date-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectedDateKey = btn.dataset.dateKey;
        renderCalendar();
      });
    });
  }

  function changeMonth(delta) {
    var next = new Date(viewYear, viewMonth - 1 + delta, 1);
    viewYear = next.getFullYear();
    viewMonth = next.getMonth() + 1;
    selectedDateKey = ''; // 다른 달로 이동하면 선택 상태 초기화
    renderCalendar();
  }

  /* ---------- 티켓 오픈 알람 렌더링 ---------- */
  function renderTicketAlerts() {
    var wrap = qs('#alertScroll');
    var alerts = window.NoliData.getTicketOpenAlerts();

    wrap.innerHTML = alerts.map(function (a) {
      var themeClass = a.theme === 'primary' ? 'theme-primary' : 'theme-muted';
      return (
        '<article class="alert-card ' + themeClass + '" data-alert-id="' + a.id + '">' +
          '<span class="alert-dday">D-' + a.dDay + '</span>' +
          '<span class="alert-clock-icon">' + ICONS.clock + '</span>' +
          '<p class="alert-title">' + a.title + '</p>' +
          '<p class="alert-schedule">' + a.scheduleText + '</p>' +
        '</article>'
      );
    }).join('');

    wrap.querySelectorAll('.alert-card').forEach(function (card) {
      card.addEventListener('click', function () {
        window.location.href = 'alarm.html?id=' + card.dataset.alertId;
      });
    });
  }

  /* ---------- 예정된 공연 렌더링 ---------- */
  function renderUpcoming() {
    var wrap = qs('#upcomingList');
    var list = window.NoliData.getUpcomingPerformances();

    wrap.innerHTML = list.map(function (u) {
      var tagClass = GENRE_TAG_CLASS_MAP[u.genreTag] || 'tag-classic';
      return (
        '<div class="upcoming-card">' +
          '<div class="upcoming-thumb"><img data-photo-url="' + u.posterUrl + '" alt="' + u.title + '" style="display:none;"></div>' +
          '<div>' +
            '<div class="upcoming-meta-row">' +
              '<span class="genre-tag ' + tagClass + '">' + u.genreTag + '</span>' +
              '<span class="upcoming-date">' + u.dateText + '</span>' +
            '</div>' +
            '<p class="upcoming-title">' + u.title + '</p>' +
            '<p class="upcoming-venue">' + ICONS.pin + '<span>' + u.venue + '</span></p>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    wrap.querySelectorAll('img[data-photo-url]').forEach(function (imgEl) {
      var url = imgEl.getAttribute('data-photo-url');
      var parent = imgEl.parentElement;
      loadImageWithFallbacks(imgEl, fileCaseVariants(url), function () {
        parent.style.background = 'linear-gradient(160deg, #2A2140 0%, #7C5CFC 60%, #F7F0EC 100%)';
      });
      imgEl.addEventListener('load', function () {
        imgEl.style.display = 'block';
      });
    });
  }

  /* ---------- 뒤로가기 ---------- */
  function goBack() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = 'index.html';
    }
  }

  /* ---------- 초기화 ---------- */
  function init() {
    window.NoliData.getData();

    qs('#backBtn').addEventListener('click', goBack);

    qs('#prevMonthBtn').innerHTML = ICONS.chevronLeft;
    qs('#nextMonthBtn').innerHTML = ICONS.chevronRight;
    qs('#prevMonthBtn').addEventListener('click', function () { changeMonth(-1); });
    qs('#nextMonthBtn').addEventListener('click', function () { changeMonth(1); });

    renderCalendar();
    renderTicketAlerts();
    renderUpcoming();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
