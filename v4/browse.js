
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
