(function () {

  // ── Inject new Google Fonts ──
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1:wght@400;600;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Lora:ital,wght@0,400;0,500;1,400&display=swap';
  document.head.prepend(link);

  const style = document.createElement('style');
  style.textContent = `
    /* Hide scrollbar globally */
    * { scrollbar-width: none !important; -ms-overflow-style: none !important; }
    *::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }

    /* ── Font overrides for dark mode ── */
    body, button, input, select {
      font-family: 'Lora', 'Cormorant Garamond', serif !important;
    }

    /* All display / heading Latin text → Playfair Display */
    .header-title, .setup-title, .results-title,
    .chapter-heading, .main-title,
    .card-script, .results-title {
      font-family: 'Playfair Display', serif !important;
      letter-spacing: 0.02em;
    }

    /* All Japanese text → Shippori Mincho B1 */
    .header-kanji, .setup-sub, .footer-kanji,
    .kanji-front-char, .kanji-back-char, .kanji-back-reading,
    .front-jp, .back-jp,
    .section-label, .chapter-sub,
    .type-opt .type-kana, .card-glyph,
    .main-kana, .card-native,
    .ack-jp, .m-char,
    .titlebar-title {
      font-family: 'Shippori Mincho B1', 'Noto Serif JP', serif !important;
    }

    /* Italic / body Latin → Lora */
    .header-desc, .setup-desc, .header-eyebrow, .setup-eyebrow,
    .back-link, .quiz-link, .front-flip-hint, .hint, .esc-hint,
    .results-sub, .results-stat-label, .results-stat-value,
    .ack-en, .back-meaning, .back-romaji, .front-romaji,
    .tile-romaji, .tile-parts, .back-note,
    .subtitle, .footnote, .footer-text, .slider-label,
    .quiz-hint, .quiz-feedback, .chart-bar-label,
    .progress-label, .progress-count, .score-pill,
    .results-card-title, .chart-title, .mistakes-title,
    .mistakes-table th, .mistakes-table td,
    .q-opt, .type-opt .type-name, .start-btn,
    .results-btn, .page-btn, .quiz-next-btn, .ack-btn,
    .setup-label {
      font-family: 'Lora', serif !important;
    }

    /* Slightly larger and crisper tile characters for dark */
    .tile-char {
      font-weight: 600 !important;
      letter-spacing: 0.02em;
    }
    .kanji-front-char {
      font-weight: 800 !important;
    }
    .kanji-back-char {
      font-weight: 600 !important;
    }
    .front-jp {
      font-weight: 600 !important;
    }
    .back-jp {
      font-weight: 800 !important;
    }
    .quiz-char {
      font-weight: 800 !important;
    }

    /* Playfair Display italic for eyebrows */
    .header-eyebrow, .setup-eyebrow {
      font-family: 'Playfair Display', serif !important;
      font-style: italic;
      font-weight: 400;
    }

    /* Card glyphs on index — big and bold */
    .card-glyph {
      font-weight: 800 !important;
    }

    /* ── Always dark ── */
    body {
      --ink: #e8e0d5;
      --ink-soft: #c4b8a8;
      --paper: #13100e;
      --vermillion: #e05a47;
      --vermillion-soft: #e87a6a;
      --gold: #c9a84c;
      --tile-bg: #1e1a17;
      --tile-back: #0d0b09;
      --tile-border: #3a3028;
      --shadow: rgba(0,0,0,0.4);
    }
    body { background-color: var(--paper); color: var(--ink); }

    /* Tile */
    .tile { background: var(--tile-bg); border-color: var(--tile-border); }
    .tile:hover { box-shadow: 0 0 0 1px var(--vermillion) !important; border-color: var(--vermillion) !important; }
    .tile-char { color: var(--ink); }
    .tile:hover .tile-char { color: var(--vermillion); }
    .tile-romaji { color: var(--ink-soft); }
    .tile:hover .tile-romaji { color: var(--vermillion-soft); }
    .tile-parts { color: var(--tile-border); }
    .tile:hover .tile-parts { color: var(--gold); }

    /* Kanji front */
    .kanji-front { background: var(--tile-bg); border-color: var(--tile-border); }
    .kanji-card:hover .kanji-front { box-shadow: 0 0 0 1px var(--vermillion) !important; border-color: var(--vermillion) !important; }
    .kanji-front-char { color: var(--ink); }
    .kanji-card:hover .kanji-front-char { color: var(--vermillion); }
    .kanji-back { background: #0d0b09; border-color: #2a2420; }

    /* Page switcher */
    .page-btn { color: var(--ink-soft); border-color: var(--tile-border); background: none; }
    .page-btn.active { background: var(--vermillion); border-color: var(--vermillion); color: #fff; }
    .page-btn:hover { background: rgba(224,90,71,0.1); color: var(--vermillion); }
    .page-btn.active + .page-btn { border-left-color: var(--vermillion); }

    /* Index cards */
    .card { background: var(--tile-bg); border-color: var(--tile-border); color: var(--ink); }
    .card:hover { box-shadow: 0 0 0 1.5px var(--vermillion) !important; border-color: var(--vermillion) !important; }
    .card-script { color: var(--ink); }
    .card-native { color: var(--ink-soft); }
    .card-desc { color: var(--tile-border); }
    .card:hover .card-desc { color: var(--gold); }
    .card-glyph { color: var(--ink); }
    .card:hover .card-glyph { color: var(--vermillion); }
    .card-tag { color: var(--tile-border); border-color: var(--tile-border); }
    .card:hover .card-tag { color: var(--vermillion); border-color: var(--vermillion); }

    /* Titlebar */
    #custom-titlebar { background: #13100e; border-bottom-color: #2a2420; }
    .titlebar-title { color: #3a3028; }
    .tb-btn { color: #6a5848; }
    .tb-btn:hover { background: rgba(255,255,255,0.06); color: var(--ink); }

    /* All remaining grey/muted text → gold */
    .hint, .esc-hint { color: var(--gold) !important; }
    .slider-label { color: var(--gold) !important; }
    .chapter-sub { color: var(--gold) !important; }
    .header-desc, .setup-desc { color: var(--ink-soft) !important; }
    .progress-label { color: var(--gold) !important; }
    .progress-count { color: var(--gold) !important; }
    .score-pill { color: var(--gold) !important; }
    .score-num { color: var(--ink) !important; }
    .chart-bar-label { color: var(--gold) !important; }
    .chart-bar-count { color: var(--gold) !important; }
    .front-flip-hint { color: var(--gold) !important; }
    .quiz-hint { color: var(--gold) !important; }
    .card-desc { color: var(--gold) !important; }
    .card-tag { color: var(--gold) !important; border-color: var(--gold) !important; }
    .card:hover .card-tag { color: var(--vermillion) !important; border-color: var(--vermillion) !important; }
    .results-sub { color: var(--gold) !important; }
    .results-stat-label { color: var(--gold) !important; }
    .titlebar-title { color: var(--gold) !important; }
    .tb-btn { color: var(--gold) !important; }
    .subtitle { color: var(--gold) !important; }
    .setup-desc { color: var(--gold) !important; }
    .mistakes-table th { color: var(--gold) !important; }
    .type-opt .type-name { color: var(--ink-soft) !important; }
    .type-opt.selected .type-name { color: #fff !important; }
    .back-note { color: var(--gold) !important; }
    .back-link { color: var(--gold) !important; }
    .back-link:hover { color: var(--vermillion) !important; }
    .back-link::before { color: var(--gold) !important; }

    /* Footer → orange */
    .footer-text { color: var(--gold) !important; }
    .footer-kanji { color: var(--gold) !important; }
    .footnote { color: var(--gold) !important; }

    /* Header & typography */
    .header-title, .setup-title { color: var(--ink); }
    .header-kanji, .setup-sub { color: var(--ink-soft); }
    .header-desc, .setup-desc { color: var(--ink-soft); }
    .header-eyebrow, .setup-eyebrow { color: var(--vermillion); }
    .chapter-heading { color: var(--ink); }
    .chapter-sub { color: var(--tile-border); }
    .section-label { color: var(--gold) !important; }

    /* Vocab front */
    .vocab-front { background: var(--tile-bg); border-color: var(--tile-border); }
    .vocab-row:hover .vocab-front { box-shadow: 0 0 0 1px var(--vermillion) !important; border-color: var(--vermillion) !important; }
    .front-jp { color: var(--ink); }
    .vocab-row:hover:not(.flipped) .front-jp { color: var(--vermillion); }
    .front-romaji { color: var(--ink-soft); }
    .front-flip-hint { color: var(--tile-border); }
    .vocab-row:hover:not(.flipped) .front-flip-hint { color: var(--gold); }
    .front-divider, .back-divider { background: var(--tile-border); }

    /* Quiz */
    .quiz-input { background: #2a2420; color: var(--ink); border-color: var(--tile-border); }
    .quiz-input::placeholder { color: var(--tile-border); }
    .quiz-input:focus { border-color: var(--vermillion); box-shadow: 0 0 0 2px rgba(224,90,71,0.15); }
    .quiz-input.correct { background: #1a2e22; color: #6fcf97; border-color: #2e7d52; }
    .quiz-input.wrong   { background: #2e1a17; color: #e05a47; border-color: var(--vermillion); }
    .quiz-card { background: var(--tile-bg); border-color: var(--tile-border); }
    .quiz-char { color: var(--ink); }
    .quiz-hint { color: var(--tile-border); }
    .quiz-next-btn { background: #2a2420; color: var(--ink); border: 1px solid var(--tile-border); }

    /* Setup */
    .q-opt, .type-opt { background: var(--tile-bg); border-color: var(--tile-border); color: var(--ink-soft); }
    .q-opt:hover, .type-opt:hover { border-color: var(--vermillion); color: var(--vermillion); }
    .q-opt.selected, .type-opt.selected { background: var(--vermillion); border-color: var(--vermillion); color: #fff; }
    .setup-label { color: var(--gold); }
    .start-btn { background: var(--vermillion); color: #fff; }

    /* Results */
    .results-card, .chart-card, .mistakes-card, .ack-banner {
      background: var(--tile-bg); border-color: var(--tile-border);
    }
    .results-title { color: var(--ink); }
    .results-sub, .results-stat-label { color: var(--ink-soft); }
    .results-stat-value { color: var(--ink); }
    .results-stat { border-bottom-color: var(--tile-border); }
    .results-card-title, .chart-title, .mistakes-title { color: var(--gold); }
    .ack-en { color: var(--ink-soft); }
    .ack-jp { color: var(--vermillion); }
    .results-btn.secondary { background: var(--tile-bg); color: var(--ink-soft); border-color: var(--tile-border); }
    .mistakes-table th { color: var(--tile-border); }
    .mistakes-table td { border-top-color: var(--tile-border); }
    .m-char { color: var(--ink); }
    .mistakes-none { color: #6fcf97; }

    /* Progress / score */
    .progress-label { color: var(--tile-border); }
    .progress-count { color: var(--ink-soft); }
    .progress-track { background: var(--tile-border); }
    .score-pill { color: var(--ink-soft); }
    .score-num { color: var(--ink); }
    .chart-bar-label, .chart-bar-count { color: var(--ink-soft); }
    .chart-wrap { border-bottom-color: var(--tile-border); }

    /* Misc */
    .hint, .esc-hint { color: var(--tile-border); }
    .footer-text, .footer-kanji { color: var(--tile-border); }
    .footnote { color: var(--tile-border); }
    .slider-label { color: var(--tile-border); }
    .font-slider { background: var(--tile-border); }
    .quiz-link { background: var(--vermillion); color: #fff; }
    .quiz-link:hover { opacity: 0.85; }
    .eyebrow { color: var(--vermillion); }
    .main-title { color: var(--ink); }
    .main-kana { color: var(--ink-soft); }
    .subtitle { color: var(--ink-soft); }
    .corner { color: var(--tile-border) !important; }
    .divider { opacity: 0.5; }
  `;
  document.head.appendChild(style);

  // Always dark — no toggle
  document.body.classList.add('dark');
})();
