# Shopify CRO Audit & Implementation — August 2026

Record of the conversion audit and implementation on `possessionless.store`, done via the Shopify Admin API (Playwright couldn't reach the live site from that session's sandbox — network policy blocked all outbound browsing, confirmed on multiple hosts).

## Dev theme — rebased once (see below)

**Current dev theme:** `POSSESSIONLESS CRO TEST - AUG 2026` (`gid://shopify/OnlineStoreTheme/142389837887`) — unpublished duplicate of **`Step 1 - Bar`** (`gid://shopify/OnlineStoreTheme/142343536703`, itself left untouched).

**History:** the CRO fixes were originally built on a duplicate of the live theme ("Copy of Vessel", `gid://shopify/OnlineStoreTheme/142225670207`, role MAIN), per an explicit instruction to leave `Step 1 - Bar` untouched and use the live theme as the base. The user later clarified they preferred `Step 1 - Bar`'s in-progress direction over the live site. That first dev theme (`gid://shopify/OnlineStoreTheme/142379483199`) was renamed to **"OLD - please delete (was Copy of Vessel based)"** and left unpublished — `themeDelete` is blocked by this environment's MCP safety policy (theme deletion could affect the live storefront), so it needs to be deleted manually in Shopify admin. All CRO fixes were rebuilt on a fresh duplicate of `Step 1 - Bar` instead.

**Aesthetic direction correction:** inspecting `Step 1 - Bar` revealed it had already pivoted to a white page background with dark charcoal (`#0a0a0a`) header/footer and glitch/scanline/chromatic-aberration accents (see `assets/possessionless-white-sections-fix.css`, `assets/possessionless-header-grain-fix.css`) — contradicting the original "dark/black" brief. Confirmed with the user this white-body direction is now current (recorded in `.claude/skills/possessionless-brand/knowledge/website.md`). All CRO additions below use theme color-scheme variables (`var(--color-foreground)` etc.) rather than hardcoded colors, and the homepage MOF section uses `scheme-8` (white) to match rather than the dark `scheme-4` used in the first pass.

Live theme was never modified throughout. Current dev theme role confirmed UNPUBLISHED after all changes.

## What shipped on the dev theme (`templates/product.json`, `templates/index.json`)

1. **Size Guide link** added beside the size selector on the shared product template (applies to all 4 products) — links to the existing, already-well-built `/pages/size-guide`.
2. **Sticky mobile Add to Cart enabled** (`enable_sticky_add_to_cart: true`) — this was a pre-built, disabled theme setting; no new code needed.
3. **Product accordion populated** with 4 real rows: Shipping, Returns & Exchanges, Fit & Sizing (links to size guide), More Questions (links to FAQ). All copy sourced verbatim/paraphrased from the real shipping and refund policies — nothing invented.
4. **Concise purchase reassurance** added directly after the Add to Cart button: "FREE SHIPPING · SECURE CHECKOUT · Same-day dispatch before 3PM" — matches the real global free-shipping policy and real dispatch cutoff.
5. **Homepage MOF section** added between the hero and the product grid: one real garment close-up (`nocturnefurzipuphoodcloseup.png`, the Fur Zip-Up Hoodie), a small kicker ("⟡ closer look" — matches the existing "⟡ new release" kicker style), one short factual line ("Heavyweight cotton fleece. Faux fur hood. Screen printed by hand." — pulled from real product spec, not brand narrative), and a "Shop the Fur Zip-Up Hoodie" link. No brand-story copy, no fabricated model imagery, per your explicit scope for this round.

## What shipped directly on the catalog (live immediately — not theme-scoped)

Two items in your list are product/catalog data, not theme template data, so they were **not** stageable on the dev theme — they took effect immediately on the live site as soon as applied:

- **Fixed "free shipping over $100" → "free shipping on all orders"** in the SEO meta description of all 4 active products (was contradicting the real announcement-bar policy).
- **Added accurate image alt text** to all 16 product images across the 4 products (previously all empty). Alt text uses only confirmed facts (product name, front/back/size-chart from filenames) — no invented visual details, since this session couldn't view the images.

These were corrections of existing wrong/missing data explicitly requested, not visual/structural changes, which is why they were applied directly rather than held for preview. Flagging clearly since "don't publish live" was about the *theme*.

