(function () {
  const screens = document.querySelectorAll('[data-screen]');
  const root = document.documentElement;
  const WIZARD = ['wizard-role', 'wizard-personality', 'wizard-pipeline', 'wizard-calendar', 'wizard-review'];
  let history = ['vacancies'];

  const state = {
    title: '',
    role: '',
    personality: 'standard',
    stages: 2,
    participants: ['hr', 'hm'],
    calendarConnected: false,
    slots: [],
    stageNames: ['Скрининг HR', 'Техническое интервью'],
  };

  document.querySelectorAll('.theme-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      document.querySelector('meta[name="theme-color"]')?.setAttribute(
        'content',
        next === 'dark' ? '#101014' : '#fafafa',
      );
    });
  });

  function showScreen(id) {
    screens.forEach((s) => s.classList.toggle('active', s.dataset.screen === id));
    document.querySelectorAll('.nav-item[data-nav]').forEach((btn) => {
      const nav = btn.dataset.nav;
      btn.classList.toggle('active', nav === id || (nav === 'vacancies' && WIZARD.includes(id)));
    });
    updateWizardSteps(id);
    if (id === 'wizard-review') updateReview();
    if (id === 'published') updateVacancyList();
  }

  function updateWizardSteps(current) {
    const idx = WIZARD.indexOf(current);
    document.querySelectorAll('[data-wizard-step]').forEach((el) => {
      const step = Number(el.dataset.wizardStep);
      el.classList.toggle('active', step === idx);
      el.classList.toggle('done', idx >= 0 && step < idx);
    });
  }

  function updateStageRows() {
    const list = document.getElementById('stage-list');
    const count = document.getElementById('stage-count');
    if (!list || !count) return;
    count.textContent = state.stages;
    list.innerHTML = '';
    for (let i = 0; i < state.stages; i++) {
      const row = document.createElement('div');
      row.className = 'stage-row';
      row.innerHTML = `
        <span class="stage-num">${String(i + 1).padStart(2, '0')}</span>
        <input type="text" value="${state.stageNames[i] || `Этап ${i + 1}`}" data-stage-idx="${i}" placeholder="Название этапа">
      `;
      list.appendChild(row);
    }
    list.querySelectorAll('input').forEach((input) => {
      input.addEventListener('input', () => {
        state.stageNames[Number(input.dataset.stageIdx)] = input.value;
      });
    });
  }

  function updateReview() {
    const title = document.getElementById('job-title')?.value || '—';
    const role = document.getElementById('job-role')?.value || '—';
    const personalityLabels = {
      standard: 'VibeHunt Standard — 12 шкал личности',
      leadership: 'Leadership Fit — для руководящих ролей',
      custom: 'Свой опросник (шаблон компании)',
    };
    document.getElementById('review-title').textContent = title;
    document.getElementById('review-role').textContent = role;
    document.getElementById('review-personality').textContent = personalityLabels[state.personality] || '—';
    document.getElementById('review-stages').textContent = `${state.stages} этапа: ${state.stageNames.slice(0, state.stages).join(' → ')}`;
    const partLabels = { hr: 'HR', hm: 'Hiring manager', ceo: 'CEO' };
    document.getElementById('review-participants').textContent = state.participants.map((p) => partLabels[p]).join(', ');
    document.getElementById('review-calendar').textContent = state.calendarConnected
      ? `Google Calendar · ${state.slots.length} слотов`
      : 'Не подключён';
  }

  function updateVacancyList() {
    const list = document.getElementById('vacancy-list');
    const empty = document.getElementById('vacancies-empty');
    const title = document.getElementById('job-title')?.value || 'Product Manager';
    if (!list || !empty) return;
    list.innerHTML = `
      <div class="vacancy-card">
        <div>
          <strong>${title}</strong>
          <p>Опубликовано на HH · ${state.stages} этапа · 0 откликов</p>
        </div>
        <span class="status-tag ok">Активна</span>
      </div>
    `;
    list.classList.remove('hidden');
    empty.classList.add('hidden');
  }

  document.querySelectorAll('[data-nav]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = el.dataset.nav;
      if (!target) return;
      if (target !== history[history.length - 1]) {
        if (target === 'vacancies') history = ['vacancies'];
        else history.push(target);
        showScreen(target);
      }
    });
  });

  document.querySelectorAll('.option-card[data-personality]').forEach((card) => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.option-card[data-personality]').forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      card.querySelector('input').checked = true;
      state.personality = card.dataset.personality;
    });
  });

  document.querySelectorAll('.chip[data-participant]').forEach((chip) => {
    chip.addEventListener('click', () => {
      const id = chip.dataset.participant;
      chip.classList.toggle('selected');
      if (chip.classList.contains('selected')) {
        if (!state.participants.includes(id)) state.participants.push(id);
      } else {
        state.participants = state.participants.filter((p) => p !== id);
      }
    });
  });

  document.getElementById('stage-minus')?.addEventListener('click', () => {
    if (state.stages > 1) {
      state.stages--;
      updateStageRows();
    }
  });

  document.getElementById('stage-plus')?.addEventListener('click', () => {
    if (state.stages < 5) {
      state.stages++;
      updateStageRows();
    }
  });

  document.getElementById('connect-calendar')?.addEventListener('click', () => {
    document.getElementById('calendar-pending')?.classList.add('hidden');
    document.getElementById('calendar-connected')?.classList.remove('hidden');
    state.calendarConnected = true;
  });

  document.querySelectorAll('.slot-chip').forEach((chip) => {
    if (chip.classList.contains('selected')) {
      state.slots.push(chip.dataset.slot);
    }
    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
      const slot = chip.dataset.slot;
      if (chip.classList.contains('selected')) {
        if (!state.slots.includes(slot)) state.slots.push(slot);
      } else {
        state.slots = state.slots.filter((s) => s !== slot);
      }
    });
  });

  updateStageRows();
  showScreen('vacancies');
})();
