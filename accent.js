// ── UI accent colour (6 options) ──
// Drives --vermillion (card borders, highlights, hover text) and --gold (muted text)
// without touching card / tile backgrounds. Load in <head> right after theme-init.js.
(function () {
  const KEY = 'kana-accent';

  // v/vs/rgb = main accent, soft variant, "r,g,b" for glows; g = muted text tone.
  // `null` for the default (original orange-red) leaves the page's own colours alone.
  const ACCENTS = [
    { id: 'shu',    name: 'Shu 朱 · Vermillion', swatch: '#d9503c',
      light: { rgb: '184,50,36' }, dark: { rgb: '224,90,71' } },
    { id: 'sakura', name: 'Sakura 桜 · Pink',    swatch: '#d9507f',
      light: { v: '#c2406f', vs: '#d8628c', rgb: '194,64,111', g: '#9a3b60' },
      dark:  { v: '#e0608f', vs: '#ea84ab', rgb: '224,96,143', g: '#e9a0bb' } },
    { id: 'matcha', name: 'Matcha 抹茶 · Green', swatch: '#6b9a30',
      light: { v: '#557c25', vs: '#6f9a3a', rgb: '85,124,37',  g: '#4a6a22' },
      dark:  { v: '#7ba43f', vs: '#97bd5c', rgb: '123,164,63', g: '#b4d58a' } },
    { id: 'ai',     name: 'Ai 藍 · Indigo',      swatch: '#3f74c9',
      light: { v: '#2c5aa3', vs: '#4478c2', rgb: '44,90,163',  g: '#2a4f8c' },
      dark:  { v: '#4f86d8', vs: '#78a4e6', rgb: '79,134,216', g: '#9dc0f0' } },
    { id: 'fuji',   name: 'Fuji 藤 · Wisteria',  swatch: '#8257c4',
      light: { v: '#764bb0', vs: '#9163c9', rgb: '118,75,176', g: '#66409a' },
      dark:  { v: '#9066cf', vs: '#ab88de', rgb: '144,102,207', g: '#c3aaf0' } },
    { id: 'asagi',  name: 'Asagi 浅葱 · Teal',   swatch: '#1f9a94',
      light: { v: '#1b7f7f', vs: '#2a9d9d', rgb: '27,127,127', g: '#176b6b' },
      dark:  { v: '#1fa39a', vs: '#45bdb4', rgb: '31,163,154', g: '#8fe0d8' } },
  ];

  function stored() {
    try {
      const id = localStorage.getItem(KEY);
      if (ACCENTS.some(a => a.id === id)) return id;
    } catch (e) {}
    return ACCENTS[0].id;
  }

  const styleEl = document.createElement('style');
  styleEl.id = 'kana-accent-style';
  (document.head || document.documentElement).appendChild(styleEl);

  function block(sel, t) {
    let css = `${sel}{--vermillion-rgb:${t.rgb} !important;`;
    if (t.v) css += `--vermillion:${t.v} !important;--vermillion-soft:${t.vs} !important;--gold:${t.g} !important;`;
    return css + '}';
  }

  function paint(id) {
    const a = ACCENTS.find(x => x.id === id) || ACCENTS[0];
    styleEl.textContent =
      block('html body', a.light) + block('html body.dark', a.dark) +
      '.kana-accent-picker{order:-2;}.tb-theme-toggle{order:-1;}';
    document.querySelectorAll('.kana-accent-dot').forEach(d => {
      const on = d.dataset.accent === id;
      d.classList.toggle('active', on);
      d.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  function setAccent(id) {
    try { localStorage.setItem(KEY, id); } catch (e) {}
    paint(id);
    window.dispatchEvent(new CustomEvent('kana-accent-change', { detail: id }));
  }

  paint(stored());

  window.kanaAccent = {
    set: setAccent,
    next() { setAccent(ACCENTS[(ACCENTS.findIndex(x => x.id === stored()) + 1) % ACCENTS.length].id); },
    open() { setOpen(true); },
  };

  // ── Titlebar picker ──
  const pickerCss = document.createElement('style');
  pickerCss.textContent = `
    .kana-accent-picker {
      display: inline-flex; align-items: center; height: 26px;
      border-radius: 13px; overflow: hidden; white-space: nowrap;
      background: var(--tile-bg); border: 1px solid var(--tile-border);
      transition: background-color 0.25s ease, border-color 0.25s ease;
    }
    .kana-accent-picker:hover, .kana-accent-picker.open { border-color: var(--vermillion); }
    .kana-accent-label {
      font-family: 'Lora', serif; font-size: 0.7rem; letter-spacing: 0.14em;
      text-transform: uppercase; color: var(--ink-soft);
      background: none; border: none; cursor: pointer; height: 100%;
      padding: 0 13px; max-width: 90px; opacity: 1; overflow: hidden;
      transition: max-width 0.3s ease, padding 0.3s ease, opacity 0.2s ease, color 0.2s ease;
    }
    .kana-accent-picker:hover .kana-accent-label { color: var(--vermillion); }
    .kana-accent-picker.open .kana-accent-label { max-width: 0; padding: 0; opacity: 0; pointer-events: none; }
    .kana-accent-dots {
      display: inline-flex; align-items: center; gap: 7px;
      max-width: 0; padding: 0; opacity: 0; overflow: hidden; visibility: hidden;
      transition: max-width 0.32s ease, padding 0.32s ease, opacity 0.25s ease 0.05s, visibility 0s linear 0.32s;
    }
    .kana-accent-picker.open .kana-accent-dots {
      max-width: 160px; padding: 0 10px; opacity: 1; visibility: visible;
      transition: max-width 0.32s ease, padding 0.32s ease, opacity 0.25s ease 0.05s, visibility 0s;
    }
    .kana-accent-dot {
      width: 13px; height: 13px; padding: 0; border-radius: 50%;
      border: none; cursor: pointer; flex-shrink: 0;
      transition: transform 0.15s ease, box-shadow 0.2s ease;
    }
    .kana-accent-dot:hover { transform: scale(1.2); }
    .kana-accent-dot.active {
      box-shadow: 0 0 0 2px var(--tile-bg), 0 0 0 3.5px var(--ink-soft, #888);
    }
    @media (prefers-reduced-motion: reduce) {
      .kana-accent-label, .kana-accent-dots { transition: none; }
    }
  `;
  document.head.appendChild(pickerCss);

  let pickerEl = null;
  let closeTimer = null;
  function setOpen(open, restoreFocus) {
    if (!pickerEl) return;
    clearTimeout(closeTimer);
    pickerEl.classList.toggle('open', open);
    const lbl = pickerEl.querySelector('.kana-accent-label');
    if (lbl) lbl.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) {
      // Move focus to the active swatch so arrow keys work straight away
      setTimeout(() => {
        const d = pickerEl && (pickerEl.querySelector('.kana-accent-dot.active') || pickerEl.querySelector('.kana-accent-dot'));
        if (d && pickerEl.classList.contains('open')) d.focus();
      }, 30);
    } else if (restoreFocus && lbl) {
      setTimeout(() => { if (pickerEl && !pickerEl.classList.contains('open')) lbl.focus(); }, 340);
    }
  }

  document.addEventListener('mousedown', e => {
    if (pickerEl && pickerEl.classList.contains('open') && !pickerEl.contains(e.target)) setOpen(false);
  });
  // Capture Esc before nav.js so it collapses the picker instead of leaving the page
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && pickerEl && pickerEl.classList.contains('open')) {
      e.preventDefault(); e.stopImmediatePropagation(); setOpen(false, pickerEl.contains(document.activeElement));
    }
  }, true);

  let observer = null;
  function mount() {
    const controls = document.querySelector('.titlebar-controls');
    if (!controls) return;
    if (controls.querySelector('.kana-accent-picker')) { if (observer) observer.disconnect(); return; }
    const wrap = document.createElement('div');
    wrap.className = 'kana-accent-picker';
    wrap.setAttribute('role', 'group');
    wrap.setAttribute('aria-label', 'Accent colour');

    const label = document.createElement('button');
    label.type = 'button';
    label.className = 'kana-accent-label';
    label.textContent = 'Theme';
    label.title = 'Change accent colour';
    label.setAttribute('aria-expanded', 'false');
    label.addEventListener('click', () => setOpen(true));
    wrap.appendChild(label);

    const dots = document.createElement('div');
    dots.className = 'kana-accent-dots';
    ACCENTS.forEach(a => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'kana-accent-dot';
      b.dataset.accent = a.id;
      b.style.background = a.swatch;
      b.title = a.name;
      b.setAttribute('aria-label', a.name);
      b.addEventListener('click', () => {
        setAccent(a.id);
        const fromKeyboard = document.activeElement === b;
        closeTimer = setTimeout(() => setOpen(false, fromKeyboard), 450);
      });
      b.addEventListener('keydown', e => {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        const all = [...wrap.querySelectorAll('.kana-accent-dot')];
        const i = all.indexOf(b);
        const n = all[(i + (e.key === 'ArrowRight' ? 1 : all.length - 1)) % all.length];
        e.preventDefault(); n.focus();
      });
      dots.appendChild(b);
    });
    wrap.appendChild(dots);
    pickerEl = wrap;
    controls.insertBefore(wrap, controls.firstChild);
    paint(stored());
    if (observer) observer.disconnect();
  }

  function init() {
    mount();
    observer = new MutationObserver(mount);
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  // Keep other windows (e.g. pre-loaded main window vs splash) in sync
  window.addEventListener('storage', e => { if (e.key === KEY || e.key === null) paint(stored()); });
  window.addEventListener('focus', () => paint(stored()));
})();
