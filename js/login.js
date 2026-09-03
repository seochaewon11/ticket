/* ==========================================================================
   NOLI - login.js
   로그인 화면 : 로고 렌더링 + 로그인 버튼(소셜/이메일) 클릭 시 다음 화면 이동
   실제 OAuth/이메일 인증은 없고, UI 흐름만 동작합니다.
   ========================================================================== */

const NOLI_LOGIN = (() => {
  const ICONS = {
    google: `<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M23.5 12.27c0-.82-.07-1.6-.2-2.36H12v4.47h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3h3.88c2.27-2.09 3.55-5.17 3.55-8.73Z"/><path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.95H1.26v3.1C3.24 21.3 7.29 24 12 24Z"/><path fill="#FBBC05" d="M5.27 14.3a7.2 7.2 0 0 1 0-4.6v-3.1H1.26a12 12 0 0 0 0 10.8l4.01-3.1Z"/><path fill="#EA4335" d="M12 4.75c1.76 0 3.34.6 4.59 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.29 0 3.24 2.7 1.26 6.6l4.01 3.1C6.22 6.86 8.87 4.75 12 4.75Z"/></svg>`,
    kakao: `<svg viewBox="0 0 24 24" fill="none" stroke="#391B1B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4.5c-5 0-9 3.1-9 7 0 2.5 1.7 4.7 4.2 6l-1 3.3c-.1.3.2.6.5.4l3.9-2.4c.5.05 1 .07 1.4.07 5 0 9-3.1 9-7s-4-7-9-7Z" fill="#391B1B" stroke="none" opacity=".9"/></svg>`,
    naver: `<svg viewBox="0 0 24 24" fill="#fff"><path d="M14.4 12.9 9.6 6H6v12h4.1v-6.9L14.9 18H18.5V6h-4.1v6.9Z"/></svg>`,
    mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/></svg>`,
  };

  function render() {
    const root = document.getElementById("screen-login");
    if (!root) return;

    const logoSvg =
      (window.NOLI_ASSETS && window.NOLI_ASSETS.buildLogoSvg && window.NOLI_ASSETS.buildLogoSvg("login")) || "";

    root.innerHTML = `
      <div class="login-body">
        <div class="login-brand">
          <div class="login-logo-wrap">${logoSvg}</div>
          <p class="login-tagline">일상에 문화를 더하다, NOLI</p>
        </div>

        <div class="login-social-row">
          <button class="social-btn social-btn--google" data-action="login" aria-label="구글로 로그인">${ICONS.google}</button>
          <button class="social-btn social-btn--kakao" data-action="login" aria-label="카카오로 로그인">${ICONS.kakao}</button>
          <button class="social-btn social-btn--naver" data-action="login" aria-label="네이버로 로그인">${ICONS.naver}</button>
        </div>

        <button class="btn btn--primary login-email-btn" data-action="login">
          ${ICONS.mail} 이메일로 로그인
        </button>

        <p class="login-links">
          <button type="button" data-action="login">NOLI 회원가입</button>
          <span class="divider">·</span>
          <button type="button" data-action="login">비밀번호 찾기</button>
        </p>

        <div class="login-bottom-space"></div>
      </div>
    `;

    bindEvents(root);
  }

  function bindEvents(root) {
    root.addEventListener("click", (e) => {
      const btn = e.target.closest('[data-action="login"]');
      if (!btn) return;
      handleLogin();
    });
  }

  function handleLogin() {
    const { session, userPreference } = window.NOLI_DATA;
    session.isLoggedIn = true;
    const nextScreen = userPreference.completed ? "main" : "favorite";
    NOLI_ROUTER.showScreen(nextScreen);
  }

  return { render };
})();

document.addEventListener("DOMContentLoaded", () => {
  NOLI_LOGIN.render();
});
