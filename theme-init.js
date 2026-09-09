(function () {
  var stored = localStorage.getItem('kana-theme');
  if (stored !== 'light' && stored !== 'dark') {
    var dm = localStorage.getItem('dm');
    stored = dm === '1' ? 'dark' : (dm === '0' ? 'light' : 'light');
  }
  var theme = stored === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  var paper = theme === 'light' ? '#f8f5ee' : '#13100e';
  var ink = theme === 'light' ? '#141210' : '#e8e0d5';
  document.documentElement.style.background = paper;

  var boot = document.createElement('style');
  boot.id = 'kana-theme-boot';
  boot.textContent = 'html,body{background-color:' + paper + ' !important;color:' + ink + ';}';
  (document.head || document.documentElement).appendChild(boot);

  function applyBody() {
    if (!document.body) return false;
    document.body.classList.toggle('dark', theme === 'dark');
    document.body.classList.toggle('light', theme === 'light');
    return true;
  }

  if (!applyBody()) {
    var obs = new MutationObserver(function () {
      if (applyBody()) obs.disconnect();
    });
    obs.observe(document.documentElement, { childList: true });
  }
})();
