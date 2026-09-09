(function () {
  const seamFix = document.createElement('style');
  seamFix.textContent = `body::after { display: none !important; }`;
  document.head.appendChild(seamFix);

  const bgStyle = document.createElement('style');
  bgStyle.id = 'kana-bg-pattern';
  document.head.appendChild(bgStyle);

  function currentTheme() {
    const stored = localStorage.getItem('kana-theme');
    if (stored === 'light' || stored === 'dark') return stored;
    const dm = localStorage.getItem('dm');
    if (dm === '1') return 'dark';
    if (dm === '0') return 'light';
    if (document.body && document.body.classList.contains('dark')) return 'dark';
    return 'light';
  }

  function applyBackground(theme) {
    const isDark = theme === 'dark';
    const bgUrl = isDark ? 'assets/fuji-dark.jpg' : 'assets/fuji-light.jpg';
    const opacity = isDark ? '0.35' : '0.28';

    bgStyle.textContent = `
      body::before {
        content: '' !important;
        position: fixed !important;
        inset: 0 !important;
        pointer-events: none !important;
        z-index: 0 !important;
        background-image: url('${bgUrl}') !important;
        background-size: cover !important;
        background-position: center bottom !important;
        background-repeat: no-repeat !important;
        opacity: ${opacity} !important;
        transition: opacity 0.35s ease, background-image 0.35s ease !important;
      }
    `;
  }

  applyBackground(currentTheme());

  window.addEventListener('kana-theme-change', (e) => {
    applyBackground(e.detail === 'light' ? 'light' : 'dark');
  });
})();
