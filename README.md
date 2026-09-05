# Vaibee

Product research lab: исследуйте продукты, логируйте выводы, создавайте интерактивные click-through концепты.

**Live:** после настройки GitHub Pages → `https://make-kzk.github.io/Vaibee/`

## Архитектура

```
Vaibee/
├── index.html              # Portal — каталог research & concepts
├── RSCH/                   # Исследования
│   ├── RSCH-01/            # Бизнес (product research)
│   ├── RSCH-02/            # Методологии (MCode, 12DF, …)
│   └── RSCH-03/            # События
├── PRDT/                   # Продукт
│   └── concepts/           # Click-through концепты
└── SYST/                   # Система
    ├── catalog.json        # Индекс всех записей
    ├── templates/          # Шаблоны для копирования
    ├── assets/             # Общие стили и JS для прототипов
    └── docs/               # Документация
```

| Раздел | ID | Назначение |
|--------|----|------------|
| RSCH | — | Исследования |
| | RSCH-01 | Бизнес — продукты, рынки |
| | RSCH-02 | Методологии — фреймворки и модели |
| | RSCH-03 | События — конференции, воркшопы |
| PRDT | — | Продуктовые артефакты и прототипы |
| SYST | — | Шаблоны, каталог, инфраструктура |

## Разделы методологий (`RSCH-02`)

| Раздел | Путь | Описание |
|--------|------|----------|
| MCode | [RSCH/RSCH-02/02-01-00-MCode/](./RSCH/RSCH-02/02-01-00-MCode/) | Motivation Code — мотивация в коллективах |
| 12 Driving Forces | [RSCH/RSCH-02/02-02-00-12DF/](./RSCH/RSCH-02/02-02-00-12DF/) | TTI Success Insights — мотиваторы и драйверы |

### Правила оформления раздела `02-0X-00-[ShortCode]`

Каждый раздел — **папка** в `RSCH/RSCH-02/` с кодом `02-0X-00-[ShortCode]`:

| Часть кода | Значение | Пример |
|------------|----------|--------|
| `02` | Блок «Методологии» | — |
| `0X` | Номер раздела в блоке | `01`, `02` |
| `00` | Индекс раздела (оглавление) | всегда `00` в имени папки |
| `[ShortCode]` | Краткий код методологии | `MCode`, `12DF` |

**Структура папки:**

```
02-0X-00-[ShortCode]/
├── README.md                    # Оглавление (# RSCH-02-0X-00-[ShortCode])
├── 02-0X-01-[ShortCode].md      # Страница 01 (обычно — исследование)
├── 02-0X-02-[ShortCode].md      # Страница 02 (практика, шаблон)
└── …
```

**Правила:**

1. **Папка раздела** — только `02-0X-00-[ShortCode]`. Код `00` зарезервирован за оглавлением.
2. **Страницы** — `02-0X-0N-[ShortCode].md`, где `N` = `01`, `02`, `03`…
3. **README раздела** — заголовок `# RSCH-02-0X-00-[ShortCode]`, таблица «Страницы», блок «Источники».
4. **Заголовок страницы** — `# RSCH-02-0X-0N-[ShortCode] — Название`.
5. **Шапка страницы** — метаданные и ссылка на раздел:
   ```markdown
   > Дата / контекст  
   > Раздел: [02-0X-00-[ShortCode]](./README.md)
   ```
6. **Язык** — русский; англицизмы и смешанная кириллица/латиница в одном слове недопустимы.
7. **Нумерация разделов** — сквозная внутри страницы: `## 1. …`, `## 2. …`.

**Примеры (12 Driving Forces):**

| Тип | Путь |
|-----|------|
| Оглавление | [RSCH/RSCH-02/02-02-00-12DF/README.md](./RSCH/RSCH-02/02-02-00-12DF/README.md) |
| Базовое исследование | [02-02-00-12DF.md](./RSCH/RSCH-02/02-02-00-12DF/02-02-00-12DF.md) |
| Углублённое исследование | [02-02-01-12DF.md](./RSCH/RSCH-02/02-02-00-12DF/02-02-01-12DF.md) |
| Результат для бизнеса | [02-02-02-12DF.md](./RSCH/RSCH-02/02-02-00-12DF/02-02-02-12DF.md) |
| Артефакты | [02-02-03-12DF.md](./RSCH/RSCH-02/02-02-00-12DF/02-02-03-12DF.md) |

## Workflow

### 1. Исследовать продукт

```bash
cp -r SYST/templates/research RSCH/RSCH-01/products/my-product
# Заполните README.md, sources.md, insights.md
# Добавьте запись в SYST/catalog.json → "research"
```

### 2. Создать click-through концепт

```bash
cp -r SYST/templates/concept PRDT/concepts/my-concept
# Заполните README.md
# Отредактируйте prototype/index.html — добавьте экраны
# Добавьте запись в SYST/catalog.json → "concepts"
```

### 3. Навигация в прототипе

Каждый экран — `<section data-screen="id">`. Кнопки переключают экраны через `data-nav="id"`:

```html
<section class="screen active" data-screen="home">...</section>
<button data-nav="detail">Открыть</button>
```

Общая логика в `SYST/assets/mockup.js`, стили телефонного фрейма в `SYST/assets/mockup.css`.

### 4. Опубликовать

1. Push в GitHub
2. **Settings → Pages → Source:** Deploy from branch `main`, folder `/ (root)`
3. Через 1–2 мин: `https://make-kzk.github.io/Vaibee/`

## Примеры

| Тип | Путь |
|-----|------|
| Research (продукт) | [RSCH/RSCH-01/products/notion/](./RSCH/RSCH-01/products/notion/) |
| Methodology (MCode) | [RSCH/RSCH-02/02-01-00-MCode/](./RSCH/RSCH-02/02-01-00-MCode/) |
| Methodology (12DF) | [RSCH/RSCH-02/02-02-00-12DF/](./RSCH/RSCH-02/02-02-00-12DF/) |
| Concept | [PRDT/concepts/vaibee-notes/prototype/](./PRDT/concepts/vaibee-notes/prototype/) |

## Работа с Cursor

- «Исследуй {продукт} и залогируй в Vaibee» → создаст research + обновит catalog
- «Создай click-through концепт на основе research {slug}» → concepts + prototype
