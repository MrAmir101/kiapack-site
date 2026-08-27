# Kiapack — website concept / نمونهٔ طراحی سایت کیاپک

A responsive, Persian (RTL) website concept for **Kiapack (کیاپک)** — a saffron and spice
packaging manufacturer in Khorasan Razavi, Iran — covering their existing B2B business and a
proposed direct-to-consumer shop for small-quantity paper packaging.

**This is an unofficial design concept, not the company's live website.**

> نمونهٔ طراحی است، نه سایت رسمی شرکت. قیمت‌ها، تعداد محصولات و بخشی از مشخصات فنی
> **نمونه‌اند و واقعی نیستند** و باید پیش از هر استفادهٔ واقعی با اعداد درست جایگزین شوند.

---

## The idea behind it

Kiapack's factory minimums (3,000–10,000 units) exclude exactly the customers who want their
products most: single cafés, small shops, online sellers, gift shops. The concept adds a retail
line — paper cups, cup carriers, shopping bags, gift boxes — sold online from **50 units**,
which does three things at once:

1. Opens a new revenue line that the current business turns away
2. Builds brand recognition, so people search for *کیاپک* by name instead of buying generic SEO
3. Feeds qualified buyers into the high-margin custom/bulk business — a café buys 200 plain cups,
   comes back for 4,000 printed with their own logo

The **quantity-tier pricing** on the product page is the commercial centrepiece: per-unit price
drops as quantity rises, which is the whole argument for buying from a factory rather than a
reseller. It's interactive — try it.

## Pages

| File | What it is |
|---|---|
| `index.html` | Home — the two audiences (retail shop / custom production) split above the fold |
| `shop.html` | Product listing with RTL filter sidebar, 12 products |
| `product.html` | Product detail with **working** quantity tiers and size selector |
| `saffron.html` | The existing B2B business — product families, capabilities, quote request |
| `custom.html` | Custom branding — what can be printed, the order path, quote request |

## Design decisions

**The brand was split in two, and the site resolves it structurally.** Kiapack's logo is a cool
cyan geometric diamond; their saffron packaging is warm gold, crimson and dense Persian ornament.
Rather than pick one:

- The **interface** (nav, buttons, type, layout) follows the logo — clean, modern, cyan `#35CEDC`
- The **product world** (photography, the saffron page) keeps its gold `#C9A227` and crimson
  `#B4232A`, contained inside image frames and the saffron section

The interface is the neutral gallery; the packaging is what hangs on the wall.

**RTL is native, not flipped.** Layout, navigation, breadcrumbs, form fields and cards are authored
right-to-left. Persian digits (۱۲۳) and Toman throughout. Type is Vazirmatn at 1.9 line-height —
Persian needs more vertical room than Latin.

**Palette**

| | |
|---|---|
| Cyan (UI, CTA) | `#35CEDC` |
| Ink | `#14181D` |
| Paper | `#FAF8F5` |
| Kraft | `#D9C4A9` |
| Saffron gold | `#C9A227` |
| Saffron crimson | `#B4232A` |

## What is real and what is not

**Real** — taken from the company's public Instagram [@kiapackco](https://www.instagram.com/kiapackco/):
the logo, the phone number, the four saffron product photographs (cropped to remove watermarks),
and the product vocabulary (پاکت، جعبه آذین، جعبه صادراتی، استند، جعبه مادر).

**Sample values — replace before any real use:**

- All prices (`۴٬۲۰۰ تومان` per cup, the tier discounts, every listing price)
- Product counts, dimensions, grammage, lead times, minimum quantities
- The retail products themselves — cups, carriers, bags, boxes are **drawn illustrations**,
  because that product line does not exist yet and there is nothing to photograph

**Marked placeholders** left visible in the markup: `[آدرس کارخانه]`, `[لوگوی مشتری]`, and the
trust-badge slots (نماد اعتماد / ساماندهی).

**Not built** (a concept, not a shop): cart, checkout, payment gateway, accounts, CMS, search.
Forms are styled but do not submit anywhere.

## Running it

No build step, no dependencies — plain HTML and CSS with one small JS file.

```bash
python -m http.server 8099
```

Then open <http://localhost:8099>. Opening `index.html` directly from disk works too.

## Structure

```
index.html  shop.html  product.html  saffron.html  custom.html
assets/
  style.css      design system — tokens, layout, components
  app.js         mobile nav + product quantity tiers
  img/           saffron product photography
design/          the original multi-artboard design canvas source (.dc.html)
```

## Verified

- No horizontal overflow at 264px, 375px, 768px, or 1440px
- Product configurator: per-unit price, savings badge, dimensions and total all recompute
- Tap targets ≥44px, visible focus states, skip link, labelled form fields, alt text on images

---

Domain note: `kiapackco.com` was **unregistered** as of August 2026 (NXDOMAIN, absent from the
`.com` registry). If that domain matters to the business, it should be registered in the company's
own name before anything else here goes ahead.
