/* ==========================================================================
   NOLI - splash.js
   스플래시 화면 : 로고 노출 후 자동으로 다음 화면으로 전환합니다.
   - 취향설정을 이미 완료한 사용자(userPreference.completed === true) → 메인 화면
   - 아직 완료하지 않은 사용자 → 취향설정 화면
   ========================================================================== */

const NOLI_SPLASH = (() => {
  const AUTO_TRANSITION_DELAY = 1800; // ms

  /* 로고 SVG (폰트 미사용, 벡터 도형으로 이미지 시안을 재현)
     한 문서 안에 스플래시/로그인 등 여러 곳에서 동시에 쓰일 수 있어,
     gradient id가 충돌하지 않도록 uid를 받아 매번 고유한 id를 생성한다.
     (동일 id가 중복되면, 먼저 나온 요소가 display:none 조상 안에 있을 때
     뒤에 나온 요소까지 그라데이션이 깨져 보이지 않는 문제가 있었음) */
  function buildLogoSvg(uid) {
    const letterGradId = `letterGrad-${uid}`;
    const ticketGradId = `ticketGrad-${uid}`;
    return `
    <svg viewBox="0 0 420 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="NOLI">
      <defs>
        <!-- 세로선처럼 bbox 폭이 0인 도형에서도 깨지지 않도록 userSpaceOnUse 좌표계 사용 -->
        <linearGradient id="${letterGradId}" gradientUnits="userSpaceOnUse" x1="0" y1="18" x2="0" y2="152">
          <stop offset="0%" stop-color="#B7A2F7"/>
          <stop offset="45%" stop-color="#8B5CF6"/>
          <stop offset="100%" stop-color="#5B21B6"/>
        </linearGradient>
        <linearGradient id="${ticketGradId}" gradientUnits="userSpaceOnUse" x1="121" y1="25" x2="199" y2="147">
          <stop offset="0%" stop-color="#C9B7FA"/>
          <stop offset="55%" stop-color="#8B5CF6"/>
          <stop offset="100%" stop-color="#5B21B6"/>
        </linearGradient>
      </defs>

      <!-- N -->
      <path d="M35,148 L35,22 L100,148 L100,22" fill="none" stroke="url(#${letterGradId})"
        stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/>

      <!-- O 자리 : 티켓 + 음표 아이콘 -->
      <g transform="translate(160,85) rotate(-9) translate(-160,-85)">
        <path fill-rule="evenodd" fill="url(#${ticketGradId})" d="
          M142,25 h36 a21,21 0 0 1 21,21 v78 a21,21 0 0 1 -21,21 h-36
          a21,21 0 0 1 -21,-21 v-78 a21,21 0 0 1 21,-21 Z
          M199,38 m-13,0 a13,13 0 1,0 26,0 a13,13 0 1,0 -26,0
          M121,132 m-13,0 a13,13 0 1,0 26,0 a13,13 0 1,0 -26,0
        "/>
        <!-- 음표(비음표) -->
        <g fill="#FFFFFF">
          <rect x="147" y="50" width="6" height="38" rx="3"/>
          <rect x="171" y="43" width="6" height="45" rx="3"/>
          <rect x="147" y="46" width="30" height="9" rx="4"/>
          <ellipse cx="145" cy="90" rx="10" ry="7.5" transform="rotate(-12 145 90)"/>
          <ellipse cx="169" cy="90" rx="10" ry="7.5" transform="rotate(-12 169 90)"/>
        </g>
      </g>

      <!-- L -->
      <path d="M235,22 L235,148 L296,148" fill="none" stroke="url(#${letterGradId})"
        stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/>

      <!-- I -->
      <path d="M347,22 L347,148" fill="none" stroke="url(#${letterGradId})"
        stroke-width="30" stroke-linecap="round"/>

      <!-- 반짝임 (sparkle) -->
      <g fill="#9F7DEB">
        <path opacity="0.9" transform="translate(151,8) scale(1.15)" d="M0,-11 C2,-3 3,-2 11,0 C3,2 2,3 0,11 C-2,3 -3,2 -11,0 C-3,-2 -2,-3 0,-11 Z">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2.2s" repeatCount="indefinite" begin="0s"/>
        </path>
        <path opacity="0.7" transform="translate(200,2) scale(0.6)" d="M0,-11 C2,-3 3,-2 11,0 C3,2 2,3 0,11 C-2,3 -3,2 -11,0 C-3,-2 -2,-3 0,-11 Z">
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.2s" repeatCount="indefinite" begin="0.4s"/>
        </path>
        <path opacity="0.85" transform="translate(228,58) scale(0.85)" d="M0,-11 C2,-3 3,-2 11,0 C3,2 2,3 0,11 C-2,3 -3,2 -11,0 C-3,-2 -2,-3 0,-11 Z">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2.4s" repeatCount="indefinite" begin="0.8s"/>
        </path>
        <path opacity="0.6" transform="translate(103,52) scale(0.55)" d="M0,-11 C2,-3 3,-2 11,0 C3,2 2,3 0,11 C-2,3 -3,2 -11,0 C-3,-2 -2,-3 0,-11 Z">
          <animate attributeName="opacity" values="0.35;0.85;0.35" dur="2s" repeatCount="indefinite" begin="0.2s"/>
        </path>
        <path opacity="0.55" transform="translate(96,122) scale(0.45)" d="M0,-11 C2,-3 3,-2 11,0 C3,2 2,3 0,11 C-2,3 -3,2 -11,0 C-3,-2 -2,-3 0,-11 Z">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.6s" repeatCount="indefinite" begin="1s"/>
        </path>
        <path opacity="0.8" transform="translate(216,142) scale(0.7)" d="M0,-11 C2,-3 3,-2 11,0 C3,2 2,3 0,11 C-2,3 -3,2 -11,0 C-3,-2 -2,-3 0,-11 Z">
          <animate attributeName="opacity" values="0.45;0.95;0.45" dur="2.3s" repeatCount="indefinite" begin="0.6s"/>
        </path>
      </g>
    </svg>
  `;
  }

  function render() {
    const root = document.getElementById("screen-splash");
    if (!root) return;
    root.innerHTML = `
      <div class="splash-logo-wrap">${buildLogoSvg("splash")}</div>
    `;
  }

  // 다른 화면(login 등)에서도 동일한 로고 벡터를 재사용할 수 있도록 노출
  // (호출할 때마다 고유 id를 가진 새 SVG 마크업을 생성해준다)
  window.NOLI_ASSETS = window.NOLI_ASSETS || {};
  window.NOLI_ASSETS.buildLogoSvg = buildLogoSvg;

  /** 스플래시 노출 후 다음 화면(로그인 → 취향설정 or 메인)으로 자동 전환 */
  function scheduleAutoTransition() {
    setTimeout(() => {
      const { session, userPreference } = window.NOLI_DATA;
      let nextScreen = "login";
      if (session.isLoggedIn) {
        nextScreen = userPreference.completed ? "main" : "favorite";
      }
      NOLI_ROUTER.showScreen(nextScreen);
    }, AUTO_TRANSITION_DELAY);
  }

  function init() {
    render();
    NOLI_ROUTER.showScreen("splash");
    scheduleAutoTransition();
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", () => {
  NOLI_SPLASH.init();
});
