# PRDT — Продукт

Раздел для продуктовых артефактов: click-through концепты, прототипы, product specs.

## Правила подписи

**Формат:** `ID — Название`. Заголовок README — `# ID — Название`; имя папки на диске — только ID.

## Содержимое

| Подпись | Путь | Описание |
|---------|------|----------|
| concepts — Концепты | [concepts/](./concepts/) | Интерактивные click-through концепты с HTML-прототипами |

## Добавить концепт

```bash
cp -r SYST/templates/concept PRDT/concepts/my-concept
# Заполните README.md, отредактируйте prototype/index.html
# Добавьте запись в SYST/catalog.json → "concepts"
```

Заголовок README концепта: `# {slug} — {название концепта}`.
