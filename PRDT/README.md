# PRDT - Продукт

**ID:** `PRDT` · Click-through концепты, прототипы, product specs.

## Навигация

| ID | Подпись | Путь |
|----|---------|------|
| PRDT-01-00-00 | Идеи | [PRDT-01-00-00/](./PRDT-01-00-00/) |
| — | concepts | [concepts/](./concepts/) |

## Нейминг на этом уровне

- **Папка раздела:** `PRDT-XX-00-00` (YY=00, ZZ=00 — контейнер раздела)
- **README:** `# PRDT-XX-00-00 - {название раздела}`

Спецификация: [корневой README](../README.md#нейминг)

## Добавить концепт

```bash
cp -r SYST/templates/concept PRDT/concepts/my-concept
# README: # {slug} - {название}
# Запись в SYST/catalog.json → "concepts"
```
