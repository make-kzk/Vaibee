---
name: vibe-character-art
description: Generate VibeHunt archetype character illustrations in the minimalist bean-doodle style (32 vibes, Belbin roles, ABCD drivers). Use when the user asks to create, illustrate, or batch-generate vibe hero art.
---

# VibeHunt Character Art — bean-doodle style

Generate personality-archetype illustrations for VibeHunt: minimalist **bean-shaped** characters on a **dark hero surface**, white **hand-drawn doodle** line-art, Russian handwritten typography.

This is a **content/art** skill (E8 in the implementation plan). Output lands in `PRDT/concepts/vibe-hunt/art/` until wired into `web/public/assets/vibes/`.

## When to use

- User asks to **create / draw / generate** a vibe character, archetype illustration, or hero image.
- Batch work: **32 VHUI vibes** (`A3Q` … `D1Z`), **5 ABCD driver cards**, or **7 Belbin role cards**.
- Style exploration or art brief for an external illustrator (use §1–§3 as the brief).

## Before you generate

1. Read this skill fully.
2. Open **all three** reference images in `PRDT/concepts/vibe-hunt/art/references/` — they are the style anchor.
3. For a **VHUI vibe**, load copy from `../vibehunt-backend/methodology/v1.0.0/vhui/vhui_tabl.json` (key = `META_VH_id`, e.g. `A3W`). Use **verbatim** Russian strings; do not paraphrase product texts.
4. Inspect `PRDT/concepts/vibe-hunt/art/examples/captain-archetype.png` for a successful single-card output.

## Tool: `cursor` → `GenerateImage`

Discover schema once, then invoke:

```
GetDynamicTools { namespace: "cursor", toolName: "GenerateImage" }
CallDynamicTool {
  namespace: "cursor",
  toolName: "GenerateImage",
  arguments: {
    description: "<filled prompt from §5>",
    filename: "<see §7>",
    aspect_ratio: "<see §4>",
    reference_image_paths: [
      "PRDT/concepts/vibe-hunt/art/references/6f144722-e0bc-429b-b58e-eab882d735cf.jpg",
      "PRDT/concepts/vibe-hunt/art/references/f03e5cfe-462c-4a17-bbce-d15ddd5583bf.jpg",
      "PRDT/concepts/vibe-hunt/art/references/a9fb5a64-ba60-4b27-8504-8c7b6ecd23af.jpg"
    ]
  }
}
```

Paths are relative to the workspace root that contains `PRDT/` (vaibee checkout). Use absolute paths if the agent runs from another repo.

**Always** pass all three reference images. Re-read the output image and regenerate if style drifts (see §8).

---

## 1. Visual language (non‑negotiables)

### Body & face

| Element | Rule |
|---|---|
| Silhouette | Vertical **bean / capsule** — rounded ovoid, no neck, no realistic anatomy |
| Fill | One **saturated flat color** per character + subtle grain/stipple OK |
| Outline | Thin **white** stroke around the body |
| Eyes | Two **black dots**, or **closed arcs** for calm/empathic types |
| Mouth | Single thin **curved smile** line |
| Limbs | **White noodle lines** — slightly imperfect, hand-drawn; hands = simple loops |
| Legs | Optional small white ovals; omit for hero-crop (180×180) |

### Background & line-art

- Background: **solid dark charcoal** `#1A1A1A` (matches `--vh-panel-hero` in web).
- All icons, arrows, props, limb lines: **white line-art only** — chalk/sketch feel, not perfect vectors.
- **No** gradients on the body, **no** 3D shading, **no** photorealism, **no** anime, **no** emoji style.

### Typography (Russian)

- Title: large **handwritten Cyrillic**, color = body color.
- Secondary: white handwritten — trait lines, short description, motto.
- For ABCD cards: lines like `A High · B Low · C High · D Low` (or Russian «высокий/низкий»).

### Layout variants

| Variant | Use | `aspect_ratio` | Composition |
|---|---|---|---|
| **Hero** | Career Code slot, 180×180 in UI | `1:1` | Character centered, **minimal text** — crop-safe; 1–2 small doodle icons only |
| **Card** | Reference sheet, share, PDF | `1:1` | Full card: title top, traits, character center, doodles, side phrase, bottom motto + icon |
| **Grid** | Overview poster (5 drivers / 7 Belbin) | `4:3` or `16:9` | Equal cells, one character per cell, consistent padding |

---

## 2. Color system

Each character gets **one body color**. Title matches the body. Stay in this palette for consistency across the set:

