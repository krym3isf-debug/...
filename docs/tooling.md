# Tool Routing / Usage Optimization

## Environment note

This repo can be opened by Claude Code from multiple surfaces (web/cloud sessions like this one, desktop app, CLI on your own machine). Anything below that's "repo-level" (skills, agents, settings, configs in this repo) works from any of those surfaces automatically, because it travels with the git repo. Anything that patches a *local Claude Code install itself* (a model router, a local usage-monitor CLI) only affects the machine it's installed on — it has to be set up wherever you actually run Claude Code day to day, not from inside a disposable cloud session tied to this repo.

## Built-in usage optimization (already configured, no setup needed)

- **Subagents use `model: inherit`** (see `.claude/agents/*.md`) rather than hardcoding an expensive model, so they follow whatever model the main session is using — cheap sessions stay cheap, and you're not paying reasoning-model rates for a subagent doing a mechanical Playwright check.
- **Skills are split into small files** (`.claude/skills/*/`) so a task only pulls in the one knowledge file it needs instead of one giant brand context dump every time.
- **CLAUDE.md is deliberately short** — it's loaded every session, so it only contains pointers + hard safety rules, not the actual knowledge content.
- **The Council skill is gated** to explicit request / high-stakes decisions only — it's the most expensive pattern here (multiple subagent calls) and is off by default.
- **Playwright and multi-agent research are both "when it matters" tools**, called out explicitly in their own docs/skill files, not defaults.

## Model selection — for reference

Claude Code on the web/desktop/CLI lets you pick a model per session (e.g. via `/model` or session settings) and per-subagent (`model:` field in an agent's frontmatter, which we've set to `inherit`). If your plan/interface exposes a smaller/faster model (e.g. Haiku-class) for routine work, switching to it for CSS tweaks, copy edits, and other low-complexity sessions — and reserving the largest reasoning model for genuinely hard problems — is the single biggest lever you control directly, with zero new tools or credentials.

## Third-party usage/routing tools (candidates — not installed, see setup report)

These are legitimate, actively maintained projects that a local Claude Code install (yours, not this cloud session) can use. Install/run them only on the machine where you actually use Claude Code day to day:

- **[ccusage](https://github.com/ryoppippi/ccusage)** — reads Claude Code's local session logs and reports token usage/cost with no API key and no network call. Run with `npx ccusage@latest` on your local machine, no install required to try it.
- **[claude-code-router](https://github.com/musistudio/claude-code-router)** ("ccr") — a local proxy that lets you launch Claude Code (`ccr code` instead of `claude`) with per-scenario model routing (default / background / reasoning / long-context / web-search) to other providers (OpenRouter, DeepSeek, Gemini, local Ollama models, etc.), while keeping Claude Code's own skills/subagents/MCP/hooks intact. Requires your own API key(s) for whichever provider(s) you route to — it does not come with free Claude credits, and you should supply your own keys, not a key from an unverified source.

See the setup report for why these weren't auto-installed (they need to run on your machine, and the router needs your own third-party credentials — a decision only you should make).
