(function () {
  const screens = document.querySelectorAll('[data-screen]');
  const backBtn = document.querySelector('.back-btn');
  const homeScreen = document.querySelector('[data-screen="home"]');
  let history = ['home'];

  function showScreen(id) {
    screens.forEach((s) => s.classList.toggle('active', s.dataset.screen === id));
    if (backBtn) {
      backBtn.hidden = id === 'home';
    }
  }

  document.querySelectorAll('[data-nav]').forEach((el) => {
    el.addEventListener('click', () => {
      const target = el.dataset.nav;
      if (target === 'home' && history.length > 1) {
        history.pop();
        showScreen(history[history.length - 1]);
      } else if (target !== history[history.length - 1]) {
        history.push(target);
        showScreen(target);
      }
    });
  });

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (history.length > 1) {
        history.pop();
        showScreen(history[history.length - 1]);
      }
    });
  }

  showScreen('home');
})();
