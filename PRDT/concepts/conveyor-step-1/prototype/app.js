(function () {
  const screens = document.querySelectorAll('[data-screen]');
  let history = ['home'];

  const state = {
    companySaved: false,
    hhConnected: false,
  };

  function showScreen(id) {
    screens.forEach((s) => s.classList.toggle('active', s.dataset.screen === id));
    document.querySelectorAll('.nav-item[data-nav]').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.nav === id);
    });
    updateSetupUI();
  }

  function updateSetupUI() {
    const done = (state.companySaved ? 1 : 0) + (state.hhConnected ? 1 : 0);
    const badge = document.getElementById('setup-badge');
    const checkCompany = document.getElementById('check-company');
    const checkHh = document.getElementById('check-hh');

    if (badge) {
      badge.textContent = done === 2 ? 'Настройка завершена' : `Настройка: ${done} / 2`;
      badge.classList.toggle('done', done === 2);
    }
    if (checkCompany) {
      checkCompany.textContent = state.companySaved ? '✓' : '○';
      checkCompany.classList.toggle('done', state.companySaved);
    }
    if (checkHh) {
      checkHh.textContent = state.hhConnected ? '✓' : '○';
      checkHh.classList.toggle('done', state.hhConnected);
    }
  }

  document.querySelectorAll('[data-nav]').forEach((el) => {
    el.addEventListener('click', () => {
      const target = el.dataset.nav;
      if (target === 'home' && history.length > 1) {
        history = ['home'];
        showScreen('home');
        return;
      }
      if (target && target !== history[history.length - 1]) {
        if (target === 'home') history = ['home'];
        else {
          if (history[0] !== 'home') history = ['home'];
          history.push(target);
        }
        showScreen(target);
      }
    });
  });

  document.getElementById('save-company')?.addEventListener('click', () => {
    const name = document.getElementById('company-name')?.value;
    const industry = document.getElementById('company-industry')?.value;
    const size = document.getElementById('company-size')?.value;
    if (name && industry && size) {
      state.companySaved = true;
      const toast = document.getElementById('company-saved');
      toast?.classList.remove('hidden');
      updateSetupUI();
      setTimeout(() => toast?.classList.add('hidden'), 2000);
    }
  });

  document.getElementById('hh-connect')?.addEventListener('click', () => {
    document.getElementById('hh-pending')?.classList.add('hidden');
    document.getElementById('hh-connected')?.classList.remove('hidden');
    state.hhConnected = true;
    updateSetupUI();
  });

  showScreen('home');
})();
