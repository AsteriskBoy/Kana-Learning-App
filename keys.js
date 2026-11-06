// ── Keyboard navigation & shortcuts ──
// Arrow keys move between blocks/options, Enter/Space activates, letters are shortcuts,
// "?" shows a cheat-sheet. Works on every page (splash, index, kana pages, quizzes).
(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  const isSplash = page === 'splash.html';
  const isIndex = page === 'index.html';
  const isKana = page === 'hiragana.html' || page === 'katakana.html';
  const isQuiz = page === 'quiz.html' || page === 'quiz_katakana.html';

  // ── Styles: focus ring + help overlay ──
  const style = document.createElement('style');
  style.textContent = `
    html { scroll-padding-top: 64px; scroll-padding-bottom: 36px; }
    .tile:focus-visible, .card:focus-visible, .q-opt:focus-visible, .type-opt:focus-visible,
    .page-btn:focus-visible, .quiz-link:focus-visible, .start-btn:focus-visible,
    .results-btn:focus-visible, .quiz-next-btn:focus-visible, .ack-btn:focus-visible,
    .quiz-audio-btn:focus-visible, .quiz-char:focus-visible, .btn:focus-visible,
    .tb-btn:focus-visible, .tb-theme-toggle:focus-visible,
    .kana-accent-label:focus-visible, .kana-accent-dot:focus-visible {
      outline: 2px solid var(--vermillion); outline-offset: 3px;
    }
    .tile:focus-visible, .card:focus-visible { border-color: var(--vermillion) !important; }
    .tile:focus-visible .tile-char, .card:focus-visible .card-glyph { color: var(--vermillion) !important; }
    .quiz-char:focus-visible { border-radius: 8px; }

    .kb-overlay {
      position: fixed; inset: 0; z-index: 10001;
      background: rgba(10, 8, 6, 0.55); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
      display: flex; align-items: center; justify-content: center; padding: 24px;
      opacity: 0; transition: opacity 0.18s ease;
    }
    .kb-overlay.open { opacity: 1; }
    .kb-card {
      background: var(--tile-bg); color: var(--ink); border: 1px solid var(--tile-border);
      border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.35);
      padding: 24px 28px 18px; width: 460px; max-width: 94vw; max-height: 88vh; overflow: auto;
    }
    .kb-title { font-family: 'Lora', serif; font-size: 0.72rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); text-align: center; margin-bottom: 14px; }
    .kb-group { font-family: 'Lora', serif; font-size: 0.64rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--vermillion); margin: 14px 0 6px; }
    .kb-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 5px 0; border-bottom: 1px solid var(--tile-border); font-family: 'Lora', serif; font-size: 0.82rem; color: var(--ink-soft); }
    .kb-row:last-child { border-bottom: none; }
    .kb-keys { display: flex; gap: 4px; flex-shrink: 0; }
    .kb-key {
      font-family: 'Lora', serif; font-size: 0.72rem; min-width: 22px; text-align: center;
      padding: 2px 7px; border-radius: 5px; color: var(--ink);
      background: var(--paper); border: 1px solid var(--tile-border); border-bottom-width: 2px;
    }
    .kb-foot { margin-top: 14px; text-align: center; font-family: 'Lora', serif; font-size: 0.66rem; font-style: italic; color: var(--gold); }
  `;
  document.head.appendChild(style);

  // ── Helpers ──
  const isVisible = el => {
    if (!el || !el.getClientRects().length) return false;
    const cs = getComputedStyle(el);
    return cs.visibility !== 'hidden' && cs.display !== 'none';
  };
  const isTyping = el => !!(el && el.matches && el.matches('input, textarea, select, [contenteditable="true"]'));
  const quizScreenOpen = () => {
    const q = document.getElementById('quiz-screen');
    return !!q && q.style.display !== 'none' && isVisible(q);
  };
  const setupScreenOpen = () => {
    const s = document.getElementById('setup-screen');
    return !!s && s.style.display !== 'none' && isVisible(s);
  };
  const clickIf = sel => {
    const el = document.querySelector(sel);
    if (el && isVisible(el)) { el.click(); return true; }
    return false;
  };

  // ── Make custom blocks focusable (roving tabindex for tiles) ──
  const CUSTOM = '.tile, .q-opt, .type-opt, .quiz-char';
  let rover = null;
  function enhance() {
    document.querySelectorAll(CUSTOM).forEach(el => {
      if (el.hasAttribute('data-kb')) return;
      el.setAttribute('data-kb', '1');
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', el.classList.contains('tile') ? '-1' : '0');
    });
    if (!rover || !rover.isConnected || !isVisible(rover)) {
      if (rover) rover.setAttribute('tabindex', '-1');
      rover = [...document.querySelectorAll('.tile')].find(isVisible) || null;
      if (rover) rover.setAttribute('tabindex', '0');
    }
  }
  document.addEventListener('focusin', e => {
    const t = e.target;
    if (t && t.classList && t.classList.contains('tile') && t !== rover) {
      if (rover) rover.setAttribute('tabindex', '-1');
      t.setAttribute('tabindex', '0');
      rover = t;
    }
  });
  let raf = 0;
  const schedule = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(enhance); };
  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'] });
  document.addEventListener('click', schedule);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', enhance);
  else enhance();

  // ── Spatial arrow navigation ──
  const CAND_SEL = 'a[href], button:not([disabled]), [tabindex], .tile';
  function candidates() {
    const seen = new Set();
    return [...document.querySelectorAll(CAND_SEL)].filter(el => {
      if (seen.has(el)) return false;
      seen.add(el);
      if (el.closest('#custom-titlebar') || el.closest('.kb-overlay') || el.closest('.so-overlay')) return false;
      if (el.matches('input, textarea, select')) return false;
      return isVisible(el);
    });
  }
  function move(dir) {
    const list = candidates();
    if (!list.length) return false;
    const active = document.activeElement;
    let cur = list.includes(active) ? active : null;
    if (!cur) {
      const first = (rover && list.includes(rover)) ? rover : list[0];
      first.focus();
      return true;
    }
    const cr = cur.getBoundingClientRect();
    const cx = cr.left + cr.width / 2, cy = cr.top + cr.height / 2;
    let best = null, bestScore = Infinity;
    for (const el of list) {
      if (el === cur) continue;
      const r = el.getBoundingClientRect();
      const dx = (r.left + r.width / 2) - cx;
      const dy = (r.top + r.height / 2) - cy;
      let primary, secondary;
      if (dir === 'ArrowRight') { primary = dx; secondary = Math.abs(dy); }
      else if (dir === 'ArrowLeft') { primary = -dx; secondary = Math.abs(dy); }
      else if (dir === 'ArrowDown') { primary = dy; secondary = Math.abs(dx); }
      else { primary = -dy; secondary = Math.abs(dx); }
      if (primary <= 2) continue;
      if (secondary > primary * 2 + 40) continue; // keep within a ~65° cone
      const score = primary + secondary * 2;
      if (score < bestScore) { bestScore = score; best = el; }
    }
    if (best) { best.focus(); return true; }
    return false;
  }

  // ── Help overlay ──
  let helpEl = null;
  const K = (...keys) => keys;
  function helpSections() {
    const common = ['Everywhere', [
      [K('?'), 'Show / hide this help'],
      [K('T'), 'Toggle light / dark mode'],
      [K('C'), 'Cycle accent colour'],
      [K('Esc'), 'Go back / close'],
      [K('Tab'), 'Move through buttons'],
    ]];
    if (isIndex) return [['Home', [
      [K('←', '→'), 'Move between cards'],
      [K('Enter'), 'Open selected script'],
      [K('H'), 'Open Hiragana'],
      [K('K'), 'Open Katakana'],
    ]], common];
    if (isKana) return [['Kana chart', [
      [K('←', '↑', '↓', '→'), 'Move between blocks'],
      [K('Enter'), 'Hear pronunciation'],
      [K('S'), 'Show stroke order (focused block)'],
      ...(document.querySelector('.page-btn') ? [
        [K('1'), 'Standard page'],
        [K('2'), 'Extended sounds page'],
      ] : []),
      [K('Q'), 'Open the quiz'],
    ]], ['Stroke-order window', [
      [K('Space'), 'Replay'],
      [K('→'), 'Next stroke'],
      [K('Esc'), 'Close'],
    ]], common];
    if (isQuiz) return [['Setup', [
      [K('←', '↑', '↓', '→'), 'Move between options'],
      [K('Enter'), 'Select option · Start (if nothing focused)'],
      [K('1–5'), 'Pick number of questions'],
    ]], ['During the quiz', [
      [K('Type'), 'Your romaji answer'],
      [K('Enter'), 'Submit · Next question'],
      [K('Alt', 'L'), 'Listen to the sound'],
      [K('Esc'), 'Back to setup'],
    ]], ['Results', [
      [K('Enter'), 'Continue / Play again'],
      [K('Esc'), 'Back to setup'],
    ]], common];
    return [common];
  }
  function toggleHelp(force) {
    if (isSplash) return;
    const open = force !== undefined ? force : !helpEl;
    if (!open) {
      if (!helpEl) return;
      const el = helpEl; helpEl = null;
      el.classList.remove('open');
      setTimeout(() => el.remove(), 180);
      return;
    }
    if (helpEl) return;
    helpEl = document.createElement('div');
    helpEl.className = 'kb-overlay';
    let html = '<div class="kb-card" role="dialog" aria-label="Keyboard shortcuts"><div class="kb-title">Keyboard shortcuts · ショートカット</div>';
    helpSections().forEach(([title, rows]) => {
      html += `<div class="kb-group">${title}</div>`;
      rows.forEach(r => {
        if (!r || !r.length) return;
        const keys = r[0].map(k => `<span class="kb-key">${k}</span>`).join('');
        html += `<div class="kb-row"><span>${r[1]}</span><span class="kb-keys">${keys}</span></div>`;
      });
    });
    html += '<div class="kb-foot">Press ? or Esc to close</div></div>';
    helpEl.innerHTML = html;
    helpEl.addEventListener('mousedown', e => { if (e.target === helpEl) toggleHelp(false); });
    document.body.appendChild(helpEl);
    requestAnimationFrame(() => helpEl && helpEl.classList.add('open'));
  }

  // Esc closes help before nav.js can navigate away
  window.addEventListener('keydown', e => {
    if (helpEl && e.key === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); toggleHelp(false); }
  }, true);

  // ── Main key handler ──
  document.addEventListener('keydown', e => {
    if (e.defaultPrevented) return;
    if (document.querySelector('.so-overlay')) return; // stroke window handles its own keys

    const k = e.key;
    const t = e.target;
    const typing = isTyping(t);

    // Alt+L → listen (works while typing in the quiz)
    if (e.altKey && !e.ctrlKey && !e.metaKey && (k === 'l' || k === 'L')) {
      const b = document.getElementById('quiz-audio-btn');
      if (b) { e.preventDefault(); b.click(); }
      return;
    }
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    if (helpEl) {
      if (k === '?') { e.preventDefault(); toggleHelp(false); }
      return;
    }
    if (typing) return; // let inputs (quiz answer) work normally

    // Enter / Space activate custom (non-button) blocks
    if ((k === 'Enter' || k === ' ') && t && t.matches && t.matches(CUSTOM)) {
      e.preventDefault();
      t.click();
      return;
    }

    // Arrow navigation (not inside the titlebar, which has its own handling)
    if (k.startsWith('Arrow') && !(t && t.closest && t.closest('#custom-titlebar'))) {
      if (move(k)) e.preventDefault();
      return;
    }

    // Enter with nothing meaningful focused → the page's primary action
    if (k === 'Enter' && (!t || t === document.body || t === document.documentElement)) {
      const primary = ['#ack-btn', '#quiz-next-btn.visible', '.results-btn.primary', '#start-btn', '#btn-yes'];
      for (const sel of primary) { if (clickIf(sel)) { e.preventDefault(); return; } }
      return;
    }

    if (k.length !== 1) return;
    const key = k.toLowerCase();

    // During a quiz, plain letters go to the answer box
    if (quizScreenOpen()) {
      const input = document.getElementById('quiz-input');
      if (input && /^[a-z'\-]$/i.test(k) && !input.disabled) input.focus(); // char then lands in the input
      return;
    }

    if (k === '?') { e.preventDefault(); toggleHelp(); return; }
    if (key === 't') { if (clickIf('.tb-theme-toggle')) e.preventDefault(); return; }
    if (key === 'c') {
      if (window.kanaAccent) { e.preventDefault(); window.kanaAccent.next(); }
      return;
    }

    if (isIndex) {
      if (key === 'h' || k === '1') { clickIf('.card[href="hiragana.html"]'); }
      else if (key === 'k' || k === '2') { clickIf('.card[href="katakana.html"]'); }
      return;
    }

    if (isKana) {
      if (key === 'q') { clickIf('.quiz-link'); return; }
      if (k === '1' || k === '2') {
        const btns = document.querySelectorAll('.page-btn');
        const b = btns[k === '1' ? 0 : 1];
        if (b) { b.click(); schedule(); }
        return;
      }
      if (key === 's' && t && t.classList && t.classList.contains('tile')) {
        const sb = t.querySelector('.stroke-btn');
        if (sb) { e.preventDefault(); sb.click(); }
      }
      return;
    }

    if (isQuiz && setupScreenOpen()) {
      if (/^[1-5]$/.test(k)) {
        const opts = document.querySelectorAll('.q-opt');
        const o = opts[parseInt(k, 10) - 1];
        if (o) o.click();
      }
    }
  });
})();
