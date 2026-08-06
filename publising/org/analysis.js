/* ============================================
   NOLI - analysis.js (상세 리포트 화면)
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

  /* ---------- 관람 트렌드 막대 그래프 렌더링 ---------- */
  function renderTrend() {
    var trend = window.NoliData.getViewingTrend();
    qs('#trendTotalCount').textContent = trend.totalCount;

    var maxCount = Math.max.apply(null, trend.months.map(function (m) { return m.count; }));
    var wrap = qs('#trendChart');

    wrap.innerHTML = trend.months.map(function (m) {
      var heightPct = Math.max(14, Math.round((m.count / maxCount) * 100));
      return (
        '<div class="trend-bar-col">' +
          (m.isCurrent ? '<span class="now-badge">NOW</span>' : '') +
          '<div class="trend-bar' + (m.isCurrent ? ' is-current' : '') + '" style="height:' + heightPct + '%"></div>' +
          '<span class="trend-month-label">' + m.label + '</span>' +
        '</div>'
      );
    }).join('');
  }

  /* ---------- 장르별 상세 분포 도넛 차트 렌더링 ---------- */
  function renderGenreDistribution() {
    var data = window.NoliData.getGenreDistribution();
    var r = 54;
    var circumference = 2 * Math.PI * r;
    var cumulativePct = 0;

    var segmentsSvg = data.map(function (d) {
      var dash = (d.percentage / 100) * circumference;
      var gap = circumference - dash;
      var offset = -((cumulativePct / 100) * circumference);
      cumulativePct += d.percentage;
      return (
        '<circle cx="64" cy="64" r="' + r + '" fill="none" stroke="' + d.color + '" stroke-width="20" ' +
          'stroke-dasharray="' + dash + ' ' + gap + '" stroke-dashoffset="' + offset + '"></circle>'
      );
    }).join('');

    qs('#donutSvg').innerHTML =
      '<circle cx="64" cy="64" r="' + r + '" fill="none" stroke="var(--color-disabled-bg)" stroke-width="20"></circle>' +
      segmentsSvg;

    var topGenre = data[0];
    qs('#donutPercent').textContent = topGenre.percentage + '%';
    qs('#donutGenreLabel').textContent = topGenre.genre;

    qs('#genreLegend').innerHTML = data.map(function (d) {
      return (
        '<div class="legend-row">' +
          '<span class="legend-dot" style="background:' + d.color + '"></span>' +
          '<span class="legend-label">' + d.genre + '</span>' +
          '<span class="legend-percent">' + d.percentage + '%</span>' +
        '</div>'
      );
    }).join('');
  }

  /* ---------- 최애 아티스트 랭킹 렌더링 ---------- */
  function renderArtistRanking() {
    var list = window.NoliData.getTopArtistsRanking();
    var wrap = qs('#artistRankingList');

    wrap.innerHTML = list.map(function (a) {
      return (
        '<div class="artist-rank-row">' +
          '<span class="rank-badge' + (a.rank === 1 ? ' rank-1' : '') + '">' + a.rank + '</span>' +
          '<span class="artist-rank-photo" data-fallback-initial="' + a.name.charAt(0) + '">' +
            '<img data-photo-url="' + a.photoUrl + '" alt="' + a.name + '" style="display:none;">' +
          '</span>' +
          '<div class="artist-rank-info">' +
            '<p class="artist-rank-name">' + a.name + '</p>' +
            '<p class="artist-rank-role">' + a.role + '</p>' +
          '</div>' +
          '<span class="artist-rank-count">' + a.count + '회</span>' +
        '</div>'
      );
    }).join('');

    wrap.querySelectorAll('.artist-rank-photo').forEach(function (photoEl) {
      var imgEl = photoEl.querySelector('img');
      var url = imgEl.getAttribute('data-photo-url');
      loadImageWithFallbacks(imgEl, fileCaseVariants(url), function () {
        photoEl.textContent = photoEl.getAttribute('data-fallback-initial');
      });
      imgEl.addEventListener('load', function () {
        imgEl.style.display = 'block';
      });
    });
  }

  /* ---------- 공유 (mock: 클립보드 복사 + 토스트) ---------- */
  function showToast(message) {
    var toast = qs('#toast');
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(showToast._timer);
    showToast._timer = window.setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 1800);
  }

  function handleShare() {
    var shareText = 'NOLI 상세 리포트 - ' + window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareText).then(function () {
        showToast('링크가 복사되었습니다 📋');
      }).catch(function () {
        showToast('링크가 복사되었습니다 📋');
      });
    } else {
      showToast('링크가 복사되었습니다 📋');
    }
  }

  function bindButtons() {
    qs('#backBtn').addEventListener('click', function () {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = 'mypage.html';
      }
    });
    qs('#shareBtn').addEventListener('click', handleShare);
    qs('#shareReportBtn').addEventListener('click', handleShare);
  }

  /* ---------- 초기화 ---------- */
  function init() {
    window.NoliData.getData();
    renderTrend();
    renderGenreDistribution();
    renderArtistRanking();
    bindButtons();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
