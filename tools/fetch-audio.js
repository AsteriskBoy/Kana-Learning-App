#!/usr/bin/env node
// One-time helper: downloads a pronunciation clip for every kana in the app into ./audio
// so the app can play them fully offline. Run once while online:
//
//     npm run fetch-audio            (skips clips you already have)
//     npm run fetch-audio -- --force (re-download everything)
//
// Katakana share the hiragana clip, so ~136 files are fetched in total.
// Clips are named by Unicode code points, e.g. あ -> audio/3042.mp3, きゃ -> audio/304d-3083.mp3.
// (The names must match clipPath() in audio.js.)

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const outDir = path.join(root, 'audio');
const FORCE = process.argv.includes('--force');
const DRY = process.argv.includes('--dry-run');
const DELAY_MS = 450;

// Where clips come from. Override with KANA_TTS_URL (use {text} as placeholder) to use another source.
const URL_TEMPLATE = process.env.KANA_TTS_URL ||
  'https://translate.google.com/translate_tts?ie=UTF-8&q={text}&tl=ja&client=tw-ob';

function toHira(text) {
  return Array.from(text).map(ch => {
    const n = ch.codePointAt(0);
    return (n >= 0x30A1 && n <= 0x30F6) ? String.fromCodePoint(n - 0x60) : ch;
  }).join('');
}
function fileName(hira) {
  return Array.from(hira).map(ch => ch.codePointAt(0).toString(16)).join('-') + '.mp3';
}

function collectKana() {
  const set = new Set();
  for (const f of ['hiragana.html', 'katakana.html']) {
    const text = fs.readFileSync(path.join(root, f), 'utf8');
    for (const m of text.matchAll(/char:\s*'([^']+)'/g)) set.add(toHira(m[1].trim()));
  }
  return [...set];
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function download(text) {
  const url = URL_TEMPLATE.replace('{text}', encodeURIComponent(text));
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36' },
      });
      if (res.status === 429) { await sleep(5000 * attempt); continue; }
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 500) throw new Error('response too small (' + buf.length + ' bytes)');
      return buf;
    } catch (e) {
      if (attempt === 4) throw e;
      await sleep(1000 * attempt);
    }
  }
  throw new Error('rate limited');
}

(async () => {
  const kana = collectKana();
  console.log(`Found ${kana.length} distinct sounds (hiragana + katakana share clips).`);
  if (DRY) { console.log(kana.map(k => k + ' -> ' + fileName(k)).join('\n')); return; }

  fs.mkdirSync(outDir, { recursive: true });
  let ok = 0, skipped = 0;
  const failed = [];
  for (let i = 0; i < kana.length; i++) {
    const text = kana[i];
    const dest = path.join(outDir, fileName(text));
    if (!FORCE && fs.existsSync(dest) && fs.statSync(dest).size > 500) { skipped++; continue; }
    try {
      fs.writeFileSync(dest, await download(text));
      ok++;
      process.stdout.write(`\r[${i + 1}/${kana.length}] ${text}   `);
    } catch (e) {
      failed.push(text);
      console.log(`\nFailed: ${text} (${e.message})`);
    }
    await sleep(DELAY_MS);
  }
  console.log(`\nDone. Downloaded ${ok}, already had ${skipped}, failed ${failed.length}.`);
  if (failed.length) {
    console.log('Run the command again to retry: ' + failed.join(' '));
    process.exit(1);
  }
  console.log('The app now plays all sounds offline from the audio/ folder.');
})();
