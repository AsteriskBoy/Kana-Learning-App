(function () {

  // ── Inject Google Fonts ──
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1:wght@400;600;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Lora:ital,wght@0,400;0,500;1,400&display=swap';
  document.head.prepend(link);

  const style = document.createElement('style');
  style.textContent = `
    /* Hide scrollbar globally */
    * { scrollbar-width: none !important; -ms-overflow-style: none !important; }
    *::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }

    html { background-color: var(--paper, #f8f5ee); }

    /* ── Fonts (both themes) ── */
    body, button, input, select {
      font-family: 'Lora', 'Cormorant Garamond', serif !important;
    }

    .header-title, .setup-title, .results-title,
    .chapter-heading, .main-title,
    .card-script, .results-title {
      font-family: 'Playfair Display', serif !important;
      letter-spacing: 0.02em;
    }

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

    .tile-char { font-weight: 600 !important; letter-spacing: 0.02em; }
    .kanji-front-char { font-weight: 800 !important; }
    .kanji-back-char { font-weight: 600 !important; }
    .front-jp { font-weight: 600 !important; }
    .back-jp { font-weight: 800 !important; }
    .quiz-char { font-weight: 800 !important; }

    .header-eyebrow, .setup-eyebrow {
      font-family: 'Playfair Display', serif !important;
      font-style: italic;
      font-weight: 400;
    }

    .card-glyph { font-weight: 800 !important; }

    /* ══════════════════════════════════════════════
       THEME SWITCH BUTTON (Sun & Moon Toggle)
    ══════════════════════════════════════════════ */
    .tb-theme-toggle {
      display: inline-block;
      position: relative;
      width: 54px;
      height: 26px;
      padding: 0;
      border-radius: 13px;
      border: 1px solid var(--tile-border, #dcd3c4);
      background: var(--tile-back, #eee7db);
      cursor: pointer;
      outline: none;
      user-select: none;
      box-sizing: border-box;
      transition: background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
      -webkit-app-region: no-drag;
      margin-right: 4px;
      vertical-align: middle;
    }

    .tb-theme-toggle:focus-visible {
      box-shadow: 0 0 0 2px var(--vermillion);
    }

    .tb-theme-thumb {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #ffffff;
      box-shadow: 0 1px 4px rgba(20, 18, 16, 0.2);
      transition: transform 0.28s cubic-bezier(0.34, 1.3, 0.64, 1), background-color 0.25s ease, box-shadow 0.25s ease;
      z-index: 1;
      pointer-events: none;
    }

    .tb-theme-icon {
      position: absolute;
      top: 2px;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      pointer-events: none;
      transition: color 0.25s ease, transform 0.25s ease, opacity 0.25s ease;
    }

    .tb-theme-icon.sun {
      left: 2px;
    }

    .tb-theme-icon.moon {
      right: 2px;
    }

    .tb-theme-icon svg {
      width: 13px;
      height: 13px;
      display: block;
      margin: auto;
    }

    /* Light Mode Active state for Toggle */
    body.light .tb-theme-toggle {
      background: #e8dfd0;
      border-color: #d2c5b0;
    }
    body.light .tb-theme-toggle:hover {
      border-color: var(--vermillion);
      background: #e2d7c5;
    }
    body.light .tb-theme-thumb {
      transform: translateX(0);
      background: #ffffff;
      box-shadow: 0 1px 4px rgba(20, 18, 16, 0.22);
    }
    body.light .tb-theme-icon.sun {
      color: #b45309;
      transform: scale(1.05);
      opacity: 1;
    }
    body.light .tb-theme-icon.moon {
      color: #8c7e6e;
      transform: scale(0.9);
      opacity: 0.6;
    }

    /* Dark Mode Active state for Toggle */
    body.dark .tb-theme-toggle {
      background: #231c18;
      border-color: #3d322a;
    }
    body.dark .tb-theme-toggle:hover {
      border-color: var(--gold);
      background: #2b221d;
    }
    body.dark .tb-theme-thumb {
      transform: translateX(28px);
      background: #3a2e26;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
    }
    body.dark .tb-theme-icon.sun {
      color: #6a5a4c;
      transform: scale(0.9);
      opacity: 0.6;
    }
    body.dark .tb-theme-icon.moon {
      color: #ffd166;
      transform: scale(1.05);
      opacity: 1;
    }


    /* ══════════════════════════════════════════════
       DARK THEME
    ══════════════════════════════════════════════ */
    body.dark {
      --ink: #e8e0d5;
      --ink-soft: #c4b8a8;
      --paper: #13100e;
      --vermillion: #e05a47;
      --vermillion-rgb: 224,90,71;
      --vermillion-soft: #e87a6a;
      --gold: #c9a84c;
      --tile-bg: #1e1a17;
      --tile-back: #0d0b09;
      --tile-border: #3a3028;
      --shadow: rgba(0,0,0,0.4);
    }
    body.dark { background-color: var(--paper); color: var(--ink); }

    body.dark .tile { background: var(--tile-bg); border-color: var(--tile-border); }
    body.dark .tile:hover { box-shadow: 0 0 0 1px var(--vermillion) !important; border-color: var(--vermillion) !important; }
    body.dark .tile-char { color: var(--ink); }
    body.dark .tile:hover .tile-char { color: var(--vermillion); }
    body.dark .tile-romaji { color: var(--ink-soft); }
    body.dark .tile:hover .tile-romaji { color: var(--vermillion-soft); }
    body.dark .tile-parts { color: var(--tile-border); }
    body.dark .tile:hover .tile-parts { color: var(--gold); }

    body.dark .kanji-front { background: var(--tile-bg); border-color: var(--tile-border); }
    body.dark .kanji-card:hover .kanji-front { box-shadow: 0 0 0 1px var(--vermillion) !important; border-color: var(--vermillion) !important; }
    body.dark .kanji-front-char { color: var(--ink); }
    body.dark .kanji-card:hover .kanji-front-char { color: var(--vermillion); }
    body.dark .kanji-back { background: #0d0b09; border-color: #2a2420; }

    body.dark .page-btn { color: var(--ink-soft); border-color: var(--tile-border); background: none; }
    body.dark .page-btn.active { background: var(--vermillion); border-color: var(--vermillion); color: #fff; }
    body.dark .page-btn:hover { background: rgba(var(--vermillion-rgb),0.1); color: var(--vermillion); }
    body.dark .page-btn.active + .page-btn { border-left-color: var(--vermillion); }

    body.dark .card { background: var(--tile-bg); border-color: var(--tile-border); color: var(--ink); }
    body.dark .card:hover { box-shadow: 0 0 0 1.5px var(--vermillion) !important; border-color: var(--vermillion) !important; }
    body.dark .card-script { color: var(--ink); }
    body.dark .card-native { color: var(--ink-soft); }
    body.dark .card-desc { color: var(--gold) !important; }
    body.dark .card:hover .card-desc { color: var(--gold); }
    body.dark .card-glyph { color: var(--ink); }
    body.dark .card:hover .card-glyph { color: var(--vermillion); }
    body.dark .card-tag { color: var(--gold) !important; border-color: var(--gold) !important; }
    body.dark .card:hover .card-tag { color: var(--vermillion) !important; border-color: var(--vermillion) !important; }

    body.dark #custom-titlebar { background: #13100e; border-bottom-color: #2a2420; }
    body.dark .titlebar-title { color: var(--gold) !important; }
    body.dark .tb-btn { color: var(--gold) !important; }
    body.dark .tb-btn:hover { background: rgba(255,255,255,0.06); color: var(--ink) !important; }

    body.dark .hint, body.dark .esc-hint { color: var(--gold) !important; }
    body.dark .slider-label { color: var(--gold) !important; }
    body.dark .chapter-sub { color: var(--gold) !important; }
    body.dark .header-desc { color: var(--ink-soft) !important; }
    body.dark .progress-label, body.dark .progress-count, body.dark .score-pill { color: var(--gold) !important; }
    body.dark .score-num { color: var(--ink) !important; }
    body.dark .chart-bar-label, body.dark .chart-bar-count { color: var(--gold) !important; }
    body.dark .front-flip-hint, body.dark .quiz-hint { color: var(--gold) !important; }
    body.dark .results-sub, body.dark .results-stat-label { color: var(--gold) !important; }
    body.dark .subtitle, body.dark .setup-desc { color: var(--gold) !important; }
    body.dark .mistakes-table th { color: var(--gold) !important; }
    body.dark .type-opt .type-name { color: var(--ink-soft) !important; }
    body.dark .type-opt.selected .type-name { color: #fff !important; }
    body.dark .back-note, body.dark .back-link { color: var(--gold) !important; }
    body.dark .back-link:hover { color: var(--vermillion) !important; }
    body.dark .back-link::before { color: var(--gold) !important; }
    body.dark .footer-text, body.dark .footer-kanji, body.dark .footnote { color: var(--gold) !important; }

    body.dark .header-title, body.dark .setup-title { color: var(--ink); }
    body.dark .header-kanji, body.dark .setup-sub { color: var(--ink-soft); }
    body.dark .header-eyebrow, body.dark .setup-eyebrow { color: var(--vermillion); }
    body.dark .chapter-heading { color: var(--ink); }
    body.dark .section-label { color: var(--gold) !important; }

    body.dark .vocab-front { background: var(--tile-bg); border-color: var(--tile-border); }
    body.dark .vocab-row:hover .vocab-front { box-shadow: 0 0 0 1px var(--vermillion) !important; border-color: var(--vermillion) !important; }
    body.dark .front-jp { color: var(--ink); }
    body.dark .vocab-row:hover:not(.flipped) .front-jp { color: var(--vermillion); }
    body.dark .front-romaji { color: var(--ink-soft); }
    body.dark .front-flip-hint { color: var(--tile-border); }
    body.dark .vocab-row:hover:not(.flipped) .front-flip-hint { color: var(--gold); }
    body.dark .front-divider, body.dark .back-divider { background: var(--tile-border); }

    body.dark .quiz-input { background: #2a2420; color: var(--ink); border-color: var(--tile-border); }
    body.dark .quiz-input::placeholder { color: var(--tile-border); }
    body.dark .quiz-input:focus { border-color: var(--vermillion); box-shadow: 0 0 0 2px rgba(var(--vermillion-rgb),0.15); }
    body.dark .quiz-input.correct { background: #1a2e22; color: #6fcf97; border-color: #2e7d52; }
    body.dark .quiz-input.wrong   { background: #2e1a17; color: #e05a47; border-color: #e05a47; }
    body.dark .quiz-card { background: var(--tile-bg); border-color: var(--tile-border); }
    body.dark .quiz-char { color: var(--ink); }
    body.dark .quiz-next-btn { background: #2a2420; color: var(--ink); border: 1px solid var(--tile-border); }

    body.dark .q-opt, body.dark .type-opt { background: var(--tile-bg); border-color: var(--tile-border); color: var(--ink-soft); }
    body.dark .q-opt:hover, body.dark .type-opt:hover { border-color: var(--vermillion); color: var(--vermillion); }
    body.dark .q-opt.selected, body.dark .type-opt.selected { background: var(--vermillion); border-color: var(--vermillion); color: #fff; }
    body.dark .setup-label { color: var(--gold); }
    body.dark .start-btn { background: var(--vermillion); color: #fff; }

    body.dark .results-card, body.dark .chart-card, body.dark .mistakes-card, body.dark .ack-banner {
      background: var(--tile-bg); border-color: var(--tile-border);
    }
    body.dark .results-title { color: var(--ink); }
    body.dark .results-stat-value { color: var(--ink); }
    body.dark .results-stat { border-bottom-color: var(--tile-border); }
    body.dark .results-card-title, body.dark .chart-title, body.dark .mistakes-title { color: var(--gold); }
    body.dark .ack-en { color: var(--ink-soft); }
    body.dark .ack-jp { color: var(--vermillion); }
    body.dark .results-btn.secondary { background: var(--tile-bg); color: var(--ink-soft); border-color: var(--tile-border); }
    body.dark .mistakes-table td { border-top-color: var(--tile-border); }
    body.dark .m-char { color: var(--ink); }
    body.dark .mistakes-none { color: #6fcf97; }

    body.dark .progress-track { background: var(--tile-border); }
    body.dark .chart-wrap { border-bottom-color: var(--tile-border); }
    body.dark .font-slider { background: var(--tile-border); }
    body.dark .quiz-link { background: var(--vermillion); color: #fff; }
    body.dark .eyebrow { color: var(--vermillion); }
    body.dark .main-title { color: var(--ink); }
    body.dark .main-kana { color: var(--ink-soft); }
    body.dark .corner { color: var(--gold) !important; opacity: 0.28 !important; }
    body.dark .divider { opacity: 0.5; }
    body.dark .audio-hint-bar { color: var(--gold); }


    /* ══════════════════════════════════════════════
       LIGHT THEME: HIGH-CONTRAST INK ON WASHI PAPER
    ══════════════════════════════════════════════ */
    body.light {
      --ink: #141210;
      --ink-soft: #383028;
      --ink-muted: #5e5246;
      --paper: #f8f5ee;
      --vermillion: #b83224;
      --vermillion-rgb: 184,50,36;
      --vermillion-soft: #c84334;
      --gold: #7d5a0c;
      --tile-bg: #ffffff;
      --tile-back: #f4eee4;
      --tile-border: #dcd3c4;
      --shadow: rgba(20,18,16,0.08);
    }
    body.light { background-color: var(--paper); color: var(--ink); }

    /* Titlebar */
    body.light #custom-titlebar { background: #f8f5ee; border-bottom-color: #dcd3c4; }
    body.light .titlebar-title { color: var(--gold) !important; font-weight: 600; }
    body.light .tb-btn { color: #42382e !important; }
    body.light .tb-btn:hover { background: rgba(20,18,16,0.08); color: #141210 !important; }

    /* Headings & Prominent Text */
    body.light .header-title,
    body.light .setup-title,
    body.light .results-title,
    body.light .chapter-heading,
    body.light .main-title,
    body.light .card-script,
    body.light .quiz-char,
    body.light .m-char,
    body.light .results-stat-value,
    body.light .score-num,
    body.light .progress-count {
      color: #141210 !important;
    }

    body.light .header-eyebrow,
    body.light .setup-eyebrow,
    body.light .eyebrow,
    body.light .ack-jp {
      color: var(--vermillion) !important;
      font-weight: 600;
    }

    body.light .section-label,
    body.light .setup-label,
    body.light .results-card-title,
    body.light .chart-title,
    body.light .mistakes-title {
      color: var(--gold) !important;
      font-weight: 600;
    }

    /* Secondary Descriptions & Labels (High Contrast WCAG AAA) */
    body.light .header-desc,
    body.light .setup-desc,
    body.light .subtitle,
    body.light .results-sub,
    body.light .header-kanji,
    body.light .setup-sub,
    body.light .main-kana,
    body.light .card-native,
    body.light .card-desc,
    body.light .results-stat-label,
    body.light .ack-en,
    body.light .chart-bar-label,
    body.light .chart-bar-count,
    body.light .score-pill,
    body.light .audio-hint-bar {
      color: #383028 !important;
    }

    /* Crucial fix: elements that previously used washed-out --tile-border */
    body.light .tile-parts {
      color: #4a3d31 !important;
      font-weight: 600 !important;
    }
    body.light .chapter-sub,
    body.light .progress-label,
    body.light .quiz-hint,
    body.light .hint,
    body.light .esc-hint,
    body.light .front-flip-hint,
    body.light .back-note,
    body.light .footnote,
    body.light .footer-text,
    body.light .footer-kanji,
    body.light .mistakes-table th {
      color: #4a3d31 !important;
    }
    body.light .mistakes-table th {
      font-weight: 600 !important;
    }

    /* Back Navigation Link */
    body.light .back-link {
      color: #383028 !important;
      font-weight: 600 !important;
    }
    body.light .back-link::before {
      color: var(--vermillion) !important;
    }
    body.light .back-link:hover {
      color: var(--vermillion) !important;
    }

    /* Kana & Vocabulary Tiles */
    body.light .tile {
      background: #ffffff !important;
      border-color: #dcd3c4 !important;
      box-shadow: 0 1px 4px rgba(20,18,16,0.06);
    }
    body.light .tile-char {
      color: #141210 !important;
      font-weight: 600 !important;
    }
    body.light .tile-romaji {
      color: #383028 !important;
      font-weight: 500 !important;
    }
    body.light .tile:hover {
      border-color: var(--vermillion) !important;
      box-shadow: 0 0 0 1.5px var(--vermillion), 0 4px 12px rgba(var(--vermillion-rgb),0.12) !important;
    }
    body.light .tile:hover .tile-char {
      color: var(--vermillion) !important;
    }
    body.light .tile:hover .tile-romaji {
      color: #c84334 !important;
    }
    body.light .tile:hover .tile-parts {
      color: var(--gold) !important;
    }

    /* Audio Badges */
    body.light .audio-badge {
      color: var(--gold) !important;
    }
    body.light .tile.playing-audio .audio-badge {
      color: var(--vermillion) !important;
    }
    body.light .quiz-audio-btn {
      background: #ffffff !important;
      border-color: #dcd3c4 !important;
      color: var(--gold) !important;
    }
    body.light .quiz-audio-btn:hover {
      border-color: var(--vermillion) !important;
      color: var(--vermillion) !important;
    }

    /* Home Cards */
    body.light .card {
      background: #ffffff !important;
      border-color: #dcd3c4 !important;
      box-shadow: 0 2px 10px rgba(20,18,16,0.06);
      color: #141210;
    }
    body.light .card-glyph {
      color: #141210 !important;
    }
    body.light .card:hover {
      border-color: var(--vermillion) !important;
      box-shadow: 0 0 0 1.5px var(--vermillion), 0 8px 24px rgba(var(--vermillion-rgb),0.12) !important;
    }
    body.light .card:hover .card-glyph {
      color: var(--vermillion) !important;
    }
    body.light .card:hover .card-script {
      color: var(--vermillion) !important;
    }
    body.light .card-tag {
      color: var(--gold) !important;
      border-color: var(--gold) !important;
    }

    /* Page Navigation & Toolbars */
    body.light .page-btn {
      color: #383028 !important;
      border-color: #dcd3c4 !important;
      background: #ffffff !important;
    }
    body.light .page-btn:hover {
      background: rgba(var(--vermillion-rgb),0.08) !important;
      color: var(--vermillion) !important;
    }
    body.light .page-btn.active {
      background: var(--vermillion) !important;
      border-color: var(--vermillion) !important;
      color: #ffffff !important;
    }
    body.light .page-btn.active + .page-btn {
      border-left-color: var(--vermillion) !important;
    }
    body.light .quiz-link {
      background: var(--vermillion) !important;
      color: #ffffff !important;
    }

    /* Quiz Screen & Options */
    body.light .quiz-card {
      background: #ffffff !important;
      border-color: #dcd3c4 !important;
      box-shadow: 0 6px 24px rgba(20,18,16,0.06);
    }
    body.light .q-opt, body.light .type-opt {
      background: #ffffff !important;
      border-color: #dcd3c4 !important;
      color: #383028 !important;
    }
    body.light .q-opt:hover, body.light .type-opt:hover {
      border-color: var(--vermillion) !important;
      color: var(--vermillion) !important;
    }
    body.light .type-opt .type-kana {
      color: #141210 !important;
    }
    body.light .type-opt .type-name {
      color: #383028 !important;
    }
    body.light .q-opt.selected, body.light .type-opt.selected {
      background: var(--vermillion) !important;
      border-color: var(--vermillion) !important;
      color: #ffffff !important;
    }
    body.light .type-opt.selected .type-kana {
      color: #ffffff !important;
    }
    body.light .type-opt.selected .type-name {
      color: #ffffff !important;
    }
    body.light .start-btn {
      background: var(--vermillion) !important;
      color: #ffffff !important;
      box-shadow: 0 4px 14px rgba(var(--vermillion-rgb),0.25);
    }

    body.light .quiz-input {
      background: #ffffff !important;
      color: #141210 !important;
      border: 1.5px solid #dcd3c4 !important;
    }
    body.light .quiz-input::placeholder {
      color: #8c7f70 !important;
    }
    body.light .quiz-input:focus {
      border-color: var(--vermillion) !important;
      box-shadow: 0 0 0 3px rgba(var(--vermillion-rgb),0.14) !important;
    }
    body.light .quiz-input.correct {
      background: #effaf3 !important;
      color: #1b663b !important;
      border-color: #248a4f !important;
    }
    body.light .quiz-input.wrong {
      background: #fdf2f0 !important;
      color: #b83224 !important;
      border-color: #b83224 !important;
    }
    body.light .quiz-next-btn {
      background: #141210 !important;
      color: #ffffff !important;
    }
    body.light .progress-track {
      background: #e2dacd !important;
    }
    body.light .chart-wrap {
      border-bottom-color: #dcd3c4 !important;
    }

    /* Results Screen */
    body.light .results-card,
    body.light .chart-card,
    body.light .mistakes-card,
    body.light .ack-banner {
      background: #ffffff !important;
      border-color: #dcd3c4 !important;
      box-shadow: 0 4px 16px rgba(20,18,16,0.06);
    }
    body.light .results-stat {
      border-bottom-color: #e8dfd2 !important;
    }
    body.light .mistakes-table td {
      border-top-color: #e8dfd2 !important;
      color: #141210 !important;
    }
    body.light .m-user {
      color: var(--vermillion) !important;
      font-weight: 600;
    }
    body.light .m-correct {
      color: #1b663b !important;
      font-weight: 600;
    }
    body.light .mistakes-none {
      color: #1b663b !important;
      font-weight: 600;
    }
    body.light .results-btn.primary {
      background: var(--vermillion) !important;
      color: #ffffff !important;
    }
    body.light .results-btn.secondary {
      background: #ffffff !important;
      color: #383028 !important;
      border-color: #dcd3c4 !important;
    }
    body.light .ack-btn {
      background: var(--vermillion) !important;
      color: #ffffff !important;
    }

    /* Corner Watermarks & Dividers */
    body.light .corner {
      color: var(--gold) !important;
      opacity: 0.24 !important;
    }
    body.light .divider {
      background: var(--vermillion);
      opacity: 0.7;
    }
    body.light .divider::before, body.light .divider::after {
      background: var(--vermillion);
    }
    body.light .rule {
      background: linear-gradient(to bottom, transparent, #dcd3c4 20%, #dcd3c4 80%, transparent) !important;
    }

    /* Sakura Petals */
    .sakura-layer { z-index: 1; isolation: isolate; }
    body.light .petal {
      background: radial-gradient(circle at 30% 30%, #ffd4e4 0%, #f3a3c0 52%, #e07a9e 100%) !important;
      box-shadow: 0 1px 3px rgba(176, 72, 104, 0.22);
    }
  `;
  document.head.appendChild(style);

  function currentTheme() {
    const stored = localStorage.getItem('kana-theme');
    if (stored === 'light' || stored === 'dark') return stored;
    const dm = localStorage.getItem('dm');
    if (dm === '1') return 'dark';
    if (dm === '0') return 'light';
    if (document.body && document.body.classList.contains('dark')) return 'dark';
    return 'light'; // Default to light mode
  }

  function applyTheme(theme) {
    const next = theme === 'dark' ? 'dark' : 'light';
    localStorage.setItem('kana-theme', next);
    localStorage.setItem('dm', next === 'dark' ? '1' : '0');
    document.documentElement.setAttribute('data-theme', next);
    document.documentElement.style.background = next === 'light' ? '#f8f5ee' : '#13100e';
    if (document.body) {
      document.body.classList.toggle('dark', next === 'dark');
      document.body.classList.toggle('light', next === 'light');
    }
    const boot = document.getElementById('kana-theme-boot');
    if (boot) boot.remove();
    syncToggle(next);
    window.dispatchEvent(new CustomEvent('kana-theme-change', { detail: next }));
  }

  const SUN_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`;
  const MOON_SVG = `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

  function syncToggle(theme) {
    const btn = document.querySelector('.tb-theme-toggle');
    if (!btn) return;
    const isLight = theme === 'light';
    btn.setAttribute('aria-checked', isLight ? 'false' : 'true');
    btn.setAttribute('title', isLight ? 'Current: Light Mode (Sun) — Click to switch to Dark Mode (Moon)' : 'Current: Dark Mode (Moon) — Click to switch to Light Mode (Sun)');
    btn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  }

  function mountToggle() {
    const controls = document.querySelector('.titlebar-controls');
    if (!controls || document.querySelector('.tb-theme-toggle')) return;

    // Clean up any old simple theme button if present
    const oldBtn = document.querySelector('.tb-theme');
    if (oldBtn) oldBtn.remove();

    const btn = document.createElement('button');
    btn.className = 'tb-theme-toggle';
    btn.id = 'theme-toggle-btn';
    btn.type = 'button';
    btn.setAttribute('role', 'switch');

    btn.innerHTML = `
      <span class="tb-theme-thumb"></span>
      <span class="tb-theme-icon sun" title="Light mode">${SUN_SVG}</span>
      <span class="tb-theme-icon moon" title="Dark mode">${MOON_SVG}</span>
    `;

    controls.insertBefore(btn, controls.firstChild);

    btn.addEventListener('click', () => {
      const targetTheme = currentTheme() === 'light' ? 'dark' : 'light';
      applyTheme(targetTheme);
    });

    syncToggle(currentTheme());
  }

  // Run initialization
  applyTheme(currentTheme());

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      applyTheme(currentTheme());
      mountToggle();
    });
  } else {
    mountToggle();
  }

  // Keep in sync when the theme is changed from another window (e.g. the splash
  // screen toggle while the main window is pre-loaded in the background).
  function syncFromStorage() {
    if (!document.body) return;
    const wanted = currentTheme();
    const shown = document.body.classList.contains('dark') ? 'dark' : 'light';
    if (wanted !== shown) applyTheme(wanted);
  }
  window.addEventListener('storage', (e) => {
    if (e.key === 'kana-theme' || e.key === 'dm' || e.key === null) syncFromStorage();
  });
  window.addEventListener('focus', syncFromStorage);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) syncFromStorage();
  });

  // Backup observer in case titlebar is injected dynamically
  const obs = new MutationObserver(() => {
    if (document.querySelector('.titlebar-controls') && !document.querySelector('.tb-theme-toggle')) {
      mountToggle();
    }
  });
  obs.observe(document.documentElement, { childList: true, subtree: true });

})();
