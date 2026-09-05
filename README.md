# Vaibee

Product research lab: исследуйте продукты, логируйте выводы, создавайте интерактивные click-through концепты.

**Live:** после настройки GitHub Pages → `https://make-kzk.github.io/Vaibee/`

## Правила подписи

**Формат:** `ID — Название` (тире — em dash `—`, пробел с обеих сторон).

| Элемент | Имя на диске | Подпись |
|---------|--------------|---------|
| Раздел верхнего уровня | `RSCH/` | `# RSCH — Исследования` |
| Подраздел | `RSCH-02/` | `# RSCH-02 — Методологии` |
| Раздел методологии | `02-01-00-MCode/` | `# 02-01-00-MCode — Motivation Code` |
| Страница | `02-01-01-MCode.md` | `# 02-01-01-MCode — …` |

1. **Заголовок README** — всегда `# ID — Название`, не голый ID.
2. **Таблицы и ссылки** — текст ссылки/строки включает полную подпись.
3. **Имя папки или файла** — только ID (латиница, без пробелов и типре).

## Архитектура

```
Vaibee/
├── index.html              # Portal — каталог research & concepts
├── RSCH/                   # RSCH — Исследования
│   ├── RSCH-01/            # RSCH-01 — Бизнес
│   ├── RSCH-02/            # RSCH-02 — Методологии
│   └── RSCH-03/            # RSCH-03 — События
├── PRDT/                   # PRDT — Продукт
│   └── concepts/           # concepts — Концепты
└── SYST/                   # SYST — Система
    ├── catalog.json        # catalog.json — Каталог
    ├── templates/          # templates — Шаблоны
    ├── assets/             # assets — Ассеты
    └── docs/               # docs — Документация
```

| Подпись | Путь | Назначение |
|---------|------|------------|
| RSCH — Исследования | [RSCH/](./RSCH/) | Исследовательские материалы |
| RSCH-01 — Бизнес | [RSCH/RSCH-01/](./RSCH/RSCH-01/) | Продукты, рынки, конкуренты |
| RSCH-02 — Методологии | [RSCH/RSCH-02/](./RSCH/RSCH-02/) | Фреймворки и модели |
| RSCH-03 — События | [RSCH/RSCH-03/](./RSCH/RSCH-03/) | Конференции, воркшопы |
| PRDT — Продукт | [PRDT/](./PRDT/) | Продуктовые артефакты и прототипы |
| SYST — Система | [SYST/](./SYST/) | Шаблоны, каталог, инфраструктура |

## Разделы методологий (`02-0X-00-[xxx]`)

Разделы методологий расположены в [RSCH-02 — Методологии](./RSCH/RSCH-02/).

| Подпись | Путь |
|---------|------|
| 02-01-00-MCode — Motivation Code | [RSCH/RSCH-02/02-01-00-MCode/](./RSCH/RSCH-02/02-01-00-MCode/) |
| 02-02-00-12DF — 12 Driving Forces | [RSCH/RSCH-02/02-02-00-12DF/](./RSCH/RSCH-02/02-02-00-12DF/) |

### Правила оформления раздела `02-0X-00-[xxx]`

Каждый раздел — **папка** с кодом `02-0X-00-[ShortCode]`:

| Часть кода | Значение | Пример |
|------------|----------|--------|
| `02` | Блок «Методологии» | — |
| `0X` | Номер раздела в блоке | `01`, `02` |
| `00` | Индекс раздела (оглавление) | всегда `00` в имени папки |
| `[ShortCode]` | Краткий код методологии | `MCode`, `12DF` |

**Структура папки:**

```
02-0X-00-[ShortCode]/
├── README.md                    # Оглавление: # 02-0X-00-[ShortCode] — Название
├── 02-0X-01-[ShortCode].md      # Страница 01 (обычно — исследование)
├── 02-0X-02-[ShortCode].md      # Страница 02 (шаблон, практика, …)
└── …
```

**Правила:**

1. **Папка раздела** — только `02-0X-00-[ShortCode]`. Код `00` зарезервирован за оглавлением.
2. **Страницы** — `02-0X-0N-[ShortCode].md`, где `N` = `01`, `02`, `03`… Порядковый номер, не `00`.
3. **README раздела** — заголовок `# 02-0X-00-[ShortCode] — Название`, таблица «Страницы», блок «Источники».
4. **Заголовок страницы** — `# 02-0X-0N-[ShortCode] — Название`.
5. **Шапка страницы** — метаданные и ссылка на раздел:
   ```markdown
   > Дата / контекст  
   > Раздел: [02-0X-00-[ShortCode] — Название](./README.md)
   ```
   Для страниц 02+ добавьте ссылку на исследование: `· Контекст: [02-0X-01-[ShortCode] — …](./02-0X-01-[ShortCode].md)`.
6. **Язык** — русский; англицизмы и смешанная кириллица/латиница в одном слове недопустимы (например: «Генеалогия», не «Гenealogия»).
7. **Нумерация разделов** — сквозная внутри страницы: `## 1. …`, `## 2. …`.

**Примеры:**

| Тип | Путь |
|-----|------|
| Оглавление | [02-01-00-MCode — Motivation Code](./RSCH/RSCH-02/02-01-00-MCode/README.md) |
| Исследование | [02-01-01-MCode — Исследование MCode](./RSCH/RSCH-02/02-01-00-MCode/02-01-01-MCode.md) |
| Практика | [02-01-02-MCode — Шаблон Team Motivational Map](./RSCH/RSCH-02/02-01-00-MCode/02-01-02-MCode.md) |
| Исследование | [02-02-01-12DF — Исследование 12 Driving Forces](./RSCH/RSCH-02/02-02-00-12DF/02-02-01-12DF.md) |

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
| Research | [RSCH/RSCH-01/products/notion/](RSCH/RSCH-01/products/notion/) |
| Methodology | [RSCH/RSCH-02/02-01-00-MCode/](RSCH/RSCH-02/02-01-00-MCode/) |
| Concept | [PRDT/concepts/vaibee-notes/prototype/](PRDT/concepts/vaibee-notes/prototype/) |

## Работа с Cursor

- «Исследуй {продукт} и залогируй в Vaibee» → создаст research + обновит catalog
- «Создай click-through концепт на основе research {slug}» → concepts + prototype