| Role / pole | Example names | Hex (guide) |
|---|---|---|
| Drive A — power / maverick | Маверик, предприниматель | `#E53935` red |
| Drive B — leadership / captain | Капитан, капитанская роль | `#FF8C00` orange |
| Drive C — analysis / order | Аналитик, хранитель | `#66BB6A` green |
| Drive D — depth / specialist | Специалист, исследователь | `#26A69A` teal |
| Collaboration / warmth | Сотрудничающий, альтруист | `#9C27B0` purple |
| Persuasion / social | Убеждающий | `#EC407A` pink |
| Individual / creative | Индивидуалист | `#7E57C2` violet |
| Energy / optimism | Исследователь (variant) | `#FFCA28` yellow |

For **32 VHUI vibes**, derive hue from `BADp` first letter (A→red family, B→orange, C→green, D→teal/blue) and vary slightly by `SUdr` so siblings in the same pole don't clone.

---

## 3. Props & doodles (one glance = one trait)

Pick **one head accessory** + **2–4 surrounding doodles**. Do not overcrowd hero crops.

| Archetype signal | Head / hands | Doodle icons |
|---|---|---|
| Leader / captain | Captain hat + anchor | Mountain + flag, star, radiating lines |
| Maverick / entrepreneur | Sunglasses | Rocket, lightning, crown |
| Analyst | Round glasses | Magnifying glass, bar chart, clipboard |
| Specialist / focus | Over-ear headphones | Book stack, steaming mug |
| Collaborator / altruist | Heart at chest, closed eyes | Three silhouettes, small hearts |
| Persuader | Raised hand, speech | Heart in bubble, star |
| Guardian | Round glasses + shield | Padlock, checkmark shield |
| Operator | Clipboard + pen | Checklist, clock |
| Researcher | Glasses + open book | Lightbulb, book stack |

Mottos: **3 short Russian nouns** separated by dots (e.g. «лидерство. влияние. результат.») + one small matching icon.

---

## 4. Data sources

### 32 VHUI vibes (primary product set)

- **SSOT:** `vibehunt-backend/methodology/v1.0.0/vhui/vhui_tabl.json`
- **Card title:** strip prefix «Вайб » from `META_VH_name` for the illustration title, or use the full name on hero context — match product screen.
- **Tagline / side text:** `META_VH_cenost` (≤1 sentence).
- **Motto seeds:** first three words from `META_VH_vibrantforces` or `META_VH_focus`.
- **Id / filename:** key in JSON (`A3W`, `B1Q`, …).

### 5 ABCD driver cards (methodology teaching set)

From reference `6f144722-….jpg`:

| Title | Color | Props |
|---|---|---|
| Маверик | Red | Sunglasses, crown, rocket |
| Капитан | Orange | Captain hat, anchor, mountain+flag |
| Аналитик | Green | Glasses, magnifying glass, charts |
| Специалист | Teal | Headphones, book, mug |
| Сотрудничающий | Purple | Heart hands, team silhouettes |

### 7 Belbin role cards

From references `f03e5cfe-….jpg` / `a9fb5a64-….jpg`:

Убеждающий · Индивидуалист · Предприниматель · Оператор · Хранитель · Исследователь · Альтруист

Use **grid** layout variant for the full set; **card** for individuals.

---

## 5. Prompt template

Copy, fill `{PLACEHOLDERS}`, pass as `description`:

```
A VibeHunt archetype character illustration in minimalist hand-drawn doodle style on solid dark charcoal background (#1A1A1A).

Character: "{TITLE_RU}" — a {BODY_COLOR_NAME} ({BODY_HEX}) bean-shaped capsule body with thin white outline, simple dot eyes and curved smile. {FACE_VARIANT}. {HEAD_ACCESSORY}. Thin white noodle-line arms: {POSE_DESCRIPTION}.

Surrounding white chalk-like doodle icons: {DOODLE_LIST}. Optional dotted arrows pointing toward text areas.

Typography in Russian, handwritten casual Cyrillic:
- Top title "{TITLE_RU}" in large {BODY_COLOR_NAME} matching the body
- {TRAIT_LINES_OR_EMPTY}
- {SIDE_TEXT_OR_EMPTY}
- Bottom motto "{MOTTO_RU}" with small {MOTTO_ICON} icon

Style rules: flat vector doodle, NOT 3D, NOT photorealistic, NOT anime. Simple ovoid bean silhouette, subtle grain on color fill, white line-art only for limbs/icons/text. Friendly infographic sticker aesthetic matching VibeHunt Career Code references.

Layout: {LAYOUT_VARIANT}. {COMPOSITION_NOTES}.
```

