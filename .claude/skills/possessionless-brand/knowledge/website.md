# Website Rules — Possessionless

## Stack
- Platform: Shopify (Liquid theme, Horizon-based block architecture)
- See `docs/shopify-dev.md` for tooling/workflow, `docs/website-playbook.md` for the conversion checklist, `docs/cro-audit-aug-2026.md` for the Aug 2026 CRO audit/implementation record.

## Current aesthetic direction (updated Aug 2026 — supersedes "all-black" as of the `Step 1 - Bar` dev theme)

The brand direction shifted mid-project, confirmed by the user: **white page background with a dark charcoal (`#0a0a0a`) header and footer**, not all-black. Goth/alternative identity is carried by accents, not the base palette:

- Body/section background: white (`scheme-8`/`scheme-1`/`scheme-7` in the current theme — background `#ffffff`, foreground `#0d0d0d`–`#2a2a2a`)
- Header + footer: dark charcoal `#0a0a0a`, light text `#e0e0e0`/`#ffffff`
- Glitch/decay accents carried in `assets/possessionless-white-sections-fix.css`, reorganized into a numbered file structure (1. white-section fixes, 2. topbar, 3. footer, 4. decay/glitch pass) and expanded Aug 2026 into a full-site "industrial horror" treatment — user's direction: *"Saw" movie vibe matching the logos*, referencing the withered-hills.com aesthetic, explicitly "no literal gore/jump-scare imagery" (kept to the brand's existing editorial/goth lane — Nocturne sigil line, "Nothing Owns You" — just dirtier and more damaged):
  - Always-on scanline + vignette overlay, vignette now carries a faint rust-red tint at the extreme edges (reads as oxidation, not flat black)
  - Rare "film damage" vertical scratch flicker across the viewport (very subtle, ~17s cycle)
  - Periodic page-wide brightness flicker
  - Chromatic-aberration text glitch, now covering the full text hierarchy (not just h1–h3): headings, nav links, prices, footer headings, accordion labels — each with its own duration/delay so it reads as scattered signal decay, not one synchronized blink. Glitch keyframes end with an eased settle (not a hard snap) for a smoother feel.
  - Broken-corner clip-path applied to the hero CTA and now all theme buttons site-wide, with eased (`cubic-bezier`) hover transitions instead of instant snaps
  - One deliberate "warning stripe" accent — a thin amber/black diagonal hairline above the New Release grid divider — kept to a single line rather than a full hazard-tape band so it reads as a detail, not a costume
  - Hand-drawn "sigil" scratch-line dividers between sections (unchanged)
  - Editorial desaturate→sharpen hover effect on product card images, now with smoother easing/duration
  - **Not visually verified** — this session has no browser/DOM access, so this pass is reasoned from source (Liquid markup + CSS cascade), not confirmed against a render. Needs the user's visual sign-off.
- Dark color schemes (scheme-2 through scheme-6, all `#000000`/`#0a0a0a` background) still exist in the theme and are available for any section that should read as a dark block against the white body — just not the default anymore.

When adding new sections/content: match this system (white body scheme, CSS custom properties like `var(--color-foreground)` rather than hardcoded colors so content adapts correctly to whichever scheme a section uses) rather than assuming solid black backgrounds.

## Aesthetic guardrails
- Maintain the Possessionless aesthetic (see `brand.md`) — do not add generic ecommerce UI patterns (badges, urgency banners, popups, etc.) just because they're common. Every UI addition should be evaluated against the brand's visual restraint, not bolted on because "conversion best practice" says so generically.
- When conversion recommendations conflict with brand aesthetic, surface the tradeoff to the user instead of silently picking one.
- Multiple theme drafts can exist at once in Shopify admin (dev/test themes) — always confirm which one is the current working base before making changes; don't assume the most recently touched one without checking, and don't assume "the live theme" is still the right base if the user has been iterating on a separate draft.

## Do
- [TBD — specific structural rules, e.g. header behavior, nav structure]

## Don't
- [TBD]
