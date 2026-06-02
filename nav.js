// Escape key navigation — detects current page and goes back appropriately
(function () {
  const page = location.pathname.split('/').pop() || 'index.html';

  const backMap = {
    'index.html':          () => {},
    'hiragana.html':       () => location.href = 'index.html',
    'katakana.html':       () => location.href = 'index.html',
    'quiz.html':           () => quizEscape(),
    'quiz_katakana.html':  () => quizEscape(),
  };

  function quizEscape() {
    const quiz    = document.getElementById('quiz-screen');
    const results = document.getElementById('results-screen');
    const setup   = document.getElementById('setup-screen');

    if (results && results.style.display !== 'none') {
      // Results → Setup
      results.style.display = 'none';
      setup.style.display = 'block';
    } else if (quiz && quiz.style.display !== 'none') {
      // Mid-quiz → Setup directly, no confirm
      quiz.style.display = 'none';
      setup.style.display = 'block';
    } else {
      // Setup → parent page
      const parent = page === 'quiz.html' ? 'hiragana.html' : 'katakana.html';      location.href = parent;
    }
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      // Don't intercept if user is typing in an input
      if (document.activeElement && document.activeElement.tagName === 'INPUT') {
        document.activeElement.blur();
        return;
      }
      const handler = backMap[page];
      if (handler) handler();
    }
  });
})();
