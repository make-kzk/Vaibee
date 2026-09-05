(function () {
  const titleEl = document.querySelector('.mockup-title');
  const screens = document.querySelectorAll('[data-screen]');
  const backBtn = document.querySelector('.back-btn');
  let history = ['home'];

  const titles = {
    home: '12DF Artifacts',
    'report-a': 'Отчёт',
    'report-a2': '12 сил',
    'report-a3': 'Портрет',
    'report-a4': 'Стресс',
    'cluster-b': 'Кластер',
    'debrief-c': 'Разбор',
    'plan-d': 'План',
    'team-e': 'Команда',
    'member-ivan': 'Иван',
    'member-oleg': 'Олег',
    'member-anna': 'Анна',
    'member-dmitry': 'Дмитрий',
    'member-elena': 'Елена',
    'member-maria': 'Мария',
    'tension-f': 'Напряжения',
    'benchmark-g': 'Эталон',
    'oneone-h': '1:1',
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
