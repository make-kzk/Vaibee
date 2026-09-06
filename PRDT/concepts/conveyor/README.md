# conveyor — Конвейер HR (единый прототип)

**Status:** draft  
**Date:** 2026-09-06  
**Tags:** conveyor, hiring, hr, vibehunt

## Идея

**Бесшовный** click-through прототип конвейера найма в стиле **VibeHunt88**: шаги 1–3 в одном flow без перезагрузки страницы.

SSOT: [PRDT-01-01-01-conveyor](../../PRDT-01-00-00/PRDT-01-01-ideas/PRDT-01-01-01-conveyor.md)

## Flow

1. **Landing + JTBD** → регистрация HR
2. **Онбординг** → компания → HeadHunter
3. **Публикация вакансии** → wizard (роль → профиль → этапы → календарь → HH)
4. **Назначение встречи** → shortlist кандидатов → fit-score → адженда → слот → подтверждение
5. **Teaser шага 4** — проведение интервью (Daily + запись KZ)

### Шаг 3 — экраны

| Экран | Содержание |
|---|---|
| `candidates` | Статистика, топ кандидатов с fit-score |
| `candidate-detail` | Профиль, теги совпадения |
| `interview-prep` | AI-рекомендации, адженда |
| `meeting-schedule` | Выбор слота, согласие на запись |
| `meeting-done` | Подтверждение + teaser шага 4 |

Навигация «Вакансии» открывается после онбординга. «Кандидаты» — после публикации вакансии.

## Прототип

Открыть: [prototype/index.html](./prototype/index.html)

## Архивные части

- [conveyor-step-1](../conveyor-step-1/prototype/index.html) — только шаг 1
- [conveyor-step-2](../conveyor-step-2/prototype/index.html) — только шаг 2
