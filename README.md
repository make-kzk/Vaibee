# Vaibee
Product research lab: исследуйте продукты, логируйте выводы, создавайте интерактивные click-through концепты.
Пространство состоит из папок, файлов и инструкции README

**Live:** `https://make-kzk.github.io/Vaibee/`

## Архитектура
```
Vaibee/
├── RSCH/                              # RSCH - Исследования
├── PRDT/                              # PRDT - Продукт
└── SYST/                              # SYST - Система
```

## Правила и Критерии:

### Правила Пространства
1. Правила вышестоящей папки включает в правило нижестоящей папки
2. Все папки и файлы оформлены в соответсвии с Правилом Нейминга:
**Формат ID:** `DOMAIN-XX-YY-ZZ-Q-key` · **Подпись:** `# ID - Название`
DOMAIN-XX-YY-ZZ-Q-[key] -- [name], где:
DOMAIN - наименование направления, XX - раздел, YY - группа, ZZ - тема, Q - информационный чанк, [key] - ключевое слово, [name] - название темы чанка
**Папки:** раздел `DOMAIN-XX-key`, тема `DOMAIN-XX-YY-key`. **Файлы:** полный ID. **Q=0** — контейнер с оглавлением и ссылками на Q≥2. **Q=1** — контейнер Cornell Notes с оглавлением и ссылками на Q≥2
4. Все файлы оформлены в соотвествии с Правилом Файла
5. Все Инструкции README оформлены с Правилом README

### Критерии эффективности
1) Предсказуемость: по коду однозначно понятны: направление, раздел, тема, чанк. Путь от RSCH/ до файла ≤ 4 уровней. grep DOMAIN-XX-YY-ZZ-Q-[key] находит ровно один файл.
2) Конкретика: Q=0 - 
3) Атомарность: Q≥2 — сформированы по методологии MECE (Mutually Exclusive, Collectively Exhaustive). 
4) Объем: Размер файлов README и Q≥2 не более 2 экранов.

#### Правила Нейминга
**Формат ID:** `DOMAIN-XX-YY-ZZ-Q-key` · **Подпись:** `# ID - Название`
DOMAIN-XX-YY-ZZ-Q-[key] -- [name], где:
DOMAIN - наименование направления, XX - раздел, YY - группа, ZZ - тема, Q - информационный чанк, [key] - ключевое слово, [name] - название темы чанка
**Папки:** раздел `DOMAIN-XX-key`, тема `DOMAIN-XX-YY-key`. **Файлы:** полный ID. **Q=0** — контейнер с оглавлением и ссылками на Q≥1.

#### Правила инструкции README
1. Размер инструкции не более 2 снимков экрана
2. Наиболее важное фиксируется в первом снимке экрана
3. README состоит из архитектуры данного уровня, правил и критериев эффективности этого уровня, Workflow, Работа с Cursor


## Workflow

```bash
cp -r SYST/templates/research RSCH/RSCH-01-00-00/products/my-product
cp -r SYST/templates/concept PRDT/concepts/my-concept
```
Портал: [index.html](./index.html) · Каталог: [SYST/catalog.json](./SYST/catalog.json)

## Работа с Cursor

- «Исследуй {продукт} и залогируй в Vaibee» → research + catalog
- «Создай click-through концепт на основе research {slug}» → concepts + prototype
- «Собери мокап 12DF артефактов» → [PRDT/concepts/12df-artifacts/AGENT-PROMPT.md](./PRDT/concepts/12df-artifacts/AGENT-PROMPT.md) (SSOT: [RSCH-02-02-03-0-12DF.md](./RSCH/RSCH-02-00-00/RSCH-02-02-12DF/RSCH-02-02-03-0-12DF.md))
