
(function () {
  function setHead() {
    var h = document.querySelector('.top');
    if (h) document.documentElement.style.setProperty('--head', h.offsetHeight + 'px');
  }
  setHead();
  window.addEventListener('resize', setHead);

  var snippets = window.__SNIPPETS || {};
  document.querySelectorAll('details.codebox').forEach(function (box) {
    box.addEventListener('toggle', function () {
      if (!box.open) return;
      var pre = box.querySelector('.copy-src');
      var code = pre.getAttribute('data-code');
      if (pre.textContent === '' && snippets[code]) pre.textContent = snippets[code];
    });
  });
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var code = btn.getAttribute('data-code');
      var text = snippets[code] || '';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          btn.textContent = 'コピーした';
          setTimeout(function () { btn.textContent = 'コピー'; }, 1200);
        });
      }
    });
  });
})();
