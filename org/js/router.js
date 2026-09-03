/* ==========================================================================
   NOLI - router.js
   페이지 이동 없이 .screen 요소를 토글하여 화면을 전환하는 공통 로직입니다.
   각 화면 js(splash.js / favorite.js / main.js)는 이 함수를 호출해 화면을 바꿉니다.
   ========================================================================== */

const NOLI_ROUTER = (() => {
  /**
   * 지정한 id의 화면(section#screen-*)만 active 상태로 만듭니다.
   * @param {"splash"|"favorite"|"main"} screenName
   */
  function showScreen(screenName) {
    const targetId = `screen-${screenName}`;
    // 대상 화면 요소가 현재 문서에 없으면 아무 것도 하지 않는다.
    // (splash.html/favorite.html/main.html처럼 화면을 1개만 담은 개별 파일에서
    //  다른 화면으로의 자동/수동 전환 로직이 실행되어도 화면이 빈 채로 남지 않도록 방어)
    if (!document.getElementById(targetId)) return;

    document.querySelectorAll(".screen").forEach((el) => {
      el.classList.toggle("active", el.id === targetId);
    });
    window.scrollTo(0, 0);
  }

  return { showScreen };
})();
