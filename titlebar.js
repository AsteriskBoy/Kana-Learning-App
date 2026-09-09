// Injects a custom frameless title bar into the page
(function () {
  const bar = document.createElement('div');
  bar.id = 'custom-titlebar';
  bar.innerHTML = `
    <span class="titlebar-title">仮名 · 漢字</span>
    <div class="titlebar-controls">
      <button class="tb-btn tb-min" title="Minimise">&#x2013;</button>
      <button class="tb-btn tb-max" title="Maximise">&#x25A1;</button>
      <button class="tb-btn tb-close" title="Close">&#x2715;</button>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    #custom-titlebar {
      position: fixed;
      top: 0; left: 0; right: 0;
      height: 38px;
      background: var(--paper, #f8f5ee);
      border-bottom: 1px solid var(--tile-border, #dcd3c4);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 12px 0 16px;
      -webkit-app-region: drag;
      z-index: 9999;
      user-select: none;
      transition: background-color 0.25s ease, border-color 0.25s ease;
    }
    .titlebar-title {
      font-family: 'Shippori Mincho B1', 'Noto Serif JP', serif;
      font-size: 13px;
      letter-spacing: 0.18em;
      color: var(--gold, #856114);
      font-weight: 600;
      transition: color 0.25s ease;
    }
    .titlebar-controls {
      display: flex;
      align-items: center;
      gap: 6px;
      -webkit-app-region: no-drag;
    }
    .tb-btn {
      width: 28px; height: 26px;
      background: none;
      border: none;
      border-radius: 5px;
      font-size: 12px;
      color: var(--ink-soft, #42382e);
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.15s, color 0.15s;
      padding: 0;
    }
    .tb-btn:hover { background: rgba(20,18,16,0.08); color: var(--ink, #141210); }
    .tb-close:hover { background: #c0392b !important; color: #fff !important; }
    body { padding-top: 38px; }
  `;

  document.head.appendChild(style);
  document.body.insertBefore(bar, document.body.firstChild);

  // Wire up window buttons only if running inside Electron
  if (window.electronAPI) {
    bar.querySelector('.tb-min').addEventListener('click', () => window.electronAPI.minimize());
    bar.querySelector('.tb-max').addEventListener('click', () => window.electronAPI.maximize());
    bar.querySelector('.tb-close').addEventListener('click', () => window.electronAPI.close());
  } else {
    // Running in browser — hide only native window controls, keep theme toggle
    bar.querySelectorAll('.tb-min, .tb-max, .tb-close').forEach(b => b.style.display = 'none');
  }
})();
