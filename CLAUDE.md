# Possessionless — Working Environment

This repo is the persistent operating system for **Possessionless** (clothing brand) development and marketing work. It is optimized to keep Claude Code fast, cheap, and focused — read this file once per session; everything else loads on demand.

## How context is organized (read only what you need)

Do **not** read every file in this repo at the start of a task. Load only what the current task needs:

| Need | Go to |
|---|---|
| Brand identity, voice, products, website rules | `.claude/skills/possessionless-brand/` (see its `SKILL.md` index — pulls in one knowledge file at a time) |
| Meta Ads analysis / funnel / creative classification | `.claude/skills/meta-ads-expert/SKILL.md` |
| Conversion / website checklist | `docs/website-playbook.md` |
| Shopify / theme dev conventions | `docs/shopify-dev.md` |
| Browser testing (Playwright) | `docs/playwright-testing.md` |
| Tool routing / usage optimization notes | `docs/tooling.md` |
| Subagents available | `.claude/agents/` |
| Structured dev workflow (brainstorm/plan/TDD/debug/verify) | Superpowers plugin — skills auto-surface by name, see `docs/tooling.md` |
| Professional UI/UX design intelligence (styles/palettes/fonts/charts) | UI/UX Pro Max plugin — auto-surfaces on design tasks, see `docs/tooling.md` |
| Cutting AI-writing tells from prose | `stop-slop` skill (`.claude/skills/stop-slop/`) |

Each knowledge file is small and single-purpose on purpose — load the one you need, not the whole directory.

## Non-negotiable safety rules

1. **Never** modify the live Shopify store, push a theme to production, or run `shopify theme push --live` without explicit, in-the-moment approval.
2. **Never** create, pause, edit, or change budgets on Meta/Meta Ads/any ad account, and never spend money, without explicit approval.
3. **Never** switch the active Meta Pixel. The only pixel currently in use is `MAIN PIXEL` (`2236610750526527`). The pixels tagged `DONT USE` in `.claude/skills/possessionless-brand/knowledge/tracking.md` must never be wired into Shopify, GTM, or campaigns without explicit approval.
4. **Never** commit secrets/API tokens. Real credentials go in `.env` (git-ignored); `.env.example` documents the shape only.
5. Treat Triple Whale's pixel/attribution as a **separate** analytics system from the Meta Pixel — never substitute one for the other.
6. Ask before any destructive git operation, force-push, or irreversible action.

## Working style Claude should default to

- **Don't invent numeric thresholds** (kill/scale rules, CPA targets, ROAS targets) for ad decisions — those come from the user's own playbook/source material in `.claude/skills/meta-ads-expert/`. If a threshold isn't documented, ask or flag it as missing rather than making one up.
- **Avoid generic AI output.** Apply the brand voice in `possessionless-brand/knowledge/brand.md` to anything customer-facing (copy, product descriptions, ad text, site content). For prose specifically, actively cut AI-writing tells (throat-clearing openers, hedging, listicle-speak, em-dash overuse, "not just X, it's Y" constructions) before delivering.
- **Match effort to the task.** A CSS tweak or copy edit doesn't need a full plan/brainstorm cycle or multiple subagents — just do it. Reserve structured multi-step planning for genuinely ambiguous or high-stakes work, and reserve multi-agent/"council"-style review for decisions the user flags as high-stakes (ad strategy pivots, redesigns, budget calls) — never for routine tasks.
- **Use subagents only when they add real value** (parallel independent research, isolating a large read-heavy task from the main context). Don't spin up subagents for trivial edits.
- **Use Playwright only when browser verification actually matters** (visual change, new flow, cross-device check) — not on every task.
- Keep new knowledge additions in the *right small file*, not bolted onto this one.

## Updating brand/marketing knowledge

When given new source material (ad screenshots, Triple Whale reports, PDFs, campaign notes): extract the useful facts and update the relevant small file under `.claude/skills/possessionless-brand/knowledge/` or `.claude/skills/meta-ads-expert/`. New performance numbers replace stale ones in `current-performance.md`; historical results move to `campaign-history.md` rather than being deleted.
