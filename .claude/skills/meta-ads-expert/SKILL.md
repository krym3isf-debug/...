---
name: meta-ads-expert
description: Meta Ads analysis methodology for Possessionless — metrics, evaluation priority, funnel-aware creative classification, and how to read live ad performance data. Use for any Meta/Facebook/Instagram ads analysis, funnel diagnosis, creative performance review, or "should we scale/pause this" discussion. Does not contain brand facts (see possessionless-brand skill) or numeric kill/scale thresholds (user-supplied only).
---

# Meta Ads Expert

## Hard rule: no invented thresholds

This skill does **not** define CPA targets, ROAS targets, or kill/scale rules. Those come only from the user's own playbook/source material. If a decision needs a threshold that isn't documented anywhere in this repo, **ask the user or flag it as missing** — never fabricate a number that sounds plausible. If/when the user provides their playbook (a doc, screenshots, a set of rules), save it under `knowledge/` in this skill (create the subfolder) as its own file, and reference it here.

## Metrics this skill understands

Spend, Impressions, Reach, CPM, Link Clicks, CTR, CPC, Landing Page Views (LPV), Adds to Cart (ATC), Initiate Checkout, Purchases, CPA, ROAS, Frequency, and funnel progression between these steps.

## Evaluation priority

General evaluation priority, from most to least trustworthy signal of real business outcome:

```
Purchase > Checkout (Initiate Checkout) > ATC (Add to Cart) > LPV (Landing Page View) > Click
```

This is the *default lens* for judging whether a creative/ad set is working — purchases matter more than upstream engagement metrics. But it must be applied **relative to the creative's intended funnel stage** (see below) — a TOF awareness ad with strong hook rate and weak purchases is not necessarily failing; it may be doing its job if the funnel's MOF/BOF is what's supposed to convert.

## Funnel-stage-aware classification (TOF / MOF / BOF)

Classify creatives as TOF, MOF, or BOF **when enough information exists** to do so (campaign objective, ad set targeting warm vs. cold, creative content itself). Use `.claude/skills/possessionless-brand/knowledge/creative-framework.md` for the format/goal definitions of each stage — don't duplicate that content here, load it when doing creative classification.

When classification is ambiguous (not enough signal from campaign structure or creative), say so rather than guessing — a wrong TOF/BOF label leads to judging a creative by the wrong standard.

## Data sources available in this environment

- **Windsor.ai MCP** — Meta Ads (and other platform) read data, plus write actions (campaign/ad/budget/bid changes) gated by explicit user confirmation per action. Call `get_connectors`/`list_actions` to see what's connected before assuming an account is wired up.
- **Triple Whale MCP** — separate attribution/analytics system; use `get-summary-kpis`, `pixel-attribution`, `run-sql` etc. Do not mix Triple Whale attribution numbers with Meta-reported numbers as if they're the same measurement — present both, note the gap, when they diverge.

## Workflow loop

Follow this loop when the user provides new source material or asks for analysis:

```
SOURCE MATERIAL → PLAYBOOK → LIVE DATA → ANALYSIS → ACTION → NEW DATA → UPDATED PLAYBOOK
```

1. When given videos/PDFs/guides/screenshots/reports, extract the useful rules/facts and save them to the right knowledge file (this skill for strategy/thresholds, `possessionless-brand` for brand/campaign-history/current-performance).
2. Pull live data via the MCP tools above rather than relying on memory or stale notes.
3. Analyze using the evaluation priority + funnel classification above, applying only user-supplied thresholds.
4. Any resulting *action* (pausing, budget change, new campaign) requires explicit user approval before execution — never execute a Meta Ads write action proactively.
5. New performance data replaces `current-performance.md`; the prior period's data moves to `campaign-history.md`, not deleted.

## Multi-perspective review

For high-stakes calls (pause/scale a major campaign, budget reallocation, strategy pivot) — not routine reporting — consider using the `council` skill for a structured multi-angle review before recommending action. Don't invoke it for routine "how's this campaign doing" questions.
