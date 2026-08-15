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

## Round 10 — delivery estimate box wired up, "Buy with Shop" root-caused

You sent an Amazon-style reference screenshot ("i want that shipping thing") — a real, computed "Estimated Delivery: [date range] / Ships within 48 hours" box near Add to Cart.

**Found and reused an existing asset instead of building from scratch.** `snippets/product-delivery-estimate.liquid` already existed in the theme (flagged back in Round 1 as deliberately left unwired — its original copy leaned into "Order now to receive by this date"-style urgency language, which needed a decision before activating). Its Liquid date logic was real, not fake: computes actual dispatch date (today vs. tomorrow based on a 3PM store-time cutoff) and walks 5–8 *business* days forward (skipping Sat/Sun) for the delivery window. Left that computation untouched.

Two things fixed before wiring it in:
1. **Removed the urgency copy.** Dropped the "Order now to receive by this date" line and its bold purple styling — replaced with a plain factual sub-line ("Same-day dispatch on orders placed before 3PM."). The brand's anti-manufactured-urgency rule doesn't apply to a genuinely computed delivery estimate, but the "ORDER NOW" framing on top of it was manufactured pressure layered onto real data, and that part came out.
2. **Fixed a dark-scheme CSS bug that would've made the box invisible.** The snippet's original styles were hardcoded for a dark background (`rgba(255,255,255,X)` for both background and text) — but the product page section runs on `scheme-8` (white/light). As originally written, activating it would have rendered white-on-white. Rewrote all colors to theme CSS variables (`var(--color-background)`, `var(--color-border)`, `var(--color-foreground)`, `var(--color-foreground-heading)`) so it adapts to whichever scheme it's placed on.

Wired in via `templates/product.json`: added a `custom-liquid` block (`delivery_estimate_r10`, `{% render 'product-delivery-estimate' %}`) positioned right after the Add to Cart button, before the purchase-reassurance line. Also simplified the existing "FREE SHIPPING · SECURE CHECKOUT · Same-day dispatch before 3PM" line to just "FREE SHIPPING · SECURE CHECKOUT" — the dispatch-time claim is now covered in more detail by the new box, and stacking both would've recreated the earlier duplicate-shipping-text problem.

Both files pushed to the dev theme (`gid://shopify/OnlineStoreTheme/142389837887`) via `themeFilesUpsert` and independently re-verified by reading the actual file content back afterward — confirmed live, and the theme role is still `UNPUBLISHED`.

**"Buy with Shop" button — root cause found, not a theme bug.** Your annotated screenshot showed the purple Shop Pay button still present on the *dev preview theme itself* (confirmed by the "Draft" badge and preview bar in the screenshot) — not a live-site/cache issue as suspected. That means Round 8's removal of the `accelerated-checkout` block from `buy_buttons_B7HMzq` genuinely worked at the theme level, but didn't stop the button from rendering. Checked the Admin API for the Shopify Payments account config to confirm — access to `shopifyPaymentsAccount` is denied under this session's current API scope (`read_shopify_payments`), which itself points at the real cause: dynamic checkout buttons (Shop Pay / PayPal / etc.) are a **store-level Payments setting** ("Show dynamic checkout buttons" under Settings → Payments in Shopify admin), independent of the theme's buy-buttons block. Theme-side removal can't turn it off. If you want it gone, that's a one-toggle change in Shopify admin — flagging rather than touching it myself since it's outside theme scope and affects the whole store, not just this dev theme.

**Also surfaced by your annotated screenshot, not yet acted on:** the markup shows duplicate shipping/checkout messaging *inside the product description itself* ("SHIPPING: SAME-DAY DISPATCH ON ORDERS BEFORE 3PM" / "CHECKOUT: SECURE, ENCRYPTED CHECKOUT" as bullet-style lines above the size selector) — a third location beyond the two already addressed this round. There also appear to be cross-outs over the Returns & Exchanges and Fit & Sizing accordion rows. Content-level product description edits and removing accordion sections are decisions, not obvious theme fixes — asked you to confirm scope before touching either.

**Not visually verified** — same session limitation as every round (no browser access).

## Round 11 — delivery box copy matched to your reference, redundant shipping bullets removed from descriptions

Follow-up to Round 10, based on a reference screenshot of another streetwear product page (different brand — the coincidental date match to ours was just two independent 5–8-business-day calculations landing near the same real-world date, not the same site).

