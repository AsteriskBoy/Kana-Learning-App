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
      height: 36px;
      background: #f7f3ed;
      border-bottom: 1px solid #e8e0d5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 12px 0 16px;
      -webkit-app-region: drag;
      z-index: 9999;
      user-select: none;
    }
    .titlebar-title {
      font-family: 'Noto Serif JP', serif;
      font-size: 12px;
      letter-spacing: 0.2em;
      color: #d9d0c2;
      font-weight: 300;
    }
    .titlebar-controls {
      display: flex;
      gap: 4px;
      -webkit-app-region: no-drag;
    }
    .tb-btn {
      width: 28px; height: 24px;
      background: none;
      border: none;
      border-radius: 4px;
      font-size: 12px;
      color: #8a7a6a;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.15s, color 0.15s;
      padding: 0;
    }
    .tb-btn:hover { background: rgba(26,20,16,0.08); color: #1a1410; }
    .tb-close:hover { background: #c0392b !important; color: #fff !important; }
    body { padding-top: 36px; }
  `;

  document.head.appendChild(style);
  document.body.insertBefore(bar, document.body.firstChild);

  // Wire up buttons only if running inside Electron
  if (window.electronAPI) {
    bar.querySelector('.tb-min').addEventListener('click', () => window.electronAPI.minimize());
    bar.querySelector('.tb-max').addEventListener('click', () => window.electronAPI.maximize());
    bar.querySelector('.tb-close').addEventListener('click', () => window.electronAPI.close());
  } else {
    // Running in browser — hide controls gracefully
    bar.querySelector('.titlebar-controls').style.display = 'none';
  }
})();
