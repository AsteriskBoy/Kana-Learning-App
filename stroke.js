// ── Stroke-order animation modal ──
// Needs strokes.js (window.KANA_STROKES, derived from KanjiVG, CC BY-SA 3.0).
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const SPEEDS = [
    { label: 'Slow', ms: 1100 },
    { label: 'Normal', ms: 700 },
    { label: 'Fast', ms: 380 },
  ];
  let speedIdx = 1;
  try {
    const s = parseInt(localStorage.getItem('kana-stroke-speed'), 10);
    if (s >= 0 && s < SPEEDS.length) speedIdx = s;
  } catch (e) {}

  const style = document.createElement('style');
  style.textContent = `
    .stroke-btn {
      position: absolute; top: 4px; left: 6px;
      font-size: 11px; line-height: 1; padding: 2px 3px;
      color: var(--gold); opacity: 0; cursor: pointer;
      transition: opacity 0.2s ease, color 0.2s ease, transform 0.15s ease;
    }
    .tile:hover .stroke-btn { opacity: 0.7; }
    .stroke-btn:hover { opacity: 1 !important; color: var(--vermillion); transform: scale(1.25); }

    .so-overlay {
      position: fixed; inset: 0; z-index: 10000;
      background: rgba(10, 8, 6, 0.55);
      backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
      display: flex; align-items: center; justify-content: center;
      padding: 24px; opacity: 0; transition: opacity 0.2s ease;
    }
    .so-overlay.open { opacity: 1; }
    .so-card {
      background: var(--tile-bg); color: var(--ink);
      border: 1px solid var(--tile-border); border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.35);
      padding: 26px 28px 20px; max-width: 94vw; max-height: 92vh; overflow: auto;
      text-align: center; position: relative;
      transform: translateY(10px) scale(0.98); transition: transform 0.25s ease;
    }
    .so-overlay.open .so-card { transform: none; }
    .so-close {
      position: absolute; top: 8px; right: 10px; background: none; border: none;
      color: var(--ink-soft); font-size: 16px; cursor: pointer; padding: 4px 8px; border-radius: 5px;
    }
    .so-close:hover { color: var(--vermillion); }
    .so-title { font-family: 'Lora', serif; font-size: 0.72rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); margin-bottom: 4px; }
    .so-romaji { font-family: 'Playfair Display', serif; font-size: 1.15rem; color: var(--ink); margin-bottom: 14px; }
    .so-row { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
    .so-svg {
      width: 220px; height: 220px; max-width: 40vw; max-height: 40vw;
      background: var(--paper); border: 1px solid var(--tile-border); border-radius: 8px;
    }
    .so-row.single .so-svg { width: 280px; height: 280px; max-width: 70vw; max-height: 70vw; }
    .so-guide { stroke: var(--tile-border); stroke-width: 0.6; stroke-dasharray: 3 3; fill: none; opacity: 0.8; }
    .so-ghost { stroke: var(--tile-border); stroke-width: 4; fill: none; stroke-linecap: round; stroke-linejoin: round; opacity: 0.55; }
    .so-stroke { stroke: var(--ink); stroke-width: 4.5; fill: none; stroke-linecap: round; stroke-linejoin: round; }
    .so-stroke.active { stroke: var(--vermillion); }
    .so-num { font-family: 'Lora', serif; font-size: 7px; fill: var(--vermillion); opacity: 0; transition: opacity 0.25s ease; text-anchor: start; }
    .so-num.show { opacity: 1; }
    .so-controls { display: flex; gap: 8px; justify-content: center; margin-top: 16px; flex-wrap: wrap; }
    .so-btn {
      font-family: 'Lora', serif; font-size: 0.8rem; letter-spacing: 0.06em;
      padding: 7px 14px; border-radius: 6px; cursor: pointer;
      background: none; color: var(--ink-soft); border: 1px solid var(--tile-border);
      transition: border-color 0.2s, color 0.2s, background 0.2s;
    }
    .so-btn:hover { border-color: var(--vermillion); color: var(--vermillion); }
    .so-btn.primary { background: var(--vermillion); border-color: var(--vermillion); color: #fff; }
    .so-btn.primary:hover { opacity: 0.88; color: #fff; }
    .so-credit { margin-top: 14px; font-family: 'Lora', serif; font-size: 0.62rem; letter-spacing: 0.08em; color: var(--gold); opacity: 0.8; font-style: italic; }
    @media (prefers-reduced-motion: reduce) { .so-overlay, .so-card { transition: none; } }
  `;
  document.head.appendChild(style);

  let overlay = null;
  let runId = 0;
  let state = null; // { glyphs: [{strokes:[{path,num,len}]}], flat:[...] }

  function el(name, attrs) {
    const e = document.createElementNS(NS, name);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  function buildGlyph(ch) {
    const data = (window.KANA_STROKES || {})[ch];
    if (!data) return null;
    const svg = el('svg', { viewBox: '0 0 109 109', class: 'so-svg' });
    svg.appendChild(el('line', { x1: 54.5, y1: 4, x2: 54.5, y2: 105, class: 'so-guide' }));
    svg.appendChild(el('line', { x1: 4, y1: 54.5, x2: 105, y2: 54.5, class: 'so-guide' }));
    data.p.forEach(d => svg.appendChild(el('path', { d, class: 'so-ghost' })));
    const strokes = data.p.map((d, i) => {
      const path = el('path', { d, class: 'so-stroke' });
      path.style.visibility = 'hidden';
      svg.appendChild(path);
      const n = data.n[i];
      const num = el('text', { x: n[0], y: n[1], class: 'so-num' });
      num.textContent = String(i + 1);
      svg.appendChild(num);
      return { path, num, len: 0 };
    });
    return { ch, svg, strokes };
  }

  function resetGlyphs() {
    state.flat.forEach(s => {
      s.path.getAnimations().forEach(a => a.cancel());
      s.path.style.visibility = 'hidden';
      s.path.classList.remove('active');
      s.num.classList.remove('show');
    });
  }

  function showStatic(s) {
    s.path.style.visibility = 'visible';
    s.path.style.strokeDasharray = '';
    s.path.style.strokeDashoffset = '';
    s.path.classList.remove('active');
    s.num.classList.add('show');
  }

  function drawStroke(s, ms) {
    return new Promise(resolve => {
      const len = s.path.getTotalLength();
      s.len = len;
      s.path.style.strokeDasharray = len;
      s.path.style.strokeDashoffset = len;
      s.path.style.visibility = 'visible';
      s.path.classList.add('active');
      s.num.classList.add('show');
      const dur = Math.max(220, Math.min(ms, ms * (len / 70)));
      const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const anim = s.path.animate(
        [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
        { duration: reduce ? 1 : dur, easing: 'ease-in-out', fill: 'forwards' }
      );
      anim.onfinish = () => { showStatic(s); resolve(true); };
      anim.oncancel = () => resolve(false);
    });
  }

  async function play() {
    const my = ++runId;
    resetGlyphs();
    setPlaying(true);
    state.step = 0;
    for (const s of state.flat) {
      if (my !== runId) return;
      const ok = await drawStroke(s, SPEEDS[speedIdx].ms);
      if (!ok || my !== runId) return;
      state.step++;
      await new Promise(r => setTimeout(r, 180));
    }
    if (my === runId) setPlaying(false);
  }

  function stepNext() {
    runId++; // cancel any running playback
    setPlaying(false);
    if (state.step >= state.flat.length) {
      state.step = 0;
      resetGlyphs();
    }
    // Show everything before the current step statically, animate the new stroke
    state.flat.forEach((s, i) => { if (i < state.step) { s.path.getAnimations().forEach(a => a.cancel()); showStatic(s); } });
    const s = state.flat[state.step];
    state.step++;
    drawStroke(s, SPEEDS[speedIdx].ms);
  }

  let playBtn = null;
  function setPlaying(p) {
    if (playBtn) playBtn.textContent = p ? '↻ Restart' : '▶ Replay';
  }

  function close() {
    if (!overlay) return;
    runId++;
    const o = overlay;
    overlay = null;
    state = null;
    o.classList.remove('open');
    setTimeout(() => o.remove(), 200);
  }

  window.showStrokeOrder = function (text, romaji) {
    if (overlay) close();
    const chars = Array.from(text);
    const glyphs = chars.map(buildGlyph).filter(Boolean);
    if (!glyphs.length) return;

    overlay = document.createElement('div');
    overlay.className = 'so-overlay';
    overlay.innerHTML = `
      <div class="so-card" role="dialog" aria-label="Stroke order">
        <button class="so-close" title="Close (Esc)">✕</button>
        <div class="so-title">Stroke order · 書き順</div>
        <div class="so-romaji"></div>
        <div class="so-row ${glyphs.length === 1 ? 'single' : ''}"></div>
        <div class="so-controls">
          <button class="so-btn primary so-play">▶ Replay</button>
          <button class="so-btn so-step">Step ›</button>
          <button class="so-btn so-speed"></button>
        </div>
        <div class="so-credit">Stroke data: KanjiVG (CC BY-SA 3.0)</div>
      </div>`;
    const row = overlay.querySelector('.so-row');
    glyphs.forEach(g => row.appendChild(g.svg));
    overlay.querySelector('.so-romaji').textContent = text + (romaji ? '  ·  ' + romaji : '');

    document.body.appendChild(overlay);
    state = { glyphs, flat: glyphs.flatMap(g => g.strokes), step: 0 };

    playBtn = overlay.querySelector('.so-play');
    const speedBtn = overlay.querySelector('.so-speed');
    const updSpeed = () => { speedBtn.textContent = 'Speed: ' + SPEEDS[speedIdx].label; };
    updSpeed();

    playBtn.addEventListener('click', play);
    overlay.querySelector('.so-step').addEventListener('click', stepNext);
    speedBtn.addEventListener('click', () => {
      speedIdx = (speedIdx + 1) % SPEEDS.length;
      try { localStorage.setItem('kana-stroke-speed', String(speedIdx)); } catch (e) {}
      updSpeed();
    });
    overlay.querySelector('.so-close').addEventListener('click', close);
    overlay.addEventListener('mousedown', e => { if (e.target === overlay) close(); });

    requestAnimationFrame(() => overlay && overlay.classList.add('open'));
    setTimeout(() => { if (overlay && state) play(); }, 250);
  };

  // Capture Esc before nav.js so it closes the modal instead of leaving the page
  window.addEventListener('keydown', e => {
    if (!overlay) return;
    if (e.key === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); close(); }
    else if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); play(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); stepNext(); }
  }, true);
})();
