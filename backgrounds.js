(function () {
  const page = location.pathname.split('/').pop() || 'index.html';

  // Remove old seam line
  const seamFix = document.createElement('style');
  seamFix.textContent = `body::after { display: none !important; }`;
  document.head.appendChild(seamFix);

  const patterns = {
    'index.html': {
      color: '#13100e',
      gradient: 'none',
      svg: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='35'%3E%3Cellipse cx='30' cy='35' rx='30' ry='20' fill='none' stroke='%233a3028' stroke-width='0.8' opacity='0.6'/%3E%3Cellipse cx='0' cy='35' rx='30' ry='20' fill='none' stroke='%233a3028' stroke-width='0.8' opacity='0.6'/%3E%3Cellipse cx='60' cy='35' rx='30' ry='20' fill='none' stroke='%233a3028' stroke-width='0.8' opacity='0.6'/%3E%3Cellipse cx='15' cy='14' rx='30' ry='20' fill='none' stroke='%233a3028' stroke-width='0.8' opacity='0.35'/%3E%3Cellipse cx='45' cy='14' rx='30' ry='20' fill='none' stroke='%233a3028' stroke-width='0.8' opacity='0.35'/%3E%3C/svg%3E")`,
      size: '60px 35px',
    },
    'hiragana.html': {
      color: '#13100e',
      gradient: 'none',
      svg: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 0 L56 16 L56 50 L28 66 L0 50 L0 16 Z' fill='none' stroke='%233a3028' stroke-width='0.7' opacity='0.55'/%3E%3Cline x1='28' y1='0' x2='28' y2='66' stroke='%233a3028' stroke-width='0.5' opacity='0.3'/%3E%3Cline x1='0' y1='16' x2='56' y2='50' stroke='%233a3028' stroke-width='0.5' opacity='0.3'/%3E%3Cline x1='56' y1='16' x2='0' y2='50' stroke='%233a3028' stroke-width='0.5' opacity='0.3'/%3E%3Cpath d='M28 67 L56 83 L56 117 L28 133 L0 117 L0 83 Z' fill='none' stroke='%233a3028' stroke-width='0.7' opacity='0.55'/%3E%3Cline x1='28' y1='67' x2='28' y2='133' stroke='%233a3028' stroke-width='0.5' opacity='0.3'/%3E%3Cline x1='0' y1='83' x2='56' y2='117' stroke='%233a3028' stroke-width='0.5' opacity='0.3'/%3E%3Cline x1='56' y1='83' x2='0' y2='117' stroke='%233a3028' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
      size: '56px 100px',
    },
    'katakana.html': {
      color: '#13100e',
      gradient: 'none',
      svg: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='0' cy='0' r='20' fill='none' stroke='%233a3028' stroke-width='0.8' opacity='0.55'/%3E%3Ccircle cx='40' cy='0' r='20' fill='none' stroke='%233a3028' stroke-width='0.8' opacity='0.55'/%3E%3Ccircle cx='0' cy='40' r='20' fill='none' stroke='%233a3028' stroke-width='0.8' opacity='0.55'/%3E%3Ccircle cx='40' cy='40' r='20' fill='none' stroke='%233a3028' stroke-width='0.8' opacity='0.55'/%3E%3Ccircle cx='20' cy='20' r='20' fill='none' stroke='%233a3028' stroke-width='0.8' opacity='0.55'/%3E%3C/svg%3E")`,
      size: '40px 40px',
    },
    'kanji.html': {
      color: '#13100e',
      gradient: 'none',
      svg: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cpath d='M0 12 L12 12 L12 0 M36 0 L36 12 L48 12 M48 36 L36 36 L36 48 M12 48 L12 36 L0 36' stroke='%233a3028' stroke-width='1' fill='none' opacity='0.6'/%3E%3Cpath d='M16 16 L32 16 L32 32 L16 32 Z' stroke='%233a3028' stroke-width='0.6' fill='none' opacity='0.35'/%3E%3Cpath d='M0 24 L16 24 M32 24 L48 24 M24 0 L24 16 M24 32 L24 48' stroke='%233a3028' stroke-width='0.6' fill='none' opacity='0.25'/%3E%3C/svg%3E")`,
      size: '48px 48px',
    },
  };

  // Fallback: use index pattern for vocab/quiz pages (same dark base)
  const p = patterns[page] || patterns['index.html'];

  const bgStyle = document.createElement('style');
  bgStyle.textContent = `
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      background-color: ${p.color};
      background-image: ${p.gradient === 'none' ? p.svg : `${p.gradient}, ${p.svg}`};
      background-size: auto, ${p.size};
    }
  `;
  document.head.appendChild(bgStyle);

})();
