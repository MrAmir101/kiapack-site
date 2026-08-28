# کیاپک — نمونهٔ طراحی سایت / KiaPack website concept

A responsive, Persian (RTL) website concept for **شرکت چاپ و بسته‌بندی کیا کارتن بسته‌نگار**
([@kiapack.co](https://www.instagram.com/kiapack.co/)) — a printing and packaging factory in the
Shams Abad industrial estate, founded in ۱۳۷۸.

**This is an unofficial design concept, not the company's live website.**

> نمونهٔ طراحی است، نه سایت رسمی شرکت. قیمت‌های فروشگاه **نمونه‌اند** و عکس‌ها
> **موقت** هستند و باید با عکس‌های واقعی کارخانه جایگزین شوند.

**Live:** https://mramir101.github.io/kiapack-site/

---

## Pages

| File | What it is |
|---|---|
| `index.html` | Home — positioning, the eight product families, the fold animation, the ply explorer, machinery, clients, FAQ |
| `products.html` | The eight box families, equipment list, services, ply explorer, buying guide |
| `shop.html` | Low-volume retail line — ready-made stock from ۵۰ عدد, each card adds to the cart |
| `product.html` | Product detail with a **working configurator** — size, finish and quantity drive a live drawing and live pricing |
| `cart.html` | Working cart — line items, quantity stepping, removal, free-shipping meter |
| `about.html` | درباره ما — company record, timeline, registration details, clients |
| `custom.html` | استعلام قیمت — the quote request and how an order runs |
| `login.html` | Phone + four-digit code, two-step |
| `signup.html` | Company or individual account |
| `404.html` | Not-found page |

## What moves, and why

Motion is not decoration here; each piece answers a question a buyer has.
All of it is behind `prefers-reduced-motion`, which yields a static, fully legible page.

- **The fold** (home) — a flat sheet interpolates into a closed box as you scroll past.
  Three faces, four points each, eased from net to isometric. It answers "what do you
  actually make" faster than a paragraph.
- **The ply explorer** (home, products) — drag to wipe between a three-ply and a five-ply
  cross-section. This is the single most common question a carton buyer has, made
  answerable in one gesture. Keyboard accessible via arrow keys.
- **The configurator** (product) — size, finish and quantity drive a live isometric
  drawing and live pricing; drag the stage to turn the box.
- Supporting motion: gold scroll-progress seam, staggered reveals, counters,
  hero parallax, a conveyor of the product families, button sheen, card lift.

## Quality checks that run against the built pages

- Every page: exactly one `h1`, no skipped heading levels
- Every image carries `alt`; every icon-only control carries `aria-label`
- No horizontal overflow at 320 / 375 / 768 / 1440
- Tap targets ≥ 44px outside dense secondary rows
- Focus rings on every interactive element
- `prefers-reduced-motion` disables all animation
- Cart maths verified: 250 × ۱۹٬۹۰۰ = ۴٬۹۷۵٬۰۰۰, free-shipping threshold flips correctly
- Print stylesheet strips chrome and inverts the dark bands

## Design decisions

**The art direction comes from the company's own printed profile**, not from anything invented:

| | | |
|---|---|---|
| Navy | `#0A1730` | the brochure ground; hero, bands, footer |
| Gold | `#C9A24B` | the single accent — rules, icons, primary buttons |
| Gold lift | `#E3C783` | headline highlight |
| White / cool grey | `#FFFFFF` / `#F5F6F8` | content surfaces |

Three details carry that identity through the site: the **gold diagonal ribbon** across the
hero (straight off their cover), **gold hairline rules and thin line icons**, and the
**bordered fact boxes** that their profile uses for company details. Nothing has a rounded
corner — the profile is all straight rules and hard edges.

**RTL is native, not flipped.** Layout, navigation, breadcrumbs, form fields and cards are
authored right-to-left. Persian digits (۱۲۳) and Toman throughout. Vazirmatn at ~1.95
line-height, because Persian needs more vertical room than Latin.

**The configurator is the differentiator.** Five competitor sites were reviewed
(`docs/reference-audit.md`); all five are catalogues where you read a price and phone someone.
Here the visitor picks a size, a finish and a quantity, and the unit price, the saving, the
total and the drawing of the box all update live.

## What is real and what is not

**Real** — from the company's own profile, recorded in `docs/company-facts.md`: the registered
name, tagline, founding year, managing director, registration and national ID numbers, phone,
address, the eight product families, the machinery list, the services list, and the client names.

**Sample values — replace before any real use:**

- Every price in `shop.html` and `product.html`, and the tier discounts
- Dimensions, capacities and lead times
- **All photography.** The photos are stock (Pexels, free licence) standing in for the real
  thing. They are placeholders, not the company's products.

## What is still needed from the company

The design system is finished; these are content gaps only:

1. **The logo file** — ideally vector. The header currently sets the "KiaPack" wordmark in
   type. Their real mark is a slanted gold logotype and should replace it.
2. **Real photography** — the factory, the production line, and finished boxes per family.
   This is the single biggest gap: `tarheaval.com`, the reference the client rated highest,
   is strong mainly because every product is a real photograph.
3. **Klarioba's logo** — the other four client logos are in place; no file was found for
   گروه صنعتی کلاریوبا, so it renders as a text plate.
4. **Real prices** for the retail line, if that line goes ahead.
5. **A backend.** The cart lives in `localStorage` and the forms do not submit anywhere.
   Login and signup are the real flow (phone, then a four-digit code) but no code is sent.

## Running it

No dependencies. Pages are generated from `build.mjs`:

```bash
node build.mjs && python -m http.server 8099
```

Then open <http://localhost:8099>. Edit `build.mjs` and re-run to regenerate all six pages —
the shared header and footer live there, so they never drift apart.

## Structure

```
build.mjs           page builder — shared chrome, meta, sitemap, robots
pages-extra.mjs     the creative sections and the auth/cart page bodies
*.html              10 generated pages — never edit these by hand
assets/
  style.css         the design system
  motion.css        the motion layer, all of it reduced-motion aware
  app.js            nav, reveals, counters, parallax, fold, ply, cart, auth, configurator
  favicon.svg
  img/              stock photography (placeholder)
  img/clients/      real client logos
docs/
  company-facts.md   verified facts from the company profile
  reference-audit.md what the five competitor sites do
sitemap.xml  robots.txt  404.html
```

Pages are generated. Edit `build.mjs` or `pages-extra.mjs` and re-run `node build.mjs`.

---

Domain note: **kiapackco.com** — the address in their own Instagram bio — did not resolve when
checked in August 2026 (NXDOMAIN, absent from the `.com` registry). Their bio links to a dead
site. Worth registering in the company's own name before anything else here goes ahead.
