/* ============================================
   NOLI - login.js (로그인 화면)
   실제 OAuth 연동 없이, 각 로그인 버튼 클릭 시
   바로 index.html로 이동하는 mock 처리
   ============================================ */

(function () {
  'use strict';

  function goToHome() {
    window.location.href = 'index.html';
  }

  function init() {
    if (window.NoliData) window.NoliData.getData(); // 데이터 초기화(다른 화면과 동일)

    document.querySelectorAll('.login-btn').forEach(function (btn) {
      btn.addEventListener('click', goToHome);
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
