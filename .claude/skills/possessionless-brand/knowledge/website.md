# Website Rules — Possessionless

## Stack
- Platform: Shopify (Liquid theme, Horizon-based block architecture)
- See `docs/shopify-dev.md` for tooling/workflow, `docs/website-playbook.md` for the conversion checklist, `docs/cro-audit-aug-2026.md` for the Aug 2026 CRO audit/implementation record.

## Current aesthetic direction (updated Aug 2026 — supersedes "all-black" as of the `Step 1 - Bar` dev theme)

The brand direction shifted mid-project, confirmed by the user: **white page background with a dark charcoal (`#0a0a0a`) header and footer**, not all-black. Goth/alternative identity is carried by accents, not the base palette:

- Body/section background: white (`scheme-8`/`scheme-1`/`scheme-7` in the current theme — background `#ffffff`, foreground `#0d0d0d`–`#2a2a2a`)
- Header + footer: dark charcoal `#0a0a0a`, light text `#e0e0e0`/`#ffffff`
- Glitch/decay accents carried in `assets/possessionless-white-sections-fix.css`: a subtle always-on scanline + vignette overlay, a periodic brightness flicker, a chromatic-aberration text glitch on headings/product titles/logo, a broken-corner hero CTA shape, a hand-drawn "sigil" scratch-line divider between sections, and an editorial desaturate→sharpen hover effect on product card images.
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
