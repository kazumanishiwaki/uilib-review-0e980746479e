
(function () {
  function setHead() {
    var h = document.querySelector('.top');
    if (h) document.documentElement.style.setProperty('--head', h.offsetHeight + 'px');
  }
  setHead();
  window.addEventListener('resize', setHead);

  document.querySelectorAll('.pair').forEach(function (p) {
    var hasF = !!p.querySelector('.card.fable-col .stage > :not(.empty)');
    var hasO = !!p.querySelector('.card.opus-col .stage > :not(.empty)');
    var fMiss = !!p.querySelector('.card.fable-col .badge.miss');
    var oMiss = !!p.querySelector('.card.opus-col .badge.miss');
    if (fMiss || oMiss || !(hasF && hasO)) p.classList.add('one-sided');
    if (fMiss || !hasF) p.classList.add('no-fable');
    if (oMiss || !hasO) p.classList.add('no-opus');
  });
  document.querySelectorAll('section.item').forEach(function (it) {
    if (!it.querySelector('.pair:not(.one-sided)')) it.classList.add('one-sided');
    if (!it.querySelector('.pair:not(.no-opus)')) it.classList.add('no-opus');
    if (!it.querySelector('.pair:not(.no-fable)')) it.classList.add('no-fable');
  });
  document.querySelectorAll('section.chapter').forEach(function (ch) {
    if (!ch.querySelector('section.item:not(.one-sided)')) ch.classList.add('one-sided-ch');
    if (!ch.querySelector('section.item:not(.no-opus)')) ch.classList.add('no-opus');
    if (!ch.querySelector('section.item:not(.no-fable)')) ch.classList.add('no-fable');
  });
  document.querySelectorAll('.chapters a').forEach(function (a) {
    var ch = document.getElementById((a.getAttribute('href') || '').slice(1));
    if (!ch) return;
    if (ch.classList.contains('one-sided-ch')) a.classList.add('one-sided-ch');
    if (ch.classList.contains('no-opus')) a.classList.add('no-opus');
    if (ch.classList.contains('no-fable')) a.classList.add('no-fable');
  });

  var buttons = document.querySelectorAll('.tog[data-mode] button');
  function setMode(mode) {
    document.body.classList.remove('mode-compare', 'mode-fable', 'mode-opus');
    document.body.classList.add('mode-' + mode);
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-mode') === mode ? 'true' : 'false'); });
    try { history.replaceState(null, '', '#' + mode); } catch (e) {}
    setHead();
  }
  buttons.forEach(function (b) {
    b.addEventListener('click', function () { setMode(b.getAttribute('data-mode')); });
  });

  var bar = document.querySelector('.toolbar');
  var bothBtn = document.createElement('button');
  bothBtn.type = 'button';
  bothBtn.className = 'both-toggle';
  bothBtn.textContent = '両方あるものだけ';
  bothBtn.title = '比較表示のときだけ効きます';
  function setBoth(on) {
    document.body.classList.toggle('both-only', on);
    bothBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    try { localStorage.setItem('v4-both-only', on ? '1' : '0'); } catch (e) {}
    setHead();
  }
  bothBtn.addEventListener('click', function () { setBoth(!document.body.classList.contains('both-only')); });
  if (bar) bar.insertBefore(bothBtn, bar.firstChild);
  var saved = null;
  try { saved = localStorage.getItem('v4-both-only'); } catch (e) {}
  setBoth(saved !== '0');

  var tagBtns = document.querySelectorAll('.tag-filters button');
  function setTag(tag) {
    ['ウェブサイト', 'ランディングページ', 'ダッシュボード', '共通'].forEach(function (t) {
      document.body.classList.remove('filter-' + t);
    });
    if (tag) document.body.classList.add('filter-' + tag);
    tagBtns.forEach(function (b) {
      b.setAttribute('aria-pressed', (b.getAttribute('data-tag') || '') === tag ? 'true' : 'false');
    });
    try { localStorage.setItem('v4-tag', tag || ''); } catch (e) {}
    setHead();
  }
  tagBtns.forEach(function (b) {
    b.addEventListener('click', function () { setTag(b.getAttribute('data-tag') || ''); });
  });
  var savedTag = '';
  try { savedTag = localStorage.getItem('v4-tag') || ''; } catch (e) {}
  if (savedTag) setTag(savedTag);

  var hash = (location.hash || '').replace('#', '');
  if (hash === 'fable' || hash === 'opus' || hash === 'compare') setMode(hash);
  else setMode('opus');
  setHead();
})();
