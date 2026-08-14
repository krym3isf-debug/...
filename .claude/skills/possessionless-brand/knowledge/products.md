# Products — Possessionless

Live product data should still be pulled live from the connected Shopify MCP tools (`search_products`, `get-product`) as the source of truth for price/inventory/status. This file captures things Shopify data doesn't: fit notes, sizing philosophy, material story — filled in from the Aug 2026 site audit.

## Current catalog (4 SKUs, all under the "Nocturne" line, Aug 2026)

| Product | Fabric | Fit | Graphics |
|---|---|---|---|
| 'Nocturne' Sigil Sweatpants | Cotton fleece, 400 GSM | Baggy, elastic waistband, open bottom | Front sigil designs, back pocket logo, screen printed |
| 'Nocturne' Baggy Denim Jeans | Cotton denim, 12 oz | Baggy, everyday wear, heavy feel | Back pocket logo, screen printed |
| 'Nocturne' Sigil Sweatshirt | 100% cotton, 240 GSM | Drop shoulder, baggy | 'Nothing Owns You' sleeve design, sigil back design |
| 'Nocturne' Fur Zip-Up Hoodie | Cotton fleece, 420 GSM | Drop shoulder, baggy, faux fur hood | Crow-in-graveyard back design + 'Nothing Owns You' tagline, front logo |

All sizes run S/M/L only (single "Size" option, no color variants — each product is effectively one colorway).

## Fit / sizing notes

- A real, well-built Size Guide exists at `/pages/size-guide` with per-category charts (tops, hoodies, jeans, sweatpants) and a "how to measure" section (chest/shoulder/length/waist/hip/inseam). As of the Aug 2026 audit it was not linked anywhere in navigation or on product pages — that's the single highest-leverage fix identified, since the refund policy explicitly excludes returns for wrong sizing.
- Refund policy is strict: no returns/exchanges for sizing, fit, or change of mind — only defective or wrong item, reported within 48 hours of delivery. Any copy encouraging a purchase should point to the size guide rather than implying flexible returns.

## Materials / production notes worth repeating in copy

- Screen printed graphics (not embroidered/heat-pressed) — accurate detail to use in copy.
- Faux fur hood on the Fur Zip-Up Hoodie is a distinguishing feature worth calling out.
- Real asset library includes confirmed front/back garment photography for all 4 products plus a few unlabeled close-up/detail shots (filenames don't specify content — treat as "product detail" generically rather than guessing what they show). No confirmed on-model photography exists in the file library as of Aug 2026 — several `ChatGPT_Image_*.png` files exist but are unidentified (likely AI-generated); do not use these for customer-facing imagery without the user confirming what they depict.
