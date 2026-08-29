<div align="center">

# 🌸 Kana Learning App (仮名)
### *A Distraction-Free, Aesthetic Japanese Kana Reference & Learning Suite*

[![Version](https://img.shields.io/badge/version-v1.2.0-e05a47.svg?style=for-the-badge&logo=appveyor)](https://github.com/Devil-MockerXD/Kana-Learning-App)
[![Electron](https://img.shields.io/badge/Electron-30.0.0-47848F.svg?style=for-the-badge&logo=electron)](https://www.electronjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933.svg?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-3a3028.svg?style=for-the-badge)](https://github.com/Devil-MockerXD/Kana-Learning-App)
[![License](https://img.shields.io/badge/License-MIT-c9a84c.svg?style=for-the-badge)](LICENSE)

<br />

**Kana Learning App** is a fast, elegant, and native desktop application built with Electron and Node.js designed to make mastering Japanese **Hiragana (ひらがな)** and **Katakana (カタカナ)** effortless, intuitive, and visually pleasing.

[✨ Features](#-features) • [🚀 Quick Start](#-getting-started) • [🎧 Audio Engine](#-high-fidelity-audio-engine) • [🧠 Quiz & Analytics](#-quiz--smart-review) • [⌨️ Shortcuts](#%EF%B8%8F-keyboard-shortcuts) • [🗺️ Roadmap](#%EF%B8%8F-roadmap)

---

</div>

## 🌟 Overview

Whether you are beginning your Japanese language journey or brushing up on tricky combination and extended sounds, **Kana Learning App** combines comprehensive character references, crystal-clear native audio pronunciation, adaptive flashcard quizzes, and historic learning analytics wrapped in a traditional Japanese washi-inspired dark aesthetic.

---

## ✨ Features

### 🈸 1. Complete Japanese Syllabary Coverage
* **All 46 Basic Hiragana & Katakana (五十音 / Gojūon)**:
  * Master all standard vowels (*a, i, u, e, o*), consonant rows (*K, S, T, N, H, M, Y, R, W*), and the singular nasal sound (*n*).
* **25 Voiced & Semi-Voiced Characters (濁音 & 半濁音 / Dakuten & Handakuten)**:
  * Complete coverage for *G, Z, D, B* (dakuten `゛`) and *P* (handakuten `゜`).
* **33 Contracted Sounds (拗音 / Yōon)**:
  * Compound glides combining base characters with small *ya (ゃ/ャ)*, *yu (ゅ/ュ)*, and *yo (ょ/ョ)* (*kya, sha, cha, nya, hya, rya*, etc.).
* **Extended Foreign Loanword Sounds (外来語 / Gairaigo)**:
  * Specialized modern combinations for foreign katakana & hiragana (*fa, fi, fe, fo, va, vi, vu, ve, vo, ti, tu, di, du, wi, we, wo, she, je, che, ye*).

---

### 🔊 2. High-Fidelity Studio Audio Engine
* **Native Japanese Pronunciation**: Real-time neural audio pronunciation stream for every basic, voiced, combination, and extended character.
* **Smart Fallback Engine**: Offline support with fine-tuned local speech synthesis (`ja-JP`) with natural cadence.
* **Visual Sound Indicators**: Interactive sound badges, tile glow, and subtle pulse feedback whenever an audio clip plays.
* **Click-to-Hear Everywhere**: Click any tile in the syllabary reference tables or the dedicated pronunciation button in quizzes.

---

### 🌸 3. Traditional Japanese Aesthetic & Zen Atmosphere
* **Falling Sakura (桜) Petals**: Smooth physics-based cherry blossom particle animation with randomized trajectories and sway.
* **Traditional Patterns (和柄)**: Authentic geometric SVG canvas patterns (*Seigaiha* waves, *Asanoha* hemp leaf, *Shippo* interlocking rings).
* **Curated Typography**:
  * Japanese Glyphs: *Shippori Mincho B1*, *Noto Serif JP*, *Zen Old Mincho*, *Kaisei Decol*.
  * Latin Headings & Accents: *Playfair Display*, *Lora*, *Cormorant Garamond*.
* **Deep Ink & Vermillion Dark Mode**: Balanced contrast palette featuring Vermillion (`#e05a47`), Ancient Gold (`#c9a84c`), and Ink Paper (`#13100e`).
* **Interactive Determination Splash**: Dynamic welcome screen (*"Are you determined to learn? 頑張る気持ちはありますか？"*).
* **Frameless Minimalist Titlebar**: Custom draggable titlebar with seamless window control integration.

---

### 🧠 4. Interactive Quiz & Mastery Analytics
* **Customizable Quiz Sessions**:
  * **Question Limits**: Choose between **10**, **15**, **25**, **50**, or **All** (Full Syllabary).
  * **Character Filters**: Target **Basic (46)**, **Dakuten (25)**, **Combos (33)**, or **All (104+)**.
* **Instant Romaji Validation**: Color-coded feedback (emerald green for correct, vermillion red for mistakes) with immediate phonetic corrections.
* **Session Performance Breakdown**: Accuracy rate, question count, elapsed time, and live score tracker.
* **Lifetime Learning Records**: Tracks total games played, total questions answered, all-time correct answers, and personal best scores across sessions.
* **Visual Progress Bar Chart**: Animated bar visualization showcasing your score trajectory over time.
* **Mistake Review Table**: Inspect mistakes with target character, your input, and the correct pronunciation.
* **Praise & Encouragement Banners**: Rewarding Japanese feedback banners (*Kanpeki! 完璧*, *Taihen Yoku Dekimashita! 大変よくできました*, etc.).

---

## 📸 Interface Preview

![Screenshot](Screenshot.png)

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Context | Action |
| :--- | :--- | :--- |
| <kbd>Enter</kbd> | Quiz Input | Submit answer & proceed to next question |
| <kbd>Esc</kbd> | Anywhere | Context-aware Back navigation (Quiz Results → Setup → Grid → Home) |
| <kbd>Click</kbd> | Any Kana Tile / Audio Icon | Listen to native pronunciation |

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18 or higher recommended) installed on your system.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Devil-MockerXD/Kana-Learning-App.git
   cd Kana-Learning-App
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Launch the application:**
   ```bash
   npm start
   ```

---

## 📦 Building Executables

Package the application for your operating system:

| Platform | Command | Output Destination |
| :--- | :--- | :--- |
| **Windows** (x64) | `npm run build-win` | `dist/JapaneseKana-win32-x64/` |
| **macOS** (x64) | `npm run build-mac` | `dist/JapaneseKana-darwin-x64/` |
| **Linux** (x64) | `npm run build-linux` | `dist/JapaneseKana-linux-x64/` |

---

## 📂 Project Architecture

```plaintext
Kana-Learning-App/
├── main.js              # Electron main process & window lifecycle management
├── preload.js           # Secure contextBridge IPC bridge
├── index.html           # Landing hub with animated sakura & script selection
├── splash.html          # Interactive startup determination screen
├── hiragana.html        # Hiragana reference grid (Standard + Extended)
├── katakana.html        # Katakana reference grid (Standard + Extended)
├── quiz.html            # Hiragana quiz engine with analytics & mistake review
├── quiz_katakana.html   # Katakana quiz engine with analytics & mistake review
├── audio.js             # Dual-engine Japanese TTS & audio stream handler
├── backgrounds.js       # Traditional Japanese SVG pattern overlays
├── darkmode.js          # Typography styling & dark theme engine
├── titlebar.js          # Custom frameless draggable titlebar
├── nav.js               # Global keyboard navigation & Esc key handler
├── icon.ico             # Application icon
└── package.json         # Scripts, dependencies, and metadata
```

---

## 🗺️ Roadmap

- [ ] **Kanji (漢字) Reference & Flashcards**: N5 to N1 Kanji grade progression.
- [ ] **Stroke Order Drawing Canvas**: Interactive stroke-by-stroke drawing pad with real-time accuracy scoring.
- [ ] **Spaced Repetition System (SRS)**: Adaptive Leitner / SM-2 spaced repetition scheduler.
- [ ] **Vocabulary & Essential Phrases**: High-frequency Japanese words with kana breakdowns.
- [ ] **Audio Speed & Pitch Controls**: Variable playback speeds (0.5x, 0.75x, 1.0x, 1.25x).
- [ ] **Custom Themes**: Light washi, Kyoto bamboo forest, and Tokyo neon night themes.

---

## 🤝 Contributing

Contributions, feature suggestions, and pull requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

<div align="center">

---

*Made with ❤️ for Japanese learners around the world • 頑張ってください！*

</div>
