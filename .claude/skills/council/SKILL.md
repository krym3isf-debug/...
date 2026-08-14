---
name: council
description: Multi-perspective critique for high-stakes Possessionless decisions (Meta Ads strategy pivots, pause/scale calls, website redesigns, conversion problems, major architecture or spend decisions). Orchestrates several focused subagent reviews and synthesizes a recommendation. Do NOT use for routine tasks — only when the user explicitly asks for "the council"/multiple perspectives, or the decision is genuinely high-stakes. Costs significantly more usage than a normal response.
---

# The Council

A native, zero-extra-dependency implementation of a "multiple perspectives" review. It does not call out to other AI providers — it uses this environment's own Agent tool to run several differently-angled subagent passes over the same decision, then synthesizes them. This keeps it fully inside Claude Code (no third-party proxy, no extra API keys) while still giving genuinely independent perspectives, since each subagent starts with a clean context and doesn't see the others' output until synthesis.

## When to use

Only for decisions the user flags as high-stakes, or when they explicitly ask for "the council" / a second opinion / multiple perspectives. Examples: whether to pause or scale a Meta campaign, a website redesign direction, diagnosing a persistent conversion problem, a significant architecture choice.

**Do not** invoke this for routine tasks, small copy edits, minor CSS changes, or day-to-day reporting — it burns meaningfully more usage than a single response, which conflicts with this project's low-usage priority.

## How to run it

1. Frame the decision clearly in one paragraph: what's being decided, what's already known, what's genuinely uncertain.
2. Launch 2–4 `Agent` calls in parallel (single message, multiple tool calls), each with a distinct lens relevant to the decision at hand — pick lenses that fit, e.g.:
   - **Numbers/performance lens** — what does the data actually say, independent of narrative
   - **Brand/aesthetic lens** — does this fit Possessionless's identity and voice
   - **Customer/UX lens** — what would a skeptical customer experience
   - **Risk/downside lens** — what's the worst case if this is wrong
3. Each agent should get the same framing plus its lens, and should NOT be told what the other lenses concluded — independence is the point.
4. Read all responses, then write your own synthesis: where they agree, where they conflict, and your actual recommendation. Don't just concatenate their outputs.
5. Use efficient model settings for the individual lens passes where the sub-question doesn't require heavy reasoning (see subagent definitions in `.claude/agents/`); reserve deeper reasoning for the synthesis step.

## Third-party alternative (not installed)

If you specifically want true cross-*provider* deliberation (e.g. Claude + a locally-run Codex/Gemini CLI actually debating), that requires a separate third-party plugin and those other CLIs authenticated on the machine running Claude Code — not something this cloud session can install for you. See the setup report for named candidates found during research (multiple maintainers use the name "council" — none was a single obvious canonical choice, so none was installed automatically).
