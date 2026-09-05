(function () {
  const screens = document.querySelectorAll('[data-screen]');
  const backBtn = document.querySelector('.back-btn');
  const titleEl = document.querySelector('.mockup-title');
  let history = ['home'];

  const titles = {
    home: 'Team Map',
    passport: 'Паспорт команды',
    dimensions: '8 Dimensions',
    profiles: 'Профили',
    'profile-alex': 'Алекс',
    'profile-maria': 'Мария',
    'profile-ivan': 'Иван',
    'profile-oleg': 'Олег',
    'profile-anna': 'Анна',
    energy: 'Energy Zones',
    power: 'Power Combos',
    danger: 'Danger Zones',
    actions: '90-day Plan',
  };

  function showScreen(id) {
    screens.forEach((s) => s.classList.toggle('active', s.dataset.screen === id));
    if (backBtn) backBtn.hidden = id === 'home';
    if (titleEl && titles[id]) titleEl.textContent = titles[id];
  }

  document.querySelectorAll('[data-nav]').forEach((el) => {
    el.addEventListener('click', () => {
      const target = el.dataset.nav;
      if (target !== history[history.length - 1]) {
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

  document.querySelectorAll('.action-check').forEach((el) => {
    el.addEventListener('click', () => el.classList.toggle('done'));
  });

  showScreen('home');
})();
