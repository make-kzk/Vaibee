# Vaibee

Product research lab: исследуйте продукты, логируйте выводы, создавайте интерактивные click-through концепты.

**Live:** после настройки GitHub Pages → `https://make-kzk.github.io/Vaibee/`

## Структура

```
Vaibee/
├── index.html              # Portal — каталог research & concepts
├── catalog.json            # Индекс всех записей (обновляйте при добавлении)
├── assets/                 # Общие стили и JS для прототипов
├── 02-01-00-MCode/         # Раздел: Motivation Code
├── 02-02-00-12DF/          # Раздел: 12 Driving Forces
├── research/products/      # Исследования продуктов (Markdown)
├── concepts/               # Концепты с click-through прототипами
└── templates/              # Шаблоны для копирования
```

## Разделы методологий (`02-0X-00-[xxx]`)

| Раздел | Описание |
|--------|----------|
| [02-01-00-MCode](./02-01-00-MCode/) | Motivation Code (MCode) — мотивация в коллективах |
| [02-02-00-12DF](./02-02-00-12DF/) | 12 Driving Forces (TTI Success Insights) |

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
├── README.md                    # Оглавление раздела
├── 02-0X-01-[ShortCode].md      # Страница 01 (обычно — исследование)
├── 02-0X-02-[ShortCode].md      # Страница 02 (шаблон, практика, …)
└── …
```

**Правила:**

1. **Папка раздела** — только `02-0X-00-[ShortCode]`. Код `00` зарезервирован за оглавлением.
2. **Страницы** — `02-0X-0N-[ShortCode].md`, где `N` = `01`, `02`, `03`… Порядковый номер, не `00`.
3. **README раздела** — заголовок `# 02-0X-00-[ShortCode]`, таблица «Страницы», блок «Источники».
4. **Заголовок страницы** — `# 02-0X-0N-[ShortCode] — Название`.
5. **Шапка страницы** — метаданные и ссылка на раздел:
   ```markdown
   > Дата / контекст  
   > Раздел: [02-0X-00-[ShortCode]](./README.md)
   ```
   Для страниц 02+ добавьте ссылку на исследование: `· Контекст: [02-0X-01-[ShortCode] — …](./02-0X-01-[ShortCode].md)`.
6. **Язык** — русский; англицизмы и смешанная кириллица/латиница в одном слове недопустимы (например: «Генеалогия», не «Гenealogия»).
7. **Нумерация разделов** — сквозная внутри страницы: `## 1. …`, `## 2. …`.

**Примеры:**

| Тип | Путь |
|-----|------|
| Оглавление | [02-01-00-MCode/README.md](./02-01-00-MCode/README.md) |
| Исследование | [02-01-01-MCode.md](./02-01-00-MCode/02-01-01-MCode.md) |
| Практика | [02-01-02-MCode.md](./02-01-00-MCode/02-01-02-MCode.md) |
| Исследование | [02-02-01-12DF.md](./02-02-00-12DF/02-02-01-12DF.md) |

## Workflow

### 1. Исследовать продукт

```bash
cp -r templates/research research/products/my-product
# Заполните README.md, sources.md, insights.md
# Добавьте запись в catalog.json → "research"
```

### 2. Создать click-through концепт

```bash
cp -r templates/concept concepts/my-concept
# Заполните README.md
# Отредактируйте prototype/index.html — добавьте экраны
# Добавьте запись в catalog.json → "concepts"
```

### 3. Навигация в прототипе

Каждый экран — `<section data-screen="id">`. Кнопки переключают экраны через `data-nav="id"`:

```html
<section class="screen active" data-screen="home">...</section>
<button data-nav="detail">Открыть</button>
```

Общая логика в `assets/mockup.js`, стили телефонного фрейма в `assets/mockup.css`.

### 4. Опубликовать

1. Push в GitHub
2. **Settings → Pages → Source:** Deploy from branch `main`, folder `/ (root)`
3. Через 1–2 мин: `https://make-kzk.github.io/Vaibee/`

## Примеры

| Тип | Путь |
|-----|------|
| Research | [research/products/notion/](research/products/notion/) |
| Concept | [concepts/vaibee-notes/prototype/](concepts/vaibee-notes/prototype/) |

## Работа с Cursor

- «Исследуй {продукт} и залогируй в Vaibee» → создаст research + обновит catalog
- «Создай click-through концепт на основе research {slug}» → concepts + prototype
