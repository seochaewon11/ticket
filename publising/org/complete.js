/* ============================================
   NOLI - complete.js (설정완료 화면)
   저장된 취향 데이터를 기반으로 해시태그를 렌더링하고
   'NOLI 시작하기' 클릭 시 index.html로 이동
   ============================================ */

(function () {
  'use strict';

  function qs(selector) {
    return document.querySelector(selector);
  }

  /* ---------- 완료 메시지 (유저 이름 반영) ---------- */
  function renderMessage(user) {
    qs('#completeSub').textContent = '이제 NOLI가 ' + user.name + '님의 취향을 찾았어요.';
    qs('#tasteTitle').textContent = user.name + '님을 위한 맞춤 공연을 준비했어요';
    qs('#completeNote').textContent =
      user.name + ' 님이 좋아할 만한 공연 정보들을 매일 아침 배달해 드릴게요! 💌';
  }

  /* ---------- TASTE ANALYSIS 해시태그 렌더링 ---------- */
  function renderTasteTags() {
    var tags = window.NoliData.generateTasteTags();
    var wrap = qs('#tasteTags');
    wrap.innerHTML = tags.map(function (t) {
      return '<span class="taste-tag">' + t + '</span>';
    }).join('');
  }

  /* ---------- CTA: NOLI 시작하기 / 홈으로 바로가기 ---------- */
  function bindCta() {
    qs('#startBtn').addEventListener('click', function () {
      window.location.href = 'index.html';
    });
    qs('#goHomeBtn').addEventListener('click', function () {
      window.location.href = 'index.html';
    });
  }

  /* ---------- 초기화 ---------- */
  function init() {
    window.NoliData.getData();
    var user = window.NoliData.getUser();

    renderMessage(user);
    renderTasteTags();
    bindCta();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
