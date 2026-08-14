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

## Round 3 — popup source correction + MOF removal + footer contrast fix

After Round 2 you reported the popup was still showing on the preview. Investigated properly this time instead of re-touching the theme:

**The "10% OFF!" popup is not a theme element.** It's a live Klaviyo Form ("SMS Popup", id `VKH9qv`, status `live`), which Klaviyo injects via its own on-site script account-wide — independent of which Shopify theme is published. That's why disabling the theme's `klaviyo-onsite-embed` app-embed block in Round 2 had no effect on it: that block was never what controlled it. Pausing it would be a live, site-wide marketing change (likely feeding an active SMS flow), not a dev-theme-scoped one, so I flagged it and asked before touching it. **You said leave it alone** — no Klaviyo changes made. Out of scope for this audit going forward.

Two things you did want fixed, both done on the dev theme (`142389837887`, still `UNPUBLISHED`):

1. **Removed the "closer look" MOF section entirely** from the homepage — you found it ugly, no partial fix, deleted the `mof_closer_look` section and its `order` entry from `templates/index.json`. Homepage now goes straight from hero to the "New Release" grid.
2. **Fixed the illegible footer.** The footer section is set to the dark `scheme-2` (correct: dark bg, light text), but was rendering as pale/washed-out text on a near-white background — nearly unreadable. Root cause: an existing custom override in `assets/possessionless-white-sections-fix.css` (added during the earlier white-body pivot) tried to force the footer dark via ID selectors `#shopify-section-footer` / `#shopify-section-utilities` — but Shopify's `sections/footer-group.json` group renders sections with dynamic, non-predictable IDs, not plain `#shopify-section-{key}`. So that CSS block never matched anything and silently did nothing. Fixed by adding the *stable* selectors Shopify actually guarantees — `.shopify-section-footer` / `.shopify-section-footer-utilities`, generated from each section's `type` (confirmed by reading `sections/footer.liquid`'s own markup) — alongside the original ID selectors as a fallback, for both the background/color-variable overrides and the sigil-divider decoration lower in the same file.

**Not yet visually confirmed** — Playwright/browser access is still blocked in this session, so the footer fix is based on reading the actual section markup and Shopify's documented ID/class generation convention, not a rendered screenshot. Worth a hard-refresh check on your end before calling it done.

## Round 4 — footer fix retry #2 + Size Guide removed

Round 3's footer fix (targeting `#shopify-section-footer` / `.shopify-section-footer`) did not work — you confirmed the footer was still washed-out pale text on a near-white background. Two changes this round:

1. **Removed the Size Guide link** block next to the size selector on the product page (`size_guide_link` block deleted from `templates/product.json`). Size guide is still reachable via the "Fit & Sizing" accordion row and the returns/fit copy, which link to `/pages/size-guide` — only the standalone inline link next to the selector is gone.
2. **Rewrote the footer fix a third time**, this time anchored to a confirmed fact instead of a guess: `layout/theme.liquid` wraps the entire footer group in a plain `<footer>{% sections 'footer-group' %}</footer>` tag. Selectors on `#shopify-section-footer` / `.shopify-section-footer` were guesses at Shopify's internal section-group ID/class naming that evidently didn't match. The new CSS in `assets/possessionless-white-sections-fix.css` targets the `footer` element directly (background-color, CSS custom properties, and a `footer, footer *` color rule), which doesn't depend on knowing Shopify's generated wrapper naming at all.

**Still not visually confirmed by me** — this session has no browser/DOM access, so every footer attempt so far has been "read the source, reason about what should render," which has now failed twice on this specific bug. Flagged this limitation directly rather than re-asserting confidence I don't have. Needs your visual check on the preview link before this is considered resolved.

## Round 5 — site-wide decay/glitch pass

Your direction: "clean it all up more, add a glitch effect to the whole site, make it like Saw type vibe that matches the logos... make it smoother... make it like withered hills site a bit but give it my vibe like saw." Couldn't view withered hills or the actual logo files (no browser access), so this was built from the brand facts already on record (Nocturne sigil line, "Nothing Owns You," ⟡ motif) plus the glitch/grain system already in the theme, pushed further.

Rewrote `assets/possessionless-white-sections-fix.css` as one clean, numbered file (1. white-section fixes, 2. topbar, 3. footer, 4. decay/glitch pass) — same content as Round 4, reorganized with section headers instead of scattered comments.

New in the decay/glitch pass:
- Rust-tinted vignette (was flat black)
- Rare vertical film-damage scratch flicker
- Chromatic-aberration text glitch expanded from headings-only to nav links, prices, footer headings, accordion labels — staggered timing so it reads as scattered decay, not a synchronized blink
- Glitch keyframes now end on an eased settle instead of a hard snap
- Broken-corner clip-path extended from the hero CTA to all theme buttons, with eased hover transitions
- One warning-stripe hairline accent (amber/black diagonal) above the New Release divider — deliberately restrained, not a full hazard-tape treatment
- Product image hover easing smoothed out (longer, curved transitions instead of linear)

Explicitly avoided: literal gore/blood, jump-scare visual language, anything that would clash with the brand's existing fashion-editorial positioning. Stayed in "damaged/rusted/decayed" territory rather than "horror movie prop."

**Not visually verified** — same limitation as every round: no browser access in this session. This is a bigger, more visible change than prior rounds (touches buttons and text glitch site-wide), so it needs your eyes before going further. Also worth double-checking mobile — the glitch/scanline effects haven't been evaluated for mobile performance or whether `prefers-reduced-motion` is enough of an escape hatch.

## Round 6 — footer polish (confirmed working, three follow-up fixes)

You confirmed the footer dark-charcoal fix from Round 5 is finally visually working. Three follow-ups from your screenshots:

1. **Removed the warning-stripe hairline** above the New Release divider — you called it a "random ass line." Deleted the `.section-resource-list__header::before` block from `assets/possessionless-white-sections-fix.css` entirely; the original sigil scratch-line divider (`::after`) stays.
2. **Removed the footer tagline** ("Possessionless was built for those who move through the dark...") — deleted the `tagline_text_pl001` block and its `block_order` entry from `sections/footer-group.json`. The brand blurb group now just holds the social icons.
3. **Fixed the invisible email-signup arrow.** Root cause: the button's fill/stroke was relying on `currentColor` inheritance from the button's `color` property, which wasn't rendering visibly in practice (button background was a light gray `#e0e0e0`, similar in tone to whatever the icon was actually rendering as). Rebuilt it as a black circular button with the fill/stroke on the icon's `svg`/`path` set directly instead of depending on inheritance — matches the reference site's black-circle-white-arrow treatment.
4. **Changed "Join the Movement" to "Stay in the Dark"** — on-brand with the Nocturne/night naming, drops the generic "join our newsletter" phrasing. Subtext line ("First access to new drops...") left as-is since you didn't flag it.

**Still not independently visually verified by me** — same session limitation as every round. But this round is different: for the first time, you confirmed the underlying dark-footer fix visually worked, which is real signal the file-write → render pipeline is sound now. The three fixes above are reasoned the same way (source-level, not rendered) — flag anything still off.

## Round 7 — real root causes instead of guesses (accordion, hero, zigzag dividers)

You called out that Round 6 "didn't do what I told you" — three real issues, this time diagnosed from actual markup instead of assumptions:

1. **Removed the zigzag "heartbeat bar" dividers.** The sigil scratch-line SVG divider (thin zigzag pattern) above the New Release grid and above the footer content — you correctly read it as looking like an EKG/heartbeat monitor line, not a sigil. Deleted both instances entirely from `assets/possessionless-white-sections-fix.css`.
2. **Fixed the SHOP/CUSTOMER SUPPORT accordion.** Root cause found in `blocks/menu.liquid`: it hardcoded `disable_on_desktop: true` and `open_by_default_on_desktop: true` regardless of the "show as accordion" setting, and the toggle-icon CSS was wrapped in a mobile-only (`max-width: 749px`) media query. That's why desktop always showed fully expanded with no chevron — a limitation baked into the block itself, not something my earlier CSS broke. Fixed by making desktop accordion behavior conditional on the block's own `show_as_accordion` setting (already `true` for both footer menus) and removing the mobile-only restriction on the chevron-visibility CSS.
3. **Repositioned + fixed the hero CTA.** Root cause: `blocks/ai_gen_block_af1492a.liquid` (the video hero) hardcodes its own content position via `top:50%; left:50%; transform:translate(-50%,-50%)` inside the block's own `{% style %}` tag — completely independent of the outer section's alignment settings, so my earlier plan to fix this via `templates/index.json` would never have worked. Rewrote the block's content positioning to `bottom:6%; right:5%; text-align:right` (bottom-right, both desktop and a mobile-adjusted variant), and moved the button's clip-path (broken-corner cut) directly into the block's own stylesheet with a bolder cut, since the block's real button class (`ai-video-hero__button-{{id}}`) wasn't getting a strong enough version of the site-wide button treatment before.
4. **Cleaned up dead CSS.** The Round 5 glitch pass had guessed at two selectors (`.accordion__toggle`, `accordion-custom summary`) that don't match anything in the real DOM (confirmed while reading `blocks/menu.liquid`) — removed them rather than leaving dead rules in the file.

**Still not independently visually verified** — same limitation every round. This round is different in kind, though: all three fixes are now grounded in the actual block/liquid source (read directly, not inferred), not another blind CSS guess.

## Round 8 — hero cleanup, compact size selector, buy-box rebuild

1. **Hero repositioned left, clip-path removed.** You flagged the bottom-right clip-path button as visually broken. Moved content to bottom-left (`blocks/ai_gen_block_af1492a.liquid`: `bottom:6%; left:5%; text-align:left`, plus a mobile equivalent) and dropped the clip-path entirely — back to a plain clean bordered rectangle, since the cut was the thing rendering wrong.
2. **Size selector shrunk.** Added a scoped CSS override (`.product-information .variant-option__button-label`) to shrink the buttons from the default oversized style to a compact ~42px square.
3. **Removed the Shop Pay / accelerated-checkout button** from the buy box — deleted the `accelerated-checkout` block from `templates/product.json`'s `buy_buttons_B7HMzq`. Add to Cart now expands to fill the row (`flex: 1 1 auto` added in the CSS) instead of splitting width with it.
4. **Add to Cart copy changed to "Add to Bag"** — via the `products.product.add_to_cart` locale key in `locales/en.default.json`. Kept it simple rather than reaching for something gimmicky per your "not cringe" note — "Add to Bag" is a common, deliberate-reading alternative in fashion/streetwear, not a joke line. (Left the *generic* `actions.add_to_cart` key — used for quick-add on product cards — untouched, so only the main product-page button changed.)

**Not done this round — flagged, needs your call:** you asked to add XS and XL sizes marked sold-out/crossed-out. The theme *would* render that automatically (unavailable variants already get strikethrough styling built in, confirmed by reading `snippets/variant-main-picker.liquid`) — but there's no XS/XL to show unless they exist as real product variants. That's a catalog change (adding actual variants with 0 inventory to all 4 products), which takes effect immediately/live — it's not theme-scoped like everything else this round. Didn't want to add real (if zero-stock) size variants to the live catalog without confirming that's actually wanted first.

**Still not independently visually verified** — same limitation every round.

## Round 9 — XS/XL sold-out variants added (live catalog change)

You confirmed: add them. Done via `productOptionUpdate` (`variantStrategy: MANAGE`) on all 4 products' "Size" option:

- 'Nocturne' Sigil Sweatpants
- 'Nocturne' Baggy Denim Jeans
- 'Nocturne' Sigil Sweatshirt
- 'Nocturne' Fur Zip-Up Hoodie

One wrinkle: the "Size" option on every product is linked to Shopify's standard size metafield/taxonomy (`shopify.size`), not plain text values — S/M/L already reference standard size metaobjects. Adding a plain "XS"/"XL" string value failed (`CANNOT_COMBINE_LINKED_AND_NONLINKED_OPTION_VALUES`). Found and used the store's existing standard-taxonomy metaobjects for XS (`gid://shopify/Metaobject/229145870399`) and XL (`gid://shopify/Metaobject/230175965247`) instead, via `linkedMetafieldValue`.

New variants on all 4 products: price auto-matched the existing S/M/L price (verified per-product), `inventoryPolicy: DENY`, inventory tracked, quantity `0`. Confirmed via a direct query that `availableForSale: false` on all 8 new variants (2 sizes × 4 products) — this is what triggers the theme's existing strikethrough-on-unavailable styling, so no theme changes were needed for this part.

**This is live on the real site immediately** (product/variant data isn't theme-scoped) — not staged on the dev theme like the rest of this round's work. If you ever actually stock XS/XL, the variants already exist and just need real inventory quantities set.
