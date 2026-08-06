/* ============================================
   NOLI - alarm.js (티켓오픈알람 설정 화면)
   ============================================ */

(function () {
  'use strict';

  var currentAlertId = null;

  function qs(selector) {
    return document.querySelector(selector);
  }

  function getRequestedAlertId() {
    var params = new URLSearchParams(window.location.search);
    return params.get('id') || 'alert_001'; // id 파라미터가 없으면 기본으로 오페라의 유령(alert_001) 표시
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
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 9.5h16M8 3v3.5M16 3v3.5" stroke-linecap="round"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8.5"/><path d="M12 8v4l3 2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9a6 6 0 0 1 12 0c0 4.5 1.5 6 1.5 6h-15S6 13.5 6 9z" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 19a2 2 0 0 0 4 0"/></svg>'
  };

  /* ---------- 대상 공연 정보 카드 렌더링 ---------- */
  function renderTargetCard(alert) {
    var img = qs('#targetThumbImg');
    loadImageWithFallbacks(img, fileCaseVariants(alert.posterUrl), function () {
      img.closest('.target-thumb').style.background = 'linear-gradient(160deg, #2A2140 0%, #7C5CFC 60%, #F7F0EC 100%)';
      img.style.display = 'none';
    });
    img.addEventListener('load', function () {
      img.style.display = 'block';
    });

    qs('#targetTags').innerHTML = alert.genreTags.map(function (t) {
      return '<span class="target-tag">' + t + '</span>';
    }).join('');

    qs('#targetTitle').textContent = alert.title;
    qs('#targetDate').textContent = alert.dateText;
    qs('#targetTime').textContent = alert.timeText;
  }

  /* ---------- 알람 시간 토글 리스트 렌더링 ---------- */
  function renderReminderList(alert) {
    var wrap = qs('#reminderList');

    wrap.innerHTML = alert.reminderOptions.map(function (opt) {
      return (
        '<div class="reminder-row">' +
          '<span class="reminder-label">' + opt.label + '</span>' +
          '<label class="switch">' +
            '<input type="checkbox" role="switch" data-option-key="' + opt.key + '"' + (opt.enabled ? ' checked' : '') + '>' +
            '<span class="switch-track"><span class="switch-thumb"></span></span>' +
          '</label>' +
        '</div>'
      );
    }).join('');

    wrap.querySelectorAll('input[type="checkbox"]').forEach(function (input) {
      input.addEventListener('change', function () {
        window.NoliData.toggleAlertReminder(currentAlertId, input.dataset.optionKey);
      });
    });
  }

  /* ---------- 뒤로가기 / 설정 완료 ---------- */
  function goBack() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = 'calendar.html';
    }
  }

  function bindButtons() {
    qs('#backBtn').addEventListener('click', goBack);
    qs('#completeBtn').addEventListener('click', goBack);
  }

  /* ---------- 초기화 ---------- */
  function init() {
    window.NoliData.getData();

    qs('#bellIcon').innerHTML = ICONS.bell;
    qs('#calendarIcon').innerHTML = ICONS.calendar;
    qs('#clockIcon').innerHTML = ICONS.clock;

    currentAlertId = getRequestedAlertId();
    var alert = window.NoliData.getAlertWithReminderState(currentAlertId);

    if (!alert) {
      qs('.alarm-page').innerHTML = '<p class="empty-state" style="padding:40px 20px;">알람 정보를 찾을 수 없어요.</p>';
      return;
    }

    renderTargetCard(alert);
    renderReminderList(alert);
    bindButtons();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