1. **Delivery box copy now matches your reference exactly.** Restored "Ships within 48 hours. **ORDER NOW** to receive by this date." (red accent, `#c0392b`, on "ORDER NOW"), replacing the plainer "Same-day dispatch..." line from Round 10. Worth being explicit about this reversal: Round 10 deliberately removed this exact phrasing as manufactured-urgency risk. You've now asked for it twice, specifically, referencing a real page that uses it the same way — tied to genuinely computed dates, not fake countdowns or fabricated stock claims — so this is your call, not a default I'm re-applying. Pushed to `snippets/product-delivery-estimate.liquid` on the dev theme, verified live.

2. **Removed the duplicate SHIPPING/CHECKOUT bullets from all 4 product descriptions** (the thing your annotated screenshot was flagging) — matching your reference's minimal Fabric/Fit/Graphics-only format. This was a live catalog edit (`productUpdate` on `descriptionHtml`, same category as Round 9's variant work — takes effect immediately, not theme-scoped):
   - 'Nocturne' Sigil Sweatpants
   - 'Nocturne' Baggy Denim Jeans
   - 'Nocturne' Sigil Sweatshirt
   - 'Nocturne' Fur Zip-Up Hoodie

   Each description is now just the `<strong>Fabric:</strong> / <strong>Fit:</strong> / <strong>Graphics:</strong>` three-liner — the "SHIPPING: Same-day dispatch..." / "CHECKOUT: Secure, encrypted checkout" paragraph that used to follow it is gone, since that's now covered by the delivery-estimate box and the "FREE SHIPPING · SECURE CHECKOUT" line below Add to Cart. No more triple-repeated shipping messaging on the page.

**Not done (deliberately out of scope this round):** the reference page's "Find My Size" button, the "Jamal is 6'0 130lbs wearing size MEDIUM" fit-comparison line, and the "LOW STOCK · SALE ENDS SOON" badge — you said layout-only for those, not copy, and didn't ask for them to be built. The low-stock/sale-ending badge in particular would need real inventory/sale-end data behind it before it's worth revisiting — flagging that as the one piece from that reference that's genuine fake-urgency risk if ever added without real numbers.

**Not visually verified** — same session limitation as every round.

## Round 12 — Buy with Shop actually removed, delivery window shortened, XS reordered, image layout changed

You sent a live screenshot of the dev theme plus more reference images and a blunt list of five things. All five done:

1. **Delivery window shortened to 3–4 business days.** `snippets/product-delivery-estimate.liquid`: `min_days`/`max_days` changed from 5/8 to 3/4. Also updated the Shipping accordion text ("U.S. delivery in 5–8 business days" → "3–4 business days") so it doesn't contradict the box above it — same duplicate-messaging trap as every other round.

2. **Buy with Shop button — actually removed this time, real root cause found.** Round 8 removed the `accelerated-checkout` block from `templates/product.json`, which had no effect because that block is `"static": true` — Shopify renders static blocks via a hardcoded `content_for 'block', type: 'accelerated-checkout', id: 'accelerated-checkout'` call inside `blocks/buy-buttons.liquid` itself, regardless of what's in the JSON blocks map. That's the real explanation for the standing discrepancy flagged in Rounds 10–11. Fixed by editing `blocks/buy-buttons.liquid` directly — deleted the `content_for` call and the `accelerated-checkout` entry from its schema preset. This is a shared block file, so the Shop Pay button is gone everywhere `buy-buttons` renders, not just this product.

3. **Add to Cart is wider.** No new CSS needed — Round 8 had already added `.product-form-buttons .add-to-cart-button { flex: 1 1 auto; width: 100%; }`, intended to let Add to Cart fill the space next to the quantity stepper once Shop Pay was gone. It just never had the chance to take effect while Shop Pay was still rendering. Now that item 2 actually removed it, this existing rule does the job. Left the quantity stepper in place rather than going full-bleed single-button like the reference — you said "wider, not like theirs."

4. **XS moved to the front of the size row.** Reordered the Size option's values on all 4 products via `productOptionsReorder` (XS, S, M, L, XL) — a live catalog change, same category as the earlier variant work. Verified: size selector order is now XS/S/M/L/XL everywhere.

5. **Image layout changed to match your reference (small boxes on the left, less zoomed).** In `templates/product.json`'s media-gallery block: `slideshow_controls_style` changed from `dots` to `thumbnails` (the `thumbnail_position: left` setting was already sitting in the JSON from a much earlier round but silently inert — `dots` was the active pagination mode, so it was never used), and `aspect_ratio` changed from `adapt` (uncropped, fills whatever height the image naturally has) to `1/1.25` (fixed portrait box) so images render at a consistent, smaller, contained size instead of stretching to fill the frame.

