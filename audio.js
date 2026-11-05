// ── Kana audio (fully offline) ──
// Plays pre-recorded clips from audio/<codepoints>.mp3 (see tools/fetch-audio.js).
// If a clip is missing, falls back to the operating system's Japanese voice.
// Nothing here ever touches the network.
(function () {
  const audioCache = new Map();
  const missing = new Set(); // clips that failed to load once, skip straight to the system voice

  // Katakana share their sound with hiragana, so both map to the same clip.
  function toHira(text) {
    return Array.from(text).map(ch => {
      const n = ch.codePointAt(0);
      return (n >= 0x30A1 && n <= 0x30F6) ? String.fromCodePoint(n - 0x60) : ch;
    }).join('');
  }
  function clipPath(text) {
    const cps = Array.from(toHira(text)).map(ch => ch.codePointAt(0).toString(16));
    return 'audio/' + cps.join('-') + '.mp3';
  }

  // System voice fallback (works offline when a Japanese voice is installed)
  let jaVoice = null;
  function loadVoices() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    jaVoice = voices.find(v => v.lang === 'ja-JP' || v.lang === 'ja_JP')
      || voices.find(v => v.lang.startsWith('ja'))
      || voices.find(v => (v.name && (v.name.includes('Japanese') || v.name.includes('Haruka') || v.name.includes('Ayumi') || v.name.includes('Ichiro'))))
      || null;
  }
  if ('speechSynthesis' in window) {
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  function fallbackSpeech(text, element) {
    if (!('speechSynthesis' in window)) {
      if (element) element.classList.remove('playing-audio');
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'ja-JP';
      u.rate = 0.78; // Slower, clearer cadence for single characters
      u.pitch = 1.0;
      if (!jaVoice) loadVoices();
      if (jaVoice) u.voice = jaVoice;
      u.onend = () => { if (element) element.classList.remove('playing-audio'); };
      u.onerror = () => { if (element) element.classList.remove('playing-audio'); };
      window.speechSynthesis.speak(u);
    } catch (e) {
      if (element) element.classList.remove('playing-audio');
    }
  }

  window.speakKana = function (kanaText, element) {
    if (!kanaText) return;
    if (element) element.classList.add('playing-audio');
    const cleanup = () => { if (element) element.classList.remove('playing-audio'); };

    const src = clipPath(kanaText);
    if (missing.has(src)) { fallbackSpeech(kanaText, element); return; }

    let fellBack = false;
    const useFallback = () => {
      if (fellBack) return;
      fellBack = true;
      missing.add(src);
      audioCache.delete(src);
      fallbackSpeech(kanaText, element);
    };

    try {
      let audio = audioCache.get(src);
      if (!audio) {
        audio = new Audio(src);
        audioCache.set(src, audio);
      }
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      audio.currentTime = 0;
      audio.onended = cleanup;
      audio.onerror = useFallback;

      const playPromise = audio.play();
      if (playPromise !== undefined) playPromise.catch(useFallback);

      // Safety timeout for visual pulse
      setTimeout(cleanup, 1200);
    } catch (err) {
      useFallback();
    }
  };

  // Inject shared audio feedback styles
  const style = document.createElement('style');
  style.textContent = `
    .tile {
      cursor: pointer !important;
      user-select: none;
      transition: transform 0.15s ease, box-shadow 0.25s ease, border-color 0.25s ease !important;
    }
    .tile:active {
      transform: scale(0.95) !important;
    }
    .tile.playing-audio {
      border-color: var(--vermillion) !important;
      box-shadow: 0 0 0 2px var(--vermillion), 0 0 16px rgba(var(--vermillion-rgb),0.4) !important;
      transform: scale(1.04) !important;
    }
    .tile.playing-audio .tile-char {
      color: var(--vermillion) !important;
    }
    .audio-badge {
      position: absolute;
      top: 5px;
      right: 6px;
      font-size: 10px;
      opacity: 0;
      transition: opacity 0.2s ease;
      color: var(--gold);
      pointer-events: none;
      line-height: 1;
    }
    .tile:hover .audio-badge {
      opacity: 0.65;
    }
    .tile.playing-audio .audio-badge {
      opacity: 1;
      color: var(--vermillion);
    }
    .audio-hint-bar {
      text-align: center;
      font-size: 0.8rem;
      font-style: italic;
      color: var(--gold);
      letter-spacing: 0.12em;
      margin: 0 auto 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      opacity: 0.9;
    }
    .quiz-audio-btn {
      background: var(--tile-bg);
      border: 1px solid var(--tile-border);
      border-radius: 50%;
      width: 38px;
      height: 38px;
      font-size: 1.1rem;
      cursor: pointer;
      color: var(--gold);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      margin: 0 auto 16px;
    }
    .quiz-audio-btn:hover {
      border-color: var(--vermillion);
      color: var(--vermillion);
      transform: scale(1.1);
    }
    .quiz-audio-btn:active {
      transform: scale(0.95);
    }
    .quiz-audio-btn.playing-audio {
      border-color: var(--vermillion);
      color: var(--vermillion);
      box-shadow: 0 0 0 2px var(--vermillion), 0 0 12px rgba(var(--vermillion-rgb),0.4);
    }
    .quiz-char {
      cursor: pointer;
      user-select: none;
      transition: transform 0.15s ease, color 0.3s ease;
    }
    .quiz-char:hover {
      opacity: 0.9;
    }
    .quiz-char:active {
      transform: scale(0.96);
    }
  `;
  document.head.appendChild(style);
})();
