# Browser Testing (Playwright) — Conventions

## When to use it

Only when browser verification actually matters: a visual/layout change, a new user flow, a cross-device check, or verifying a bug before/after a fix. **Not** on every task — routine code/copy edits don't need a browser round-trip, and running Playwright on everything burns usage for no benefit.

## Setup (already done in this repo)

- `@playwright/test` is a devDependency (root `package.json`).
- Config: `playwright.config.ts` — headless by default, both a `mobile` and `desktop` project configured.
- Browsers are pre-installed in this environment at `/opt/pw-browsers` (Chromium only — no WebKit/Firefox cache). `@playwright/test` is pinned to the exact version (`1.56.1`) matching the pre-cached browser revision — bumping it may break browser launch until the cache is refreshed; do **not** run `npx playwright install` to "fix" a version mismatch, re-pin the version instead.
- The `mobile` project uses Chromium-based device emulation (`Pixel 7`), not an iPhone/WebKit preset, since WebKit isn't cached here.
- **This sandbox's outbound network policy blocks arbitrary external browsing** (confirmed: navigating to `example.com` gets a 403 policy denial at the proxy, not a TLS error — don't try to route around it). This only affects *this cloud session*; a local Claude Code session on your own machine, or Playwright pointed at your actual dev/live store URL, won't have this restriction. For that reason, `tests/smoke.spec.ts` verifies the toolchain against a local fixture page (`tests/fixtures/sample.html`) instead of an external URL — that's also just a better-isolated smoke test in general.
- Smoke test at `tests/smoke.spec.ts` — verified working in this session (browser launch, navigation, DOM assertions, click interaction, console-error check, screenshot — desktop + mobile projects both pass).
- To test the actual Possessionless site once you have a URL (dev preview or live), point a new spec at that URL directly — no config changes needed, just be mindful of the network-policy note above if running from a cloud session.

## What it can do here

Navigate, click, fill forms, test nav/menus, test mobile vs. desktop viewports, test Add to Cart flows, inspect console errors, take screenshots, verify links, and compare before/after states.

## Safety

- Never complete a real checkout / real payment / real order submission against the live store. Stop before the final submit step, or run against a development/test environment/cart only.
- Read-only browsing of the live public storefront (checking how a page renders) is fine; anything that would mutate live store state is not, without explicit approval.

## Running tests

```
npx playwright test                 # run all tests headless
npx playwright test --headed        # watch it run
npx playwright test --project=mobile
npx playwright show-report          # view last HTML report
```
