/* ============================================
   NOLI - splash.js (스플래시 화면)
   진입 시 progress bar 애니메이션 실행 후
   자동으로 index.html로 전환
   ============================================ */

(function () {
  'use strict';

  var PROGRESS_DURATION_MS = 2400; // splash.css의 transition 시간과 동일하게 유지
  var REDIRECT_BUFFER_MS = 300;    // 애니메이션 종료 후 자연스러운 여유 시간
  var NEXT_PAGE = 'index.html';

  function init() {
    var fill = document.getElementById('progressFill');

    // 최초 로드 시 데이터 초기화 (localStorage 세팅) — 메인 화면 진입 전에 준비
    if (window.NoliData && typeof window.NoliData.getData === 'function') {
      window.NoliData.getData();
    }

    // 다음 프레임에서 width를 100%로 바꿔야 CSS transition이 정상 동작함
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        if (fill) fill.style.width = '100%';
      });
    });

    window.setTimeout(function () {
      window.location.href = NEXT_PAGE;
    }, PROGRESS_DURATION_MS + REDIRECT_BUFFER_MS);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
