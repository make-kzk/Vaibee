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
