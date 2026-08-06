/* ============================================
   NOLI - mypage.js (마이페이지 화면)
   ============================================ */

(function () {
  'use strict';

  function qs(selector) {
    return document.querySelector(selector);
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
    ticket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8z"/><line x1="10" y1="6" x2="10" y2="18" stroke-dasharray="2 2"/></svg>'
  };

  function genreIcon(genreName) {
    var found = window.NoliData.GENRE_OPTIONS.find(function (g) { return g.key === genreName; });
    return found ? found.icon : '🎪';
  }

  /* ---------- 프로필 카드 렌더링 ---------- */
  function renderProfile() {
    var user = window.NoliData.getUser();
    var avatarImg = qs('#profileAvatarImg');

    loadImageWithFallbacks(avatarImg, fileCaseVariants(user.avatarUrl), function () {
      avatarImg.style.display = 'none';
    });
    avatarImg.addEventListener('load', function () {
      avatarImg.style.display = 'block';
    });

    qs('#levelBadge').textContent = 'LV.' + user.level;
    qs('#profileName').textContent = user.name + ' 님';
    qs('#profileTitles').innerHTML = user.titles.map(function (t) {
      return '<span class="title-badge">' + t + '</span>';
    }).join('');

    var stack = qs('#genreIconStack');
    var iconsHtml = user.favoriteGenreIcons.map(function (g) {
      return '<span class="genre-icon-circle" title="' + g + '">' + genreIcon(g) + '</span>';
    }).join('');
    if (user.favoriteGenreExtraCount > 0) {
      iconsHtml += '<span class="genre-icon-circle extra-count">+' + user.favoriteGenreExtraCount + '</span>';
    }
    stack.innerHTML = iconsHtml;
  }

  /* ---------- 취향 대시보드 렌더링 ---------- */
  function renderTasteDashboard() {
    var dash = window.NoliData.getTasteDashboard();
    qs('#topGenreIcon').textContent = genreIcon(dash.topGenre);
    qs('#topGenreValue').textContent = dash.topGenre;
    qs('#matchRateValue').textContent = dash.curationMatchRate + '%';
  }

  /* ---------- 나의 공연 기억 렌더링 ---------- */
  function renderMemories() {
    var wrap = qs('#memoryGrid');
    var memories = window.NoliData.getMemoryPerformances();

    wrap.innerHTML = memories.map(function (m) {
      return (
        '<div class="memory-card">' +
          '<div class="memory-poster">' +
            '<span class="memory-date-badge">' + m.viewedDateLabel + '</span>' +
            '<img data-photo-url="' + m.posterUrl + '" alt="' + m.title + '" style="display:none;">' +
          '</div>' +
          '<p class="memory-title">' + m.title + '</p>' +
          '<p class="memory-venue">' + m.venue + '</p>' +
        '</div>'
      );
    }).join('');

    wrap.querySelectorAll('img[data-photo-url]').forEach(function (imgEl) {
      var url = imgEl.getAttribute('data-photo-url');
      var parent = imgEl.closest('.memory-poster');
      loadImageWithFallbacks(imgEl, fileCaseVariants(url), function () {
        parent.style.background = 'linear-gradient(160deg, #2A2140 0%, #7C5CFC 60%, #F7F0EC 100%)';
      });
      imgEl.addEventListener('load', function () {
        imgEl.style.display = 'block';
      });
    });
  }

  /* ---------- 로그아웃 ---------- */
  function bindLogout() {
    qs('#logoutLink').addEventListener('click', function (e) {
      e.preventDefault();
      window.location.href = 'login.html';
    });
  }

  /* ---------- 빠른 메뉴 (공연 보관함으로 이동) ---------- */
  function bindFabTicket() {
    qs('#fabTicket').addEventListener('click', function () {
      window.location.href = 'play.html';
    });
  }

  /* ---------- 초기화 ---------- */
  function init() {
    window.NoliData.getData();

    qs('#fabTicket').innerHTML = ICONS.ticket;
    bindFabTicket();

    renderProfile();
    renderTasteDashboard();
    renderMemories();
    bindLogout();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
