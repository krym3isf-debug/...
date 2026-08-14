# Tracking & Attribution — Possessionless

## Meta Pixel

**Active pixel — the only one to use:**
- Name: `MAIN PIXEL`
- ID: `2236610750526527`

**Do NOT use these pixels for anything** (do not wire into Shopify, GTM, campaigns, or any config) without explicit approval from the user first:
- `1041572915329119` — labeled `DONT USE`
- `2159043564673189` — labeled `DONT USE 2`

If any task would involve selecting, switching, or configuring a pixel, confirm it's `2236610750526527` before proceeding, and flag it explicitly if a change is about to touch pixel config at all.

## Triple Whale

Triple Whale runs **alongside** Meta as a separate attribution/analytics system, via its own Triple Pixel. Do not substitute the Triple Whale pixel for the Meta conversions dataset, or treat their numbers as interchangeable — they measure attribution differently. When comparing Meta-reported vs. Triple-Whale-reported results, present both and note the discrepancy rather than reconciling them into one number.

The Triple Whale MCP connector is already available in this environment (read-only analytics — KPIs, pixel attribution, SQL over their warehouse). No credentials needed from the user for read access; it's already connected.

## Meta API / Ads platform access

Meta Ads read/write access in this environment goes through the **Windsor.ai MCP connector**, which is already connected. It can read Meta Ads performance data and, when explicitly authorized per action, execute write actions (campaign/ad/budget/bid/audience changes) — see `.claude/skills/meta-ads-expert/SKILL.md` for the approval rule: no write action ever runs without the user explicitly confirming that specific change first.
