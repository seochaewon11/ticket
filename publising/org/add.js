/* ============================================
   NOLI - add.js (취향설정 화면)
   장르/분위기 다중 선택 → data.js에 저장
   → 저장 즉시 index.html 추천 리스트에 반영되도록
     matchRate 재계산 후 메인 화면으로 이동
   ============================================ */

(function () {
  'use strict';

  var TONE_MAP = { purple: 'tone-purple', pink: 'tone-pink', tan: 'tone-tan' };

  var selectedGenres = [];
  var selectedMoods = [];

  function qs(selector) {
    return document.querySelector(selector);
  }

  /* ---------- 장르 카드 그리드 렌더링 ---------- */
  function renderGenreGrid() {
    var grid = qs('#genreGrid');
    var options = window.NoliData.GENRE_OPTIONS;

    grid.innerHTML = options.map(function (opt) {
      return (
        '<button type="button" class="genre-card" data-genre="' + opt.key + '">' +
          '<span class="genre-icon ' + TONE_MAP[opt.color] + '">' + opt.icon + '</span>' +
          '<span class="genre-label">' + opt.key + '</span>' +
        '</button>'
      );
    }).join('');

    grid.querySelectorAll('.genre-card').forEach(function (card) {
      card.addEventListener('click', function () {
        toggleSelection(selectedGenres, card.dataset.genre);
        card.classList.toggle('is-selected');
      });
    });
  }

  /* ---------- 분위기 태그 렌더링 ---------- */
  function renderMoodTags() {
    var wrap = qs('#moodTags');
    var options = window.NoliData.MOOD_OPTIONS;

    wrap.innerHTML = options.map(function (mood) {
      return '<button type="button" class="mood-tag" data-mood="' + mood + '">' + mood + '</button>';
    }).join('');

    wrap.querySelectorAll('.mood-tag').forEach(function (tag) {
      tag.addEventListener('click', function () {
        toggleSelection(selectedMoods, tag.dataset.mood);
        tag.classList.toggle('is-selected');
      });
    });
  }

  /* ---------- 배열 내 값 토글 유틸 ---------- */
  function toggleSelection(list, value) {
    var idx = list.indexOf(value);
    if (idx === -1) {
      list.push(value);
    } else {
      list.splice(idx, 1);
    }
  }

  /* ---------- 저장 후 메인 화면 이동 ---------- */
  function handleSubmit() {
    window.NoliData.updatePreference(selectedGenres, selectedMoods);
    window.location.href = 'index.html';
  }

  /* ---------- 뒤로가기 ---------- */
  function handleBack() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = 'index.html';
    }
  }

  function init() {
    window.NoliData.getData(); // 데이터 초기화

    // 기존에 저장된 취향이 있다면 선택 상태를 미리 반영
    var pref = window.NoliData.getUserPreference();
    selectedGenres = (pref.favoriteGenres || []).slice();
    selectedMoods = (pref.favoriteMoods || []).slice();

    renderGenreGrid();
    renderMoodTags();

    // 기존 선택값 하이라이트 반영
    document.querySelectorAll('.genre-card').forEach(function (card) {
      if (selectedGenres.indexOf(card.dataset.genre) !== -1) {
        card.classList.add('is-selected');
      }
    });
    document.querySelectorAll('.mood-tag').forEach(function (tag) {
      if (selectedMoods.indexOf(tag.dataset.mood) !== -1) {
        tag.classList.add('is-selected');
      }
    });

    qs('#nextStepBtn').addEventListener('click', handleSubmit);
    qs('#backBtn').addEventListener('click', handleBack);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