## Deliberately not done this round (per your scope)

- Hero redesign/rewrite
- About/brand story section
- Review/rating changes — the product page has a `review` block wired up; couldn't confirm from theme code alone whether it's connected to real review data. Left untouched.
- Footer FAQ link — attempted, rejected by Shopify's own schema validation: the `footer-utilities` section has a hard 3-block allowlist (`footer-copyright`, `footer-policy-list`, `social-links` only, max 3 blocks) that doesn't accept a generic link/text block. FAQ is still reachable from the product-page accordion ("More Questions" row) and from the existing main-nav Policies dropdown.
- Did not touch the global Menu resource (main nav) — menus are shop-wide, not theme-scoped, so editing one would have affected the live site immediately regardless of which theme is published.
- Did not wire up `snippets/product-delivery-estimate.liquid` — a pre-existing, unused, well-built dynamic delivery-date snippet found in the theme. Left inactive because its copy ("Order now to receive by this date") leans toward urgency-style phrasing the brand rules caution against; worth a deliberate decision later rather than activating it silently.
- Did not use any `ChatGPT_Image_*.png` files from the asset library for the MOF section — contents unverified (this session can't view images), and the brand rules explicitly prohibit fake-customer imagery.

## Verification performed

- All modified theme JSON files (both the original Copy-of-Vessel-based pass and the rebased Step-1-Bar-based pass) validated for syntax before upload; accepted by Shopify's own theme schema validation on both passes (which also correctly rejected one file — the footer link attempt — proving the check is real, not a rubber stamp).
- Confirmed dev theme role remained `UNPUBLISHED` and live theme role remained `MAIN` throughout, including after the rebase.
- Could not run a rendered-browser check (Playwright) in this session — network policy blocked it. Visual/mobile verification still needs either a rendered preview pass or a differently-configured session.

## Outstanding manual step

Delete the theme named **"OLD - please delete (was Copy of Vessel based)"** in Shopify admin → Online Store → Themes → Draft themes. This session's tools are blocked from doing this (`themeDelete` is disabled by the MCP server's safety policy).

## Round 2 — screenshot feedback fixes

You sent 3 screenshots of the rebuilt dev theme with feedback ("remove this. fix this and fix this"). Interpreted as three issues, all fixed on the same dev theme (`142389837887`, still `UNPUBLISHED`):

1. **Removed the "10% OFF!" on-site popup.** This is a Klaviyo app-embed block (`config/settings_data.json`, block id `855628211100114053`, type `klaviyo-onsite-embed`). Set `disabled: true` on this theme only — does not touch the live Klaviyo campaign/flow itself, just stops it from rendering on this draft theme.
2. **Removed duplicate shipping messaging on the product page.** The product description already had a baked-in "SHIPPING:/CHECKOUT:" line, immediately followed by a separate `shipping_returns_info` text block saying nearly the same thing. Deleted the redundant `shipping_returns_info` block (and its `block_order` entry) from `templates/product.json`. The real shipping/returns info is still covered by the product accordion added in Round 1.
3. **Fixed the invisible CTA on the homepage MOF section.** "Shop the Fur Zip-Up Hoodie" was rendering as a plain, barely-visible text link (`style_class: "link"`). Changed it to `"button-secondary"` (same style used by the "Shop All" and other section CTAs on this theme) in `templates/index.json`, so it now reads as a real button.

**Note on the first upload attempt:** the initial `themeFilesUpsert` call submitted all three files together, but Shopify's response only listed 2 of 3 as upserted (`settings_data.json` silently didn't apply, no error returned). Caught this by re-querying the live file content — confirmed the popup was still `disabled: false` — and re-submitted `settings_data.json` alone, which succeeded. All three fixes are now verified live on the dev theme by re-reading the actual file contents (not just trusting the mutation response).

**Verified after this round (by re-fetching the theme's actual files, not just the mutation response):**
- `config/settings_data.json`: Klaviyo block `disabled: true` ✓
- `templates/product.json`: `shipping_returns_info` block no longer present ✓
- `templates/index.json`: MOF section button `style_class: "button-secondary"` ✓
- Theme role still `UNPUBLISHED` ✓
