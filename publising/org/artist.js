/* ============================================
   NOLI - artist.js (관심 아티스트 선택 화면)
   검색 필터링 + 다중 선택 토글 + 설정 완료 버튼
   활성화 상태를 관리
   ============================================ */

(function () {
  'use strict';

  var AVATAR_COLORS = ['#A78BFA', '#F0A6B8', '#8B8BFA', '#D9A6E0', '#7ED6A5', '#F6C9C0'];

  var selectedIds = [];
  var searchKeyword = '';

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

  var CHECK_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">' +
    '<path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var SEARCH_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
    '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.5-4.5" stroke-linecap="round"/></svg>';

  /* ---------- 아티스트 그리드 렌더링 ---------- */
  function renderGrid() {
    var grid = qs('#artistGrid');
    var keyword = searchKeyword.trim().toLowerCase();
    var list = window.NoliData.ARTISTS.filter(function (a) {
      return !keyword || a.name.toLowerCase().indexOf(keyword) !== -1;
    });

    if (list.length === 0) {
      grid.innerHTML = '<p class="artist-empty-state">검색 결과가 없어요.</p>';
      return;
    }

    grid.innerHTML = list.map(function (a, idx) {
      var isSelected = selectedIds.indexOf(a.id) !== -1;
      var color = AVATAR_COLORS[idx % AVATAR_COLORS.length];
      return (
        '<button type="button" class="artist-card' + (isSelected ? ' is-selected' : '') + '" data-artist-id="' + a.id + '">' +
          '<span class="artist-photo-wrap">' +
            '<span class="artist-photo" style="background:' + color + '" data-fallback-initial="' + a.name.charAt(0) + '">' +
              '<img data-photo-url="' + a.photoUrl + '" alt="' + a.name + '" style="display:none;">' +
            '</span>' +
            '<span class="check-badge">' + CHECK_ICON + '</span>' +
          '</span>' +
          '<span class="artist-name">' + a.name + '</span>' +
        '</button>'
      );
    }).join('');

    /* 사진 로드 시도 → 실패하면 색상 원형 + 이니셜(span 텍스트) 유지 */
    grid.querySelectorAll('.artist-photo').forEach(function (photoEl) {
      var imgEl = photoEl.querySelector('img');
      var url = imgEl.getAttribute('data-photo-url');
      loadImageWithFallbacks(imgEl, fileCaseVariants(url), function () {
        photoEl.textContent = photoEl.getAttribute('data-fallback-initial');
      });
      imgEl.addEventListener('load', function () {
        imgEl.style.display = 'block';
      });
    });

    grid.querySelectorAll('.artist-card').forEach(function (card) {
      card.addEventListener('click', function () {
        toggleSelection(card.dataset.artistId);
        card.classList.toggle('is-selected');
        updateCtaState();
      });
    });
  }

  function toggleSelection(id) {
    var idx = selectedIds.indexOf(id);
    if (idx === -1) {
      selectedIds.push(id);
    } else {
      selectedIds.splice(idx, 1);
    }
  }

  /* ---------- 검색 입력 처리 ---------- */
  function bindSearch() {
    var input = qs('#artistSearchInput');
    input.addEventListener('input', function (e) {
      searchKeyword = e.target.value;
      renderGrid();
    });
  }

  /* ---------- 하단 CTA 버튼 상태 ---------- */
  function updateCtaState() {
    var btn = qs('#completeBtn');
    var hasSelection = selectedIds.length > 0;
    btn.disabled = !hasSelection;
    btn.classList.toggle('btn-primary', hasSelection);
    btn.classList.toggle('btn-disabled', !hasSelection);
  }

  function handleComplete() {
    if (selectedIds.length === 0) return;
    window.NoliData.updateFavoriteArtists(selectedIds);
    window.location.href = 'complete.html';
  }

  /* ---------- 뒤로가기 ---------- */
  function handleBack() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = 'add.html';
    }
  }

  /* ---------- 초기화 ---------- */
  function init() {
    window.NoliData.getData();

    var pref = window.NoliData.getUserPreference();
    selectedIds = (pref.favoriteArtistIds || []).slice();

    qs('#searchIconWrap').innerHTML = SEARCH_ICON;
    renderGrid();
    bindSearch();
    updateCtaState();

    qs('#completeBtn').addEventListener('click', handleComplete);
    qs('#backBtn').addEventListener('click', handleBack);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
