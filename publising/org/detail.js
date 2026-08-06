/* ============================================
   NOLI - detail.js (공연 상세 화면)
   ============================================ */

(function () {
  'use strict';

  var currentPerformanceId = null;

  function qs(selector) {
    return document.querySelector(selector);
  }

  function getRequestedPerformanceId() {
    var params = new URLSearchParams(window.location.search);
    return params.get('id') || 'perf_001'; // id 파라미터가 없으면 기본으로 위키드(perf_001) 표시
  }

  /* ---------- 파일명 대소문자 자동 탐색 (index.js와 동일한 유틸) ---------- */
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
    heartSmall:
      '<svg viewBox="0 0 24 24"><path d="M12 20.5s-7.5-4.6-10-9.1C.4 8.2 2 4.8 5.4 4.1c2-.4 3.9.5 5 2.1 1.1-1.6 3-2.5 5-2.1 3.4.7 5 4.1 3.4 7.3-2.5 4.5-10 9.1-10 9.1z"/></svg>',
    person:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="3.4"/><path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6"/></svg>',
    chevronDown:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  /* ---------- 히어로(포스터) 영역 렌더링 ---------- */
  function renderHero(p) {
    var img = qs('#posterImg');
    loadImageWithFallbacks(img, fileCaseVariants(p.posterUrl), function () {
      img.style.background = 'linear-gradient(160deg, #2A2140 0%, #7C5CFC 60%, #F7F0EC 100%)';
    });

    qs('#statusBadge').style.display = p.isRunning ? 'flex' : 'none';
    qs('#matchBadgeText').textContent = '내 취향 일치 ' + p.matchRate + '%';
    qs('#perfTitle').textContent = p.title;
    qs('#perfTagline').textContent = p.tagline || '';

    var chipsWrap = qs('#tagChips');
    chipsWrap.innerHTML = (p.tags || []).map(function (t) {
      return '<span class="tag-chip">' + t + '</span>';
    }).join('');
  }

  /* ---------- 추천 이유 카드 렌더링 ---------- */
  function renderReason(p) {
    var reason = p.recommendReason;
    if (!reason) return;
    qs('#reasonSummary').textContent = reason.summary;
    qs('#genrePrefValue').textContent = reason.genrePreferenceLabel;
    qs('#trendingValue').textContent = reason.trendingLabel;
  }

  /* ---------- 공연 상세 정보 렌더링 ---------- */
  function renderInfo(p) {
    qs('#periodValue').textContent = p.period;
    qs('#runtimeValue').textContent = p.runtimeText || '-';
    qs('#priceValue').textContent = p.priceRangeText || '-';
  }

  /* ---------- 시놉시스 렌더링 + 더 보기 토글 ---------- */
  function renderSynopsis(p) {
    var textEl = qs('#synopsisText');
    var toggleBtn = qs('#synopsisToggle');
    textEl.textContent = p.synopsis || '';

    toggleBtn.addEventListener('click', function () {
      var expanded = textEl.classList.toggle('is-expanded');
      toggleBtn.classList.toggle('is-expanded', expanded);
      toggleBtn.innerHTML = (expanded ? '접기' : '더 보기') + ' ' + ICONS.chevronDown;
    });
  }

  /* ---------- 출연진 렌더링 ---------- */
  function renderCast(p) {
    var wrap = qs('#castList');
    var cast = p.cast || [];

    wrap.innerHTML = cast.map(function (c) {
      return (
        '<div class="cast-item">' +
          '<div class="cast-photo">' +
            (c.photoUrl
              ? '<img data-photo-url="' + c.photoUrl + '" alt="' + c.name + '">'
              : ICONS.person.replace('<svg ', '<svg class="cast-placeholder-icon" ')) +
          '</div>' +
          '<p class="cast-name">' + c.name + '</p>' +
          '<p class="cast-role">' + c.role + '</p>' +
        '</div>'
      );
    }).join('');

    /* 사진이 있는 항목만 대소문자 자동 탐색 로더 적용 */
    wrap.querySelectorAll('img[data-photo-url]').forEach(function (imgEl) {
      var url = imgEl.getAttribute('data-photo-url');
      var parent = imgEl.parentElement;
      loadImageWithFallbacks(imgEl, fileCaseVariants(url), function () {
        parent.innerHTML = ICONS.person.replace('<svg ', '<svg class="cast-placeholder-icon" ');
      });
    });
  }

  /* ---------- 공연보관함에 담기 ---------- */
  function bindWishlistButton() {
    var btn = qs('#addToWishlistBtn');
    var performance = window.NoliData.getPerformanceById(currentPerformanceId);

    function updateBtnState() {
      if (performance && performance.status === 'wish') {
        btn.innerHTML = '✓ 공연보관함에 담김';
        btn.classList.add('is-disabled');
        btn.disabled = true;
      } else {
        btn.innerHTML = '+ 공연보관함에 담기';
        btn.classList.remove('is-disabled');
        btn.disabled = false;
      }
    }

    btn.addEventListener('click', function () {
      window.NoliData.addToWishlist(currentPerformanceId);
      performance = window.NoliData.getPerformanceById(currentPerformanceId);
      updateBtnState();
    });

    updateBtnState();
  }

  /* ---------- 뒤로가기 ---------- */
  function bindBackButtons() {
    function goBack() {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = 'index.html';
      }
    }
    qs('#backBtn').addEventListener('click', goBack);
    qs('#prevBtn').addEventListener('click', goBack);
  }

  /* ---------- 초기화 ---------- */
  function init() {
    window.NoliData.getData();

    currentPerformanceId = getRequestedPerformanceId();
    var performance = window.NoliData.getPerformanceById(currentPerformanceId);

    if (!performance) {
      qs('.detail-content').innerHTML = '<p class="empty-state">공연 정보를 찾을 수 없어요.</p>';
      return;
    }

    renderHero(performance);
    renderReason(performance);
    renderInfo(performance);
    renderSynopsis(performance);
    renderCast(performance);
    bindWishlistButton();
    bindBackButtons();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