**Not visually verified** — same limitation as every round. Items 3 and 5 in particular are exactly the kind of layout change that needs your eyes on the real render before calling them done.

## Round 13 — fixed a real date-math bug in the delivery estimate (was showing dates ~2 months out)

You caught it directly: the box was showing "Thu, Oct 12 – Fri, Oct 13" instead of anything close to 3-4 business days out.

**Root cause:** `snippets/product-delivery-estimate.liquid` had a Liquid filter-chaining bug present since the file's original creation (Round 1), carried forward unchanged through Rounds 10–12 because I treated the date logic as "already correct, just needs a copy/CSS pass" without ever actually checking the arithmetic. The bug: `cursor | plus: i | times: day_seconds` — Liquid filters apply left to right, so this computes `(cursor + i) * 86400`, not `cursor + (i * 86400)`. Since `cursor` is already a large Unix timestamp, multiplying the whole thing by 86400 again blows the result out by orders of magnitude — explains the ~2-month-out dates you saw (the actual overflow is far larger than 2 months, but Liquid's date filter silently produces *some* date out of whatever garbage number it's given rather than erroring, so the visible symptom undersold how broken the underlying math was).

**Fix:** rewrote the whole date computation from scratch, computing each offset as its own seconds value before adding it (`dispatch_offset_seconds = dispatch_offset_days | times: day_seconds`, then `now | plus: dispatch_offset_seconds` — never chaining `plus` directly into `times` again). Also added a fix while in there: if the computed dispatch date lands on a Saturday or Sunday, it now rolls forward to the next Monday before the business-day count starts — the original logic never accounted for "today" itself being a weekend, which would have produced a same-day-dispatch claim on a day the store presumably doesn't ship.

Manually traced the corrected logic by hand against today's real date before pushing (rather than assuming it was right, the mistake that caused this bug to survive three rounds): dispatch correctly rolls to the next business day, then walks forward 3 and 4 business days from there, skipping weekends. Pushed to `snippets/product-delivery-estimate.liquid`, verified live on the dev theme, theme role confirmed still `UNPUBLISHED`.

**Lesson for future rounds:** "preserved verbatim because it looked like real computed logic" is not the same as "verified correct." Should have hand-traced this the first time it was touched in Round 10 instead of trusting that surviving three rounds of copy/paste meant it worked.

**Not visually verified** — same limitation as every round, but this one is worth double-checking the actual displayed date against today's real date before moving on.

## Round 14 — delivery box polish (purple CTA, bolder dates, 24-hour ships line)

Quick styling pass on top of the Round 13 bugfix:

1. **"ORDER NOW" changed from red to purple** (`#7c3aed`) — reads cleaner against the brand's dark/editorial palette than the red, which skewed more generic-ecommerce-alert.
2. **Dates now visually pop.** Split "Estimated delivery:" (label, regular weight) from the date range into its own `.poss-delivery-estimate__date` class — bumped to `1rem`/`700` weight/`--color-foreground-heading`, versus the label at `0.85rem`/`400`/`--color-foreground`. Before, both were the same size and only the `<strong>` tag did the work; now there's real size + color contrast so the actual dates are what the eye lands on.
3. **"Ships within 48 hours" → "Ships within 24 hours."**
4. Confirmed the 3–4 business day window (`min_days`/`max_days`) was already correct from Round 13 — no change needed there, just flagging that it was checked rather than assumed.

Pushed to `snippets/product-delivery-estimate.liquid`, verified live, theme role still `UNPUBLISHED`.

**Not visually verified** — same limitation as every round.

## Round 15 — delivery window now counts from order date, not a separate dispatch date

You asked "should it be 19-20??" — good catch, yes.

The Round 13 fix counted the 3-4 business days starting from a separately-computed *dispatch* date (which itself could roll forward for weekend/cutoff-hour), not from today. That's defensible as a literal "3-4 business days of transit after the package ships" reading, but it doesn't match how the box actually reads to a customer — "Ships within 24 hours" already implies near-immediate dispatch, so a separate dispatch-date detour before the business-day count starts just pushes the shown date later than expected for no visible reason.