### Example — Hero crop (`A3W` Харизматичный Авторитет)

```
… Character: "Харизматичный Авторитет" — orange (#FF8C00) bean … confident smile, one arm raised …
Doodles: star burst, subtle crown outline …
Typography: title only + tiny tagline "Идейный вдохновитель" …
Layout: Hero. Centered character, minimal text, crop-safe for 180×180 square.
aspect_ratio: 1:1
filename: vibe-A3W-hero.png
```

### Example — Full card (`Капитан`)

See `PRDT/concepts/vibe-hunt/art/examples/captain-archetype.png` and `prompt-templates/card.md`.

---

## 6. Workflow

1. **Clarify scope** — single vibe, one driver, Belbin role, or batch (list ids).
2. **Load copy** from `vhui_tabl.json` when applicable.
3. **Pick** color (§2), props (§3), layout (§1).
4. **Generate** via `GenerateImage` with three references.
5. **Review** against §8 checklist; regenerate with tightened prompt if needed.
6. **Save** to `PRDT/concepts/vibe-hunt/art/generated/{filename}` (create `generated/` if missing).
7. For web integration (separate task): export PNG **180×180** and **512×512** `@2x`, name `vibe-{META_VH_id}.png`, place under `web/public/assets/vibes/` — only when product owner approves the art.

### Batch generation (32 vibes)

- Work in pole groups (all `A3*`, then `A1*`, …) so colors stay coherent.
- Keep `{HEAD_ACCESSORY}` and doodle vocabulary **unique per vibe** within a pole — avoid duplicate sunglasses-on-orange for every B-type.
- Log progress in a simple checklist file `art/generated/manifest.md` (id, filename, status, notes).

---

## 7. File naming

| Output | Pattern | Example |
|---|---|---|
| VHUI hero | `vibe-{id}-hero.png` | `vibe-A3W-hero.png` |
| VHUI card | `vibe-{id}-card.png` | `vibe-A3W-card.png` |
| ABCD driver | `driver-{slug}-card.png` | `driver-kapitan-card.png` |
| Belbin role | `belbin-{slug}-card.png` | `belbin-ubegdayushchiy-card.png` |
| Grid poster | `{set}-grid-{cols}x{rows}.png` | `belbin-grid-4x2.png` |

Slug = lowercase transliteration of Russian title.

---

## 8. Quality checklist (must pass before "done")

- [ ] Bean silhouette — not human-proportioned, not chibi/anime
- [ ] Dark `#1A1A1A` background, no light theme bleed
- [ ] White line-art only for limbs and icons
- [ ] Title color matches body color
- [ ] Russian text readable, no gibberish Latin mixed into titles
- [ ] Hero variant: character + essential props survive a **center crop to 180×180**
- [ ] VHUI copy matches `vhui_tabl.json` verbatim (no invented marketing copy)
- [ ] Style matches references more closely than generic flat illustration

---

## 9. Do / Don't

| Do | Don't |
|---|---|
| Use all three reference images every time | Generate without references |
| Keep one prop that reads in 1 second | Add photorealistic faces or full scenes |
| Vary doodles across the 32 set | Reuse identical pose for every vibe in a pole |
| Read output and iterate prompt | Ship first generation unchecked |
| Save under `art/generated/` | Commit multi-MB batches to git without owner ask (large assets) |

---

## 10. Related paths

| Path | Purpose |
|---|---|
| `PRDT/concepts/vibe-hunt/art/references/` | Canonical style references (3 JPGs) |
| `PRDT/concepts/vibe-hunt/art/examples/` | Approved example outputs |
| `PRDT/concepts/vibe-hunt/art/prompt-templates/` | Copy-paste prompt fragments |
| `../vibehunt-backend/methodology/v1.0.0/vhui/vhui_tabl.json` | 32 vibe names & texts |
| `../vibehunt-docs/delivery/career-code-screen-brief.md` | Hero 180×180 product slot |
| `../web/docs/design-reference/VibeHunt Career Code.dc.html` | UI context for hero placement |

---

## Quick invoke (for the user)

```
Сгенерируй иллюстрацию вайба A3W по скиллу vibe-character-art — hero 180×180.
```

```
Сгенерируй полную карточку Belbin «Хранитель» по vibe-character-art.
```

```
Batch: все 5 ABCD driver cards, layout card 1:1, сохрани в art/generated/.
```
