# Vaibee

Product research lab: исследуйте продукты, логируйте выводы, создавайте интерактивные click-through концепты.

**Live:** после настройки GitHub Pages → `https://make-kzk.github.io/Vaibee/`

## Структура

```
Vaibee/
├── index.html              # Portal — каталог research & concepts
├── catalog.json            # Индекс всех записей (обновляйте при добавлении)
├── assets/                 # Общие стили и JS для прототипов
├── research/products/      # Исследования продуктов (Markdown)
├── concepts/               # Концепты с click-through прототипами
└── templates/              # Шаблоны для копирования
```

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