Simplified `snippets/product-delivery-estimate.liquid` to count business days directly from today (skipping Sat/Sun), dropping the separate dispatch-date/cutoff-hour/weekend-rollover logic entirely — fewer moving parts, easier to hand-verify, and matches the "19-20" expectation. Hand-traced again before pushing: for a Saturday order, business days land Mon(1)/Tue(2)/Wed(3) → 3-day estimate = Wednesday, Thu(4) → 4-day estimate = Thursday. Verified live, theme role still `UNPUBLISHED`.

**Not visually verified** — check the live dates against today's real date one more time.

## Round 16 — removed shipping/returns accordion + reassurance line, centered delivery box, swapped "You may also like" for a plain divider

Three requests in one round:

1. **Deleted the "FREE SHIPPING · SECURE CHECKOUT" line and the entire accordion** (Shipping / Returns & Exchanges / Fit & Sizing / More Questions) from the product page — removed `purchase_reassurance` and `accordion_jjaG39` from `templates/product.json`'s `group_JtXipy.blocks`, per your explicit "delete all this."

   Flagging one thing since it's a step past pure layout: the Returns & Exchanges row was the only place on the product page spelling out the strict no-returns-for-sizing policy, and Fit & Sizing was the only product-page link to the size guide. `products.md` (this repo's brand knowledge file) calls that guide-link the single highest-leverage fix from the original audit, specifically because the refund policy excludes sizing/fit issues. Both are still live on the site elsewhere (`/pages/size-guide`, `/pages/faq`) — this only removed the product-page shortcuts to them. Not undoing it, just flagging it since it's a content/disclosure change, not a pure style one — say the word if you want it back in a lighter-weight form.

2. **Delivery estimate box: centered and better spaced.** `.poss-delivery-estimate` now uses `align-items: center; justify-content: center` (was `flex-start`, hugging left) and bumped padding from `14px 16px` to `18px 20px`, gap from `12px` to `14px`, icon from `20px` to `22px` — box now reads as a centered, evenly-spaced unit instead of content packed against the left edge.

3. **"You may also like" replaced with a plain divider.** Removed the `header` text block from the `product-recommendations` section and swapped in the theme's built-in `_divider` block (1px, square, full-width, 8px top/bottom padding) — confirmed this block type is already in the section's allowed blocks list before using it, rather than guessing at custom CSS.

All three pushed to `templates/product.json` + `snippets/product-delivery-estimate.liquid`, verified live, theme role still `UNPUBLISHED`.

**Not visually verified** — same limitation as every round.

## Round 17 — removed the decay/glitch visual pass entirely (was making text unreadable)

You called it out directly: "why is the site wording all so blurry... make it nice like worst work you can see everything clear." Correct call — reversing course on this.

Root cause: the "trapped in a rusted-out room" decay/glitch treatment from Rounds 5–7 (`assets/possessionless-white-sections-fix.css`, section 4) was doing three things site-wide, all the time:
- An always-on `body::after` scanline overlay (`repeating-linear-gradient`, 1px lines every 3px) + a rust-tinted vignette, both with `mix-blend-mode: multiply` — this washed a subtle texture over literally every page, all the time, which is almost certainly what read as "blurry" compared to a clean reference page with no overlay at all.
- A `possessionless-glitch` keyframe animation — chromatic-aberration `text-shadow` (red/cyan offset duplicates of the text) + `transform: translate()` + `clip-path` jump-cuts — applied on a loop to headings, nav links, prices, and the announcement bar. Screenshotted mid-cycle, this looks exactly like a blur/ghosting artifact, which is what showed up in your first screenshot on the sticky add-to-cart bar.
- A `possessionless-page-flicker` brightness-pulse animation on `<body>`, and a rare vertical "film scratch" streak.

All of it removed: `body::after`, `body::before`, both keyframe blocks, the flicker animation binding, and the glitch-application media query targeting headings/prices/nav/footer/accordion labels. Rewrote the file's own section comment to match (was "site-wide decay/glitch pass," now "button/hover polish").

**Left alone, since they're not related to blur/readability and weren't called out:** the broken-corner clip-path on buttons, the product-image desaturate/hover-sharpen effect, and the title/price hover underline sweep. Flag if you want those gone too — they're a separate design choice from the glitch pass, not part of what was making text hard to read.

Pushed to `assets/possessionless-white-sections-fix.css`, verified live (grepped the pushed file for any leftover glitch/scanline/blend-mode references — zero), theme role still `UNPUBLISHED`.

**Not visually verified** — same limitation as every round, but this is the one most worth a hard look given it reverses several rounds of prior work.
