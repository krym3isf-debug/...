# Shopify Development — Conventions

## Two separate access paths — use the right one

1. **Shopify Admin API via MCP** (already connected in this environment, no setup needed) — `mcp__Shopify__*` tools: products, collections, orders, customers, inventory, discounts, ShopifyQL analytics, and general GraphQL for anything without a dedicated tool. Use this for **data operations** (reading/writing products, orders, inventory, etc.) — it's live against the connected store.
2. **Shopify CLI + theme code** (this repo, `theme/` once a theme exists) — for **Liquid/theme development**: sections, templates, snippets, theme settings, CSS/JS. Use `npx shopify theme dev` for a local preview server against a development/unpublished theme.

## Safety

- Never run `shopify theme push --live` or any Admin API mutation that changes live storefront/checkout config without explicit, in-the-moment approval.
- Prefer working against a preview/unpublished theme (`shopify theme dev` opens one automatically) rather than editing the live theme directly.
- `shopify theme pull` / `shopify theme push` (non-live) are safe for iterating on a development theme.

## Tooling installed in this repo

- `@shopify/cli` (v4, which bundles theme commands directly — the standalone `@shopify/theme` package is deprecated as of CLI 3.59+, so it's intentionally not installed separately) — installed as a devDependency (see root `package.json`). Run via `npx shopify <command>` or `npm run` scripts.
- Linting: `shopify theme check` (official Liquid linter, powered by `@shopify/theme-check-node` — checks schema errors, deprecated tags, performance issues), plus `stylelint` for theme CSS and `eslint`/`prettier` for theme JS. Config files are at the repo root (`.theme-check.yml`, `.stylelintrc.json`, `.eslintrc.json`, `.prettierrc`). Run `npm run lint:theme`.
- These are configured but there's no theme code in the repo yet — add the actual theme files under a `theme/` directory (via `shopify theme pull` from the store, or `shopify theme init` for a new one) when ready; the lint configs will pick it up automatically.

## Authentication

`shopify theme dev`/`push`/`pull` require an interactive browser login to the Partner/store account — that has to happen in a session with browser access to your Shopify login, which this cloud session doesn't have. When you're ready to connect a real theme, either run the login step yourself locally, or do it in a session you can complete the OAuth flow in.
