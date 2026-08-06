/* ============================================
   NOLI - play.js (공연 플레이리스트 화면)
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
    heart: '<svg viewBox="0 0 24 24"><path d="M12 20.5s-7.5-4.6-10-9.1C.4 8.2 2 4.8 5.4 4.1c2-.4 3.9.5 5 2.1 1.1-1.6 3-2.5 5-2.1 3.4.7 5 4.1 3.4 7.3-2.5 4.5-10 9.1-10 9.1z"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><path d="M8.3 10.7l7.4-4.2M8.3 13.3l7.4 4.2"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg>'
  };

  /* ---------- 플레이리스트 카드 렌더링 ---------- */
  function renderPlaylists() {
    var wrap = qs('#playlistList');
    var playlists = window.NoliData.getPlaylists();

    wrap.innerHTML = playlists.map(function (p) {
      var saved = window.NoliData.isPlaylistSaved(p.id);
      var avatars = p.collaboratorPhotos
        ? p.collaboratorPhotos.map(function (url) {
          return '<span class="avatar-dot"><img src="' + url + '" alt=""></span>';
        }).join('')
        : p.collaboratorColors.map(function (c) {
          return '<span class="avatar-dot" style="background:' + c + '"></span>';
        }).join('');

      return (
        '<article class="playlist-card">' +
          '<div class="playlist-cover" style="background: ' + p.coverGradient + ';">' +
            (p.coverImageUrl ? '<img class="playlist-cover-img" src="' + p.coverImageUrl + '" alt="' + p.title + '">' : '') +
            '<span class="like-badge">' + ICONS.heart + '<span>' + p.likeCount + '</span></span>' +
          '</div>' +
          '<div class="playlist-body">' +
            '<h3 style="color:' + p.accentColor + '">' + p.title + '</h3>' +
            '<p class="playlist-tagline">' + p.tagline + '</p>' +
            '<div class="playlist-footer">' +
              '<div class="avatar-stack">' + avatars + '</div>' +
              '<div class="footer-actions">' +
                '<button type="button" class="share-btn" aria-label="공유">' + ICONS.share + '</button>' +
                '<button type="button" class="save-btn' + (saved ? ' is-saved' : '') + '" style="background:' + p.buttonBg + '" data-playlist-id="' + p.id + '">' +
                  (saved ? '담김' : '담기') +
                '</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }).join('');

    wrap.querySelectorAll('.save-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.dataset.playlistId;
        var nowSaved = window.NoliData.togglePlaylistSaved(id);
        btn.textContent = nowSaved ? '담김' : '담기';
        btn.classList.toggle('is-saved', nowSaved);
      });
    });
  }

  /* ---------- 최근 본 공연 추천 렌더링 ---------- */
  function renderRecentlyViewed() {
    var wrap = qs('#recentScroll');
    var items = window.NoliData.getRecentlyViewed();

    wrap.innerHTML = items.map(function (item) {
      return (
        '<div class="recent-item">' +
          '<div class="recent-poster">' +
            '<img data-photo-url="' + item.posterUrl + '" alt="' + item.title + ' 포스터" style="display:none;">' +
          '</div>' +
          '<p class="recent-title">' + item.title + '</p>' +
          '<p class="recent-venue">' + item.venue + '</p>' +
        '</div>'
      );
    }).join('');

    wrap.querySelectorAll('img[data-photo-url]').forEach(function (imgEl) {
      var url = imgEl.getAttribute('data-photo-url');
      var parent = imgEl.closest('.recent-poster');
      loadImageWithFallbacks(imgEl, fileCaseVariants(url), function () {
        imgEl.style.display = 'none';
        parent.style.background = 'linear-gradient(160deg, #2A2140 0%, #7C5CFC 60%, #F7F0EC 100%)';
      });
      imgEl.addEventListener('load', function () {
        imgEl.style.display = 'block';
      });
    });
  }

  /* ---------- 초기화 ---------- */
  function init() {
    window.NoliData.getData();
    qs('#fabAdd').innerHTML = ICONS.plus;
    renderPlaylists();
    renderRecentlyViewed();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
