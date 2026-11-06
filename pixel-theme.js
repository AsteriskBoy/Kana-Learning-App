// Shared pixel-art presentation layer for every Kana screen.
(function () {
  const style = document.createElement('style');
  style.id = 'kana-pixel-theme';
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');
    :root {
      /* Pixel surfaces inherit the active accent palette. */
      --pixel-cream: var(--tile-bg, #fff8dc);
      --pixel-paper: var(--paper, #f6e7b0);
      --pixel-ink: var(--ink, #241b36);
      --pixel-purple: var(--vermillion, #573b8f);
      --pixel-pink: var(--vermillion-soft, #e85d91);
      --pixel-yellow: var(--gold, #ffd166);
      --pixel-green: var(--vermillion-soft, #79c267);
      --pixel-shadow: rgba(36, 27, 54, .25);
    }
    html, body { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23241b36' stroke='%23fff8dc' stroke-width='2' d='M4 2v16l4-4 3 7 3-1-3-7h6z'/%3E%3C/svg%3E") 2 2, auto; }
    a, button, input, select, .tile, .card, .q-opt, .type-opt { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23e85d91' stroke='%23fff8dc' stroke-width='2' d='M4 2v16l4-4 3 7 3-1-3-7h6z'/%3E%3C/svg%3E") 2 2, pointer; }
    body {
      /* Resolve these on body so accent.js overrides apply per page and mode. */
      --pixel-cream: var(--tile-bg, #fff8dc);
      --pixel-paper: var(--paper, #f6e7b0);
      --pixel-ink: var(--ink, #241b36);
      --pixel-purple: var(--vermillion, #573b8f);
      --pixel-pink: var(--vermillion-soft, #e85d91);
      --pixel-yellow: var(--gold, #ffd166);
      --pixel-green: var(--vermillion-soft, #79c267);
      background-color: var(--pixel-paper) !important;
      color: var(--pixel-ink) !important;
      font-family: 'VT323', monospace !important;
      image-rendering: pixelated;
    }
    body::before {
      background-image:
        linear-gradient(rgba(255,255,255,.22) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.22) 1px, transparent 1px),
        linear-gradient(135deg, rgba(232,93,145,.13), transparent 38%, rgba(87,59,143,.14)) !important;
      background-size: 16px 16px, 16px 16px, 100% 100% !important;
      background-position: 0 0 !important;
      opacity: 1 !important;
    }
    body::after { content: '' !important; display: block !important; position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: .12; background: repeating-linear-gradient(0deg, transparent 0 3px, #241b36 3px 4px); }
    .wrap, main, header, #setup-screen, #quiz-screen, .back-nav, footer, .toolbar { position: relative; z-index: 2; }
    .main-title, .header-title, .setup-title, .results-title, .chapter-heading { font-family: 'Press Start 2P', monospace !important; text-transform: uppercase; text-shadow: 3px 3px 0 var(--pixel-yellow); }
    .eyebrow, .header-eyebrow, .setup-eyebrow, .section-label, .setup-label, .titlebar-title { font-family: 'Press Start 2P', monospace !important; letter-spacing: .12em !important; }
    .subtitle, .header-desc, .setup-desc, .header-kanji, .setup-sub, .card-native, .tile-romaji, .tile-parts, .footer-text { font-family: 'VT323', monospace !important; font-style: normal !important; }
    .card, .tile, .quiz-card, .results-card, .chart-card, .mistakes-card, .ack-banner, .q-opt, .type-opt, .quiz-input {
      border: 4px solid var(--pixel-purple) !important; border-radius: 0 !important; box-shadow: 6px 6px 0 var(--pixel-shadow) !important; background: var(--pixel-cream) !important;
    }
    .card:hover, .tile:hover, .q-opt:hover, .type-opt:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0 var(--pixel-pink) !important; border-color: var(--pixel-pink) !important; }
    .card-glyph, .tile-char, .quiz-char, .kanji-front-char, .main-kana, .front-jp, .back-jp { font-family: 'VT323', 'Noto Serif JP', monospace !important; color: var(--pixel-purple) !important; text-shadow: 2px 2px 0 var(--pixel-yellow); }
    .quiz-link, .start-btn, .results-btn, .quiz-next-btn, .ack-btn { font-family: 'Press Start 2P', monospace !important; border-radius: 0 !important; border: 4px solid var(--pixel-ink) !important; box-shadow: 4px 4px 0 var(--pixel-ink) !important; background: var(--pixel-pink) !important; }
    .quiz-link:hover, .start-btn:hover, .results-btn:hover, .quiz-next-btn:hover, .ack-btn:hover { transform: translate(-2px, -2px) !important; box-shadow: 6px 6px 0 var(--pixel-ink) !important; }
    .page-btn { border-radius: 0 !important; border-width: 3px !important; font-family: 'Press Start 2P', monospace !important; }
    .progress-track { height: 12px !important; border-radius: 0 !important; border: 3px solid var(--pixel-purple); background: var(--pixel-cream) !important; }
    .progress-fill { border-radius: 0 !important; background: var(--pixel-green) !important; }
    .divider { height: 4px !important; background: var(--pixel-pink) !important; opacity: 1 !important; }
    #custom-titlebar { background: var(--pixel-purple) !important; border-bottom: 4px solid var(--pixel-yellow) !important; }
    .titlebar-title, .tb-btn { color: var(--pixel-cream) !important; }
    .tb-btn:hover { background: var(--pixel-pink) !important; }
    body.dark {
      --pixel-paper: var(--paper, #171329);
      --pixel-cream: var(--tile-bg, #282047);
      --pixel-ink: var(--ink, #fff8dc);
      --pixel-purple: var(--vermillion, #a98bea);
      --pixel-pink: var(--vermillion-soft, #ff79ad);
      --pixel-yellow: var(--gold, #ffd166);
      --pixel-shadow: rgba(0,0,0,.5);
      background-color: var(--pixel-paper) !important;
    }
    body.dark::before {
      background-image: url('assets/fuji-dark.jpg'), linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(135deg, rgba(255,121,173,.16), transparent 42%, rgba(169,139,234,.18)) !important;
      background-size: cover, 16px 16px, 16px 16px, 100% 100% !important;
      background-position: center bottom, 0 0, 0 0, 0 0 !important;
      background-repeat: no-repeat, repeat, repeat, no-repeat !important;
    }
    body.dark .card, body.dark .tile, body.dark .quiz-card, body.dark .results-card, body.dark .chart-card, body.dark .mistakes-card, body.dark .ack-banner, body.dark .q-opt, body.dark .type-opt, body.dark .quiz-input { background: var(--pixel-cream) !important; color: var(--pixel-ink) !important; }
    @media (max-width: 600px) { .main-title { font-size: 2rem !important; } .grid { gap: 6px !important; } .tile { padding: 12px 4px 8px !important; } }
    @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; } }
  `;
  document.head.appendChild(style);
})();
