# Cursor skills (Vaibee)

Project skills appear as **slash commands** in Agent chat.

| Command | Skill |
|---|---|
| `/vibe-character-art` | Generate VibeHunt bean-doodle archetype illustrations |

**Global install (any project, no GitHub):**

```bash
# From vaibee checkout:
.cursor/skills/vibe-character-art/install-global-skill.sh
# Then reload Cursor → /vibe-character-art works everywhere on this machine
```

Skills live in `.cursor/skills/<name>/SKILL.md`. The folder name must match the `name` field in frontmatter.

After adding or editing a skill, reload the workspace (or restart Cursor) if `/command` does not appear in the picker.
