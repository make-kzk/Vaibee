# Vaibee

Product research lab: исследуйте продукты, логируйте выводы, создавайте click-through концепты.

**Live:** `https://make-kzk.github.io/Vaibee/`

## Нейминг

**Формат ID:** `DOMAIN-XX-YY-ZZ-Q-key` · **Подпись:** `# ID - Название`

| Часть | Значение | Пример |
|-------|----------|--------|
| DOMAIN | Направление | RSCH, PRDT, SYST |
| XX | Раздел | 01 бизнес, 02 методологии |
| YY | Группа / тема | 01 MCode, 02 12DF |
| ZZ | Подтема | 01 исследование, 02 шаблон |
| Q | Чанк | 0 контейнер, 1+ детализация |
| key | Ключ | MCode, 12DF |

**Папки:** раздел `DOMAIN-XX-00-00`, тема `DOMAIN-XX-YY-key`. **Файлы:** полный ID. **Q=0** — контейнер с оглавлением и ссылками на Q≥1.

Подробнее: [RSCH/README.md](./RSCH/README.md) · [PRDT/README.md](./PRDT/README.md) · [SYST/README.md](./SYST/README.md)

## Архитектура

```
Vaibee/
├── RSCH/                              # RSCH - Исследования
│   ├── RSCH-01-00-00/                 # RSCH-01-00-00 - Бизнес
│   ├── RSCH-02-00-00/                 # RSCH-02-00-00 - Методологии
│   │   ├── RSCH-02-01-MCode/          # RSCH-02-01-MCode - Motivation Code
│   │   └── RSCH-02-02-12DF/           # RSCH-02-02-12DF - 12 Driving Forces
│   └── RSCH-03-00-00/                 # RSCH-03-00-00 - События
├── PRDT/                              # PRDT - Продукт
└── SYST/                              # SYST - Система
```

## Workflow

```bash
# Research → RSCH/RSCH-01-00-00/products/{slug}/
cp -r SYST/templates/research RSCH/RSCH-01-00-00/products/my-product

# Concept → PRDT/concepts/{slug}/
cp -r SYST/templates/concept PRDT/concepts/my-concept
```

Портал: [index.html](./index.html) · Каталог: [SYST/catalog.json](./SYST/catalog.json)
