/* ============================================
   NOLI - index.js (메인 홈 화면)
   data.js의 데이터를 읽어 화면을 렌더링하고
   좋아요 토글 / 보관함 담기 인터랙션을 처리
   ============================================ */

   (function () {
    'use strict';
  
    var GENRE_EMOJI = {
      '콘서트': '🎤',
      '뮤지컬': '🎭',
      '밴드': '🎸',
      '댄스': '💃',
      '클래식': '🎻',
      '전시': '🎨'
    };
  
    var els = {};
    var currentPerformanceId = null;
  
    function qs(selector) {
      return document.querySelector(selector);
    }
  
    function cacheEls() {
      els.userName = qs('#userName');
      els.recommendCard = qs('#recommendCard');
      els.wishlistBtn = qs('#addToWishlistBtn');
      els.wishCount = qs('#wishCount');
      els.watchedCount = qs('#watchedCount');
    }
  
    /* ---------- 아이콘 (인라인 SVG) ---------- */
    var ICONS = {
      heart:
        '<svg viewBox="0 0 24 24"><path d="M12 20.5s-7.5-4.6-10-9.1C.4 8.2 2 4.8 5.4 4.1c2-.4 3.9.5 5 2.1 1.1-1.6 3-2.5 5-2.1 3.4.7 5 4.1 3.4 7.3-2.5 4.5-10 9.1-10 9.1z"/></svg>',
      heartOutline:
        '<svg viewBox="0 0 24 24"><path d="M12 20.5s-7.5-4.6-10-9.1C.4 8.2 2 4.8 5.4 4.1c2-.4 3.9.5 5 2.1 1.1-1.6 3-2.5 5-2.1 3.4.7 5 4.1 3.4 7.3-2.5 4.5-10 9.1-10 9.1z"/></svg>',
      ticket:
        '<svg viewBox="0 0 24 24"><path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8z"/><line x1="10" y1="6" x2="10" y2="18" stroke-dasharray="2 2"/></svg>',
      gear:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3.2"/><path d="M19.4 13.5a7.6 7.6 0 0 0 0-3l1.9-1.4-2-3.4-2.2.8a7.7 7.7 0 0 0-2.6-1.5L14 2.5h-4l-.5 2.5a7.7 7.7 0 0 0-2.6 1.5l-2.2-.8-2 3.4L4.6 10.5a7.6 7.6 0 0 0 0 3L2.7 15l2 3.4 2.2-.8c.75.65 1.63 1.15 2.6 1.5l.5 2.4h4l.5-2.5a7.7 7.7 0 0 0 2.6-1.5l2.2.8 2-3.4-1.9-1.4z"/></svg>',
      chevronRight:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>',
      sparkle:
        '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>',
      list:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="5" width="16" height="4" rx="1"/><rect x="4" y="11" width="16" height="4" rx="1"/><rect x="4" y="17" width="10" height="2" rx="1"/></svg>',
      archive:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M5 7v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7M9 11h6"/><path d="M3 4h18v3H3z"/></svg>',
      profile:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="3.4"/><path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6"/></svg>'
    };
  
    /* ---------- 추천 카드 렌더링 ---------- */
    function renderRecommendCard() {
      var performance = window.NoliData.getRecommendedPerformances()[0];
      if (!performance) {
        els.recommendCard.innerHTML = '<p class="empty-state">추천할 공연이 아직 없어요.</p>';
        return;
      }
      currentPerformanceId = performance.id;
      var emoji = GENRE_EMOJI[performance.genre] || '🎪';
  
      els.recommendCard.innerHTML =
        '<div class="poster">' +
          '<img class="poster-img" src="' + performance.posterUrl + '" alt="' + performance.title + ' 포스터" ' +
            'onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';">' +
          '<div class="poster-placeholder" style="display:none; background:' + posterGradient(performance.genre) + '">' +
            '<span class="poster-emoji">' + emoji + '</span>' +
          '</div>' +
          '<button class="like-btn' + (performance.liked ? ' is-liked' : '') + '" id="likeBtn" aria-pressed="' + performance.liked + '" aria-label="좋아요">' +
            (performance.liked ? ICONS.heart : ICONS.heartOutline) +
          '</button>' +
          '<div class="card-badges">' +
            '<span class="badge badge-primary">내 취향 일치 ' + performance.matchRate + '%</span>' +
            '<span class="badge badge-frost">' + performance.genre + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="card-body">' +
          '<p class="card-title">' + performance.title + '</p>' +
          '<p class="card-meta">' + performance.period + ' | ' + performance.venue + '</p>' +
        '</div>';
  
      qs('#likeBtn').addEventListener('click', handleLikeToggle);
      updateWishlistButtonState(performance);
    }
  
    function posterGradient(genre) {
      var map = {
        '뮤지컬': 'linear-gradient(160deg, #3B2A66 0%, #6B4FA0 35%, #7ED6A5 70%, #F2C9DC 100%)',
        '콘서트': 'linear-gradient(160deg, #241B3D 0%, #5B3E9E 45%, #A78BFA 100%)',
        '댄스': 'linear-gradient(160deg, #33204A 0%, #8A4E86 50%, #F0A6B8 100%)',
        '클래식': 'linear-gradient(160deg, #221C33 0%, #4F3E7A 50%, #C9B8FB 100%)',
        '밴드': 'linear-gradient(160deg, #1E1E2B 0%, #4A3F73 50%, #8B8BFA 100%)',
        '전시': 'linear-gradient(160deg, #2B1E2E 0%, #7A4B63 50%, #F6C9C0 100%)'
      };
      return map[genre] || 'linear-gradient(160deg, #2A2140 0%, #7C5CFC 60%, #F7F0EC 100%)';
    }
  
    /* ---------- 좋아요 토글 ---------- */
    function handleLikeToggle() {
      if (!currentPerformanceId) return;
      var updated = window.NoliData.toggleLike(currentPerformanceId);
      if (!updated) return;
      var btn = qs('#likeBtn');
      btn.classList.toggle('is-liked', updated.liked);
      btn.setAttribute('aria-pressed', String(updated.liked));
      btn.innerHTML = updated.liked ? ICONS.heart : ICONS.heartOutline;
    }
  
    /* ---------- 공연보관함에 담기 ---------- */
    function updateWishlistButtonState(performance) {
      if (performance.status === 'wish') {
        els.wishlistBtn.innerHTML = '<span class="btn-icon">✓</span> 공연보관함에 담김';
        els.wishlistBtn.classList.add('is-disabled');
        els.wishlistBtn.disabled = true;
      } else {
        els.wishlistBtn.innerHTML = '<span class="btn-icon">🔖</span> 공연보관함에 담기';
        els.wishlistBtn.classList.remove('is-disabled');
        els.wishlistBtn.disabled = false;
      }
    }
  
    function handleAddToWishlist() {
      if (!currentPerformanceId) return;
      var updated = window.NoliData.addToWishlist(currentPerformanceId);
      if (!updated) return;
      updateWishlistButtonState(updated);
      renderPlaylistCounts();
    }
  
    /* ---------- 플레이리스트 카운트 렌더링 ---------- */
    function renderPlaylistCounts() {
      els.wishCount.textContent = window.NoliData.getWishCount() + '개';
      els.watchedCount.textContent = window.NoliData.getWatchedCount() + '개';
    }
  
    /* ---------- 유저 이름 렌더링 ---------- */
    function renderUserName() {
      var user = window.NoliData.getUser();
      els.userName.textContent = user.name;
    }
  
    /* ---------- 초기화 ---------- */
    function init() {
      window.NoliData.getData(); // 데이터 초기화(최초 1회 localStorage 세팅)
      cacheEls();
      renderUserName();
      renderRecommendCard();
      renderPlaylistCounts();
      els.wishlistBtn.addEventListener('click', handleAddToWishlist);
    }
  
    document.addEventListener('DOMContentLoaded', init);
  })();