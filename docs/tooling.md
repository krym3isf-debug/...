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

## Third-party plugins installed in this repo

**Superpowers** (`superpowers@superpowers-dev`, from [obra/superpowers](https://github.com/obra/superpowers), MIT, maintained by Jesse Vincent) and **UI/UX Pro Max** (`ui-ux-pro-max@ui-ux-pro-max-skill`, from [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill), MIT) are installed as real Claude Code plugins — both vetted (license, maintainer, recent commit activity, hook/script contents inspected) before install. They're declared in `.claude/settings.json` under `extraKnownMarketplaces` + `enabledPlugins`, so any Claude Code session that opens this repo — this cloud session, your desktop app, your local CLI — picks them up automatically. No per-machine setup needed.

**Stop Slop** (from [hardikpandya/stop-slop](https://github.com/hardikpandya/stop-slop), MIT) has no Claude Code plugin manifest upstream (just a plain skill), so it's vendored directly at `.claude/skills/stop-slop/` with its license preserved — same effect, different mechanism.

Verified token cost (via `claude plugin details`): Superpowers ~688 tokens always-on across 14 skills; UI/UX Pro Max ~1,082 tokens always-on across 7 skills. Both load full content only when a specific skill actually fires.

## Third-party usage/routing tools — for YOUR machine (not this cloud session)

These are legitimate, actively maintained projects, but they patch a *local* Claude Code install — they have to be set up wherever you actually run Claude Code day to day, not from this disposable cloud session. Verified by cloning and inspecting both repos directly (license, maintainer, recent commits, install docs) rather than trusting search summaries.

### ccusage — local usage/cost monitor

- Repo: [ryoppippi/ccusage](https://github.com/ryoppippi/ccusage) (npm: `ccusage`, MIT license, actively released — v20.x as of this setup)
- Reads Claude Code's local session JSONL logs and reports token usage/cost. No API key, no network call, nothing to configure.
- Run on your machine (no install needed to try it): `npx ccusage@latest`
- Useful variants: `npx ccusage@latest blocks --live` (live 5-hour billing-block view), `npx ccusage@latest daily` / `monthly`, or wire it into your shell statusline — see the [ccusage docs](https://ccusage.com/) for the exact statusline snippet.
- Caveat: it only sees usage from the machine it runs on. If you use Claude Code from more than one machine, run it on each, or check plan usage directly at claude.ai account settings for the authoritative cross-device number.

### claude-code-router ("CCR") — model routing gateway

- Repo: [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router), MIT, very active (commits same-day as this setup).
- **Naming trap found during verification: the bare npm package literally named `claude-code-router` is a different, unrelated, stale package (last published mid-2025, different author) — do NOT install that one.** The real package is scoped: **`@musistudio/claude-code-router`**.

**Install (on your machine, Node.js 22+):**
```sh
npm install -g @musistudio/claude-code-router
ccr ui              # starts the gateway + opens the management UI at http://127.0.0.1:3458
# headless/SSH machine: ccr ui --no-open
```

**Setup flow (in the management UI):**
1. Add a provider + at least one model (see recommendations below).
2. Create a CCR client key (API Keys page).
3. Add a Claude Code "Agent Config" profile, optionally setting per-tier models (default/Fable/Opus/Sonnet/Haiku can each point at a different model).
4. Launch Claude Code from CCR's generated command (CLI button on the profile card) — CCR rewrites `ANTHROPIC_BASE_URL`/`apiKeyHelper` for that launch only; it does not touch your normal `claude` command unless you explicitly choose "System default" scope.

**How it routes simple work away from Claude while keeping Claude for hard reasoning:** CCR's subagent auto-routing tags each model with a `Description` (task fit / speed / cost). When Claude Code's own Agent/Task tool spawns a subagent, it can pick a cheaper tagged model itself based on that description — main-thread reasoning stays on whatever model you set as the profile default (keep that on Claude), while parallel/simple subagent work can fall through to the cheap model automatically. This is the "preserve Claude's workflow, route background work only" behavior from the walkthrough you saw.

**API keys needed:** none of these are supplied by CCR or by me — you provide your own account/API key for whichever provider(s) you add in the UI. Never share a key from an unverified source claiming "free Claude credits"; a real provider key always comes from that provider's own account dashboard.

**Cheapest sensible pick for simple/background coding tasks** (verified pricing at time of writing, per-million-tokens input/output):
- **DeepSeek** (`deepseek-chat` / DeepSeek V4-Flash) — ~$0.14 / $0.28, natively listed as a CCR provider. Best default choice: cheap, coding-capable, minimal setup.
- **Gemini 2.5 Flash** — ~$0.30 / $2.50, and Google AI Studio has a free tier, so you can trial routing at zero cost before committing spend.
- **Local Ollama model** — literally $0 and fully private (nothing leaves your machine), but needs reasonable local hardware and is the weakest of these three for complex code; fine for trivial background tasks (formatting checks, simple lookups).
- If background tasks need more actual coding competence than the above (not just cheap), MiniMax M3 (~$0.60 / $2.40) was the best cost/SWE-bench tradeoff found during research — still far cheaper than keeping everything on Claude.

Recommended split: leave the main/default model on Claude (keeps hard reasoning, planning, and anything code-review-sensitive on Claude quality), point the Haiku tier and/or subagent-description-tagged background models at DeepSeek or Gemini Flash.
