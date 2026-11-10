
(function () {
  function setHead() {
    var h = document.querySelector('.top');
    if (h) document.documentElement.style.setProperty('--head', h.offsetHeight + 'px');
  }
  setHead();
  window.addEventListener('resize', setHead);
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
  var hash = (location.hash || '').replace('#', '');
  if (hash === 'fable' || hash === 'opus' || hash === 'compare') setMode(hash);
  else setMode('compare');
})();

  (function () {
    var bar = document.querySelector('.toolbar');
    if (!bar) return;
    document.querySelectorAll('.pair').forEach(function (p) {
      if (p.querySelector('.badge.miss')) p.classList.add('one-sided');
    });
    document.querySelectorAll('section.item').forEach(function (it) {
      if (!it.querySelector('.pair:not(.one-sided)')) it.classList.add('one-sided');
    });
    document.querySelectorAll('section.chapter').forEach(function (ch) {
      if (!ch.querySelector('section.item:not(.one-sided)')) ch.classList.add('one-sided-ch');
    });
    document.querySelectorAll('.chapters a').forEach(function (a) {
      var ch = document.getElementById((a.getAttribute('href') || '').slice(1));
      if (ch && ch.classList.contains('one-sided-ch')) a.classList.add('one-sided-ch');
    });
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'both-toggle';
    btn.textContent = '両方あるものだけ';
    function set(on) {
      document.body.classList.toggle('both-only', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      try { localStorage.setItem('v4-both-only', on ? '1' : '0'); } catch (e) {}
      setHead();
    }
    btn.addEventListener('click', function () { set(!document.body.classList.contains('both-only')); });
    bar.insertBefore(btn, bar.firstChild);
    var saved = null;
    try { saved = localStorage.getItem('v4-both-only'); } catch (e) {}
    set(saved !== '0');
  })();
