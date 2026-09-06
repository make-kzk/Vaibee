(function () {
  const screens = document.querySelectorAll('[data-screen]');
  const root = document.documentElement;
  const WIZARD = ['wizard-role', 'wizard-personality', 'wizard-pipeline', 'wizard-calendar', 'wizard-review'];
  const CABINET = ['cabinet', 'cabinet-company', 'cabinet-integrations'];
  const STEP3 = ['candidates', 'candidate-detail', 'interview-prep', 'meeting-schedule', 'meeting-done'];
  let history = ['home'];

  const CANDIDATES = [
    {
      id: 'almaz',
      initials: 'АК',
      name: 'Алмас Касымов',
      title: 'Senior PM · FinTech · 5 лет',
      fit: 92,
      source: 'Отклик HH',
      tags: ['Стратегия', 'Data-driven', 'Кросс-функциональность'],
      aiTip: 'Кандидат сильный в стратегии — уточните опыт запуска продуктов с нуля и работу с метриками удержания.',
    },
    {
      id: 'dina',
      initials: 'ДО',
      name: 'Дина Оспанова',
      title: 'Product Owner · E-commerce · 4 года',
      fit: 87,
      source: 'Активный поиск HH',
      tags: ['Коммуникация', 'Agile', 'Метрики роста'],
      aiTip: 'Хороший fit по коммуникации — проверьте опыт работы с dev-командой и приоритизацию бэклога.',
    },
    {
      id: 'sergey',
      initials: 'СВ',
      name: 'Сергей Волков',
      title: 'PM · SaaS · 3 года',
      fit: 74,
      source: 'Отклик HH',
      tags: ['Технический бэкграунд', 'B2B'],
      aiTip: 'Технический профиль — оцените глубину продуктового мышления vs инженерного.',
    },
  ];

  const state = {
    companySaved: false,
    hhConnected: false,
    vacancyPublished: false,
    meetingScheduled: false,
    selectedCandidateId: null,
    selectedSlot: 'Вт 11:00',
    personality: 'standard',
    stages: 2,
    participants: ['hr', 'hm'],
    calendarConnected: false,
    slots: ['Вт 11:00', 'Вт 15:30'],
    stageNames: ['Скрининг HR', 'Техническое интервью'],
  };

  function isSetupComplete() {
    return state.companySaved && state.hhConnected;
  }

  function getCandidate(id) {
    return CANDIDATES.find((c) => c.id === id);
  }

  function getJobTitle() {
    return document.getElementById('job-title')?.value || 'Product Manager';
  }

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
    if (id === 'vacancies' && !isSetupComplete()) {
      showScreen('cabinet');
      return;
    }
    if (WIZARD.includes(id) && !isSetupComplete()) {
      showScreen('cabinet');
      return;
    }
    if (STEP3.includes(id) && !state.vacancyPublished) {
      showScreen(state.vacancyPublished ? 'vacancies' : 'cabinet');
      return;
    }

    screens.forEach((s) => s.classList.toggle('active', s.dataset.screen === id));
    syncNav(id);
    updateSetupUI();
    updateWizardSteps(id);

    if (id === 'wizard-review') updateReview();
    if (id === 'published') {
      state.vacancyPublished = true;
      updateVacancyList();
    }
    if (id === 'candidates') renderCandidateList();
    if (id === 'candidate-detail') renderCandidateDetail();
    if (id === 'interview-prep') renderInterviewPrep();
    if (id === 'meeting-schedule') renderMeetingSchedule();
    if (id === 'meeting-done') {
      state.meetingScheduled = true;
      renderMeetingDone();
    }
  }

  function syncNav(current) {
    document.querySelectorAll('.nav-item[data-nav]').forEach((btn) => {
      const nav = btn.dataset.nav;
      let active = nav === current;
      if (nav === 'cabinet' && CABINET.includes(current)) active = true;
      if (nav === 'vacancies' && (current === 'vacancies' || WIZARD.includes(current) || current === 'published')) {
        active = true;
      }
      if (nav === 'candidates' && STEP3.includes(current)) active = true;
      btn.classList.toggle('active', active);
    });
  }

  function updateSetupUI() {
    const done = (state.companySaved ? 1 : 0) + (state.hhConnected ? 1 : 0);
    const complete = isSetupComplete();

    const setupBadge = document.getElementById('setup-badge');
    if (setupBadge) {
      setupBadge.textContent = complete ? 'Настройка завершена' : `Настройка: ${done} / 2`;
      setupBadge.classList.toggle('done', complete);
    }

    ['check-company'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.textContent = state.companySaved ? '✓' : '○';
        el.classList.toggle('done', state.companySaved);
      }
    });
    ['check-hh'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.textContent = state.hhConnected ? '✓' : '○';
        el.classList.toggle('done', state.hhConnected);
      }
    });

    document.querySelectorAll('#nav-vacancies, [data-nav="vacancies"].nav-item').forEach((el) => {
      el.classList.toggle('disabled', !complete);
      el.toggleAttribute('disabled', !complete);
    });

    const candidatesNav = document.getElementById('nav-candidates');
    if (candidatesNav) {
      candidatesNav.classList.toggle('hidden', !state.vacancyPublished);
      candidatesNav.classList.toggle('disabled', !state.vacancyPublished);
      candidatesNav.toggleAttribute('disabled', !state.vacancyPublished);
    }

    const vacanciesCallout = document.querySelector('[data-screen="vacancies"] .callout');
    if (vacanciesCallout && state.vacancyPublished) {
      vacanciesCallout.innerHTML =
        '<strong>Шаг 3.</strong> Вакансия опубликована — перейдите к shortlist кандидатов и назначьте первую встречу.';
    }

    const nextBtn = document.getElementById('next-step-btn');
    if (nextBtn) {
      nextBtn.disabled = !complete;
      nextBtn.classList.toggle('btn-primary', complete);
      nextBtn.classList.toggle('btn-ghost', !complete);
    }

    const readyCallout = document.getElementById('setup-ready-callout');
    readyCallout?.classList.toggle('hidden', !complete || state.vacancyPublished);

    const hint = document.getElementById('next-step-hint');
    if (hint) {
      hint.textContent = complete
        ? 'Компания и HeadHunter подключены — можно публиковать вакансию'
        : 'Завершите настройку компании и HeadHunter';
    }
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
    document.getElementById('review-stages').textContent =
      `${state.stages} этапа: ${state.stageNames.slice(0, state.stages).join(' → ')}`;
    const partLabels = { hr: 'HR', hm: 'Hiring manager', ceo: 'CEO' };
    document.getElementById('review-participants').textContent =
      state.participants.map((p) => partLabels[p]).join(', ');
    document.getElementById('review-calendar').textContent = state.calendarConnected
      ? `Google Calendar · ${state.slots.length} слотов`
      : 'Не подключён';
  }

  function updateVacancyList() {
    const list = document.getElementById('vacancy-list');
    const empty = document.getElementById('vacancies-empty');
    const title = getJobTitle();
    if (!list || !empty) return;
    if (state.vacancyPublished) {
      const responses = state.meetingScheduled ? '12 откликов · 1 встреча' : '12 откликов · 3 в топе';
      list.innerHTML = `
        <button class="vacancy-card card-interactive" type="button" data-nav="candidates">
          <div>
            <strong>${title}</strong>
            <p>Опубликовано на HH · ${responses}</p>
          </div>
          <span class="status-tag ok">${state.meetingScheduled ? 'Встреча назначена' : 'Активна'}</span>
        </button>
      `;
      list.classList.remove('hidden');
      empty.classList.add('hidden');
    }
  }

  function renderCandidateList() {
    const list = document.getElementById('candidate-list');
    const titleEl = document.getElementById('candidates-vacancy-title');
    if (titleEl) titleEl.textContent = getJobTitle();
    if (!list) return;
    list.innerHTML = CANDIDATES.map((c, i) => `
      <button class="candidate-card ${i === 0 ? 'top' : ''}" type="button" data-candidate="${c.id}">
        <div class="candidate-avatar">${c.initials}</div>
        <div class="candidate-body">
          <strong>${c.name}</strong>
          <p>${c.title}</p>
          <span class="candidate-source">${c.source}</span>
        </div>
        <div class="fit-badge">
          <span class="fit-score ${c.fit >= 85 ? 'high' : ''}">${c.fit}</span>
          <span class="fit-label">fit</span>
        </div>
      </button>
    `).join('');
    list.querySelectorAll('[data-candidate]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.selectedCandidateId = btn.dataset.candidate;
        showScreen('candidate-detail');
      });
    });
  }

  function renderCandidateDetail() {
    const c = getCandidate(state.selectedCandidateId) || CANDIDATES[0];
    state.selectedCandidateId = c.id;
    document.getElementById('detail-avatar').textContent = c.initials;
    document.getElementById('detail-name').textContent = c.name;
    document.getElementById('detail-title').textContent = c.title;
    document.getElementById('detail-fit').textContent = c.fit;
    document.getElementById('detail-fit').className = `fit-score ${c.fit >= 85 ? 'high' : ''}`;
    document.getElementById('detail-source').textContent = c.source;
    document.getElementById('detail-tags').innerHTML = c.tags
      .map((t) => `<span class="match-tag">${t}</span>`)
      .join('');
  }

  function renderInterviewPrep() {
    const c = getCandidate(state.selectedCandidateId) || CANDIDATES[0];
    document.getElementById('prep-stage-name').textContent = state.stageNames[0] || 'Скрининг HR';
    document.getElementById('prep-ai-tip').textContent = c.aiTip;
  }

  function renderMeetingSchedule() {
    const c = getCandidate(state.selectedCandidateId) || CANDIDATES[0];
    document.getElementById('schedule-candidate').textContent = `${c.name} · ${state.stageNames[0]}`;
    const slotsEl = document.getElementById('schedule-slots');
    if (!slotsEl) return;
    slotsEl.innerHTML = state.slots
      .map(
        (slot) =>
          `<button class="slot-chip ${slot === state.selectedSlot ? 'selected' : ''}" type="button" data-schedule-slot="${slot}">${slot}</button>`,
      )
      .join('');
    slotsEl.querySelectorAll('[data-schedule-slot]').forEach((chip) => {
      chip.addEventListener('click', () => {
        state.selectedSlot = chip.dataset.scheduleSlot;
        slotsEl.querySelectorAll('.slot-chip').forEach((c) => c.classList.remove('selected'));
        chip.classList.add('selected');
      });
    });
  }

  function renderMeetingDone() {
    const c = getCandidate(state.selectedCandidateId) || CANDIDATES[0];
    document.getElementById('meeting-done-summary').textContent =
      `${c.name} · ${state.selectedSlot} · ${state.stageNames[0]}`;
    updateVacancyList();
  }

  document.body.addEventListener('click', (e) => {
    const el = e.target.closest('[data-nav]');
    if (!el) return;
    e.preventDefault();
    const target = el.dataset.nav;
    if (!target || el.disabled || el.classList.contains('disabled')) return;

    if (target === 'home' && history.length > 1) {
      history = ['home'];
      showScreen('home');
      return;
    }
    if (target && target !== history[history.length - 1]) {
      if (target === 'home') history = ['home'];
      else history.push(target);
      showScreen(target);
    }
  });

  document.getElementById('save-company')?.addEventListener('click', () => {
    const name = document.getElementById('company-name')?.value;
    const industry = document.getElementById('company-industry')?.value;
    const size = document.getElementById('company-size')?.value;
    if (name && industry && size) {
      state.companySaved = true;
      document.getElementById('company-saved')?.classList.remove('hidden');
      updateSetupUI();
      setTimeout(() => document.getElementById('company-saved')?.classList.add('hidden'), 2000);
    }
  });

  document.getElementById('hh-connect')?.addEventListener('click', () => {
    document.getElementById('hh-pending')?.classList.add('hidden');
    document.getElementById('hh-connected')?.classList.remove('hidden');
    state.hhConnected = true;
    updateSetupUI();
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

  document.querySelectorAll('.slot-chip:not([data-schedule-slot])').forEach((chip) => {
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
  updateSetupUI();
  showScreen('home');
})();
