/* Builds the static pages from one set of shared chrome + per-page bodies.
   Run:  node build.mjs                                                     */
import fs from 'fs';
import { FOLD_SECTION, PLY_SECTION, CONVEYOR, TIMELINE, LOGIN_BODY, SIGNUP_BODY, CART_BODY } from './pages-extra.mjs';

const PHONE = '۰۲۱-۵۶۹۰۱۳۱۷';
const TEL = 'tel:+982156901317';
const IG = 'https://www.instagram.com/kiapack.co/';
const ADDR = 'شهرک صنعتی شمس‌آباد، بلوار استقلال، خیابان میخک ۸، پلاک ۴';

const ICON = {
  cart: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M6 7h14l-1.4 8.5a2 2 0 0 1-2 1.7H9.3a2 2 0 0 1-2-1.6L5.4 4.6A1 1 0 0 0 4.4 4H3"/><circle cx="9.5" cy="20" r="1.2" fill="currentColor" stroke="none"/><circle cx="17.5" cy="20" r="1.2" fill="currentColor" stroke="none"/></svg>`,
  burger: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17"/></svg>`,
  arrow: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 6l-6 6 6 6"/></svg>`,
  phone: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z"/></svg>`,
  pin: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" stroke-width="1.8" aria-hidden="true"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>`,
  ig: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" stroke-width="1.8" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r="1.1" fill="#C9A24B" stroke="none"/></svg>`,
  globe: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 2.5 15 0 18M12 3c-2.5 2.6-2.5 15 0 18"/></svg>`,
};

// gold thin-line icons for the eight box families, in their profile's style
const CATICON = {
  auto: `<svg width="34" height="34" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20v-4l2.5-6.5A2 2 0 0 1 8.4 8h15.2a2 2 0 0 1 1.9 1.5L28 16v4"/><path d="M4 20h24v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1H8v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"/><path d="M5.5 16h21"/><circle cx="9" cy="18" r="1"/><circle cx="23" cy="18" r="1"/></svg>`,
  industrial: `<svg width="34" height="34" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 27V14l7 4.5V14l7 4.5V9h3l1 18Z"/><path d="M4 27h24"/><path d="M22 9V5h3v4"/></svg>`,
  food: `<svg width="34" height="34" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11 16 5l12 6-12 6Z"/><path d="M4 11v10l12 6 12-6V11"/><path d="M16 17v10"/><path d="M16 2.5v4M13.5 4.5 16 6.5l2.5-2"/></svg>`,
  pharma: `<svg width="34" height="34" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="7" width="20" height="19" rx="2"/><path d="M10 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/><path d="M16 12v9M11.5 16.5h9"/></svg>`,
  light: `<svg width="34" height="34" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 4a8 8 0 0 1 4.7 14.5c-.8.6-1.2 1.5-1.2 2.2h-7c0-.7-.4-1.6-1.2-2.2A8 8 0 0 1 16 4Z"/><path d="M12.5 25h7M14 28h4"/></svg>`,
  tap: `<svg width="34" height="34" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 20v-3a4 4 0 0 1 4-4h8V9"/><path d="M14 9h8"/><rect x="16" y="4" width="6" height="5" rx="1"/><path d="M3 20h6v3H3Z"/><path d="M24 13v4a4 4 0 0 1-4 4"/><path d="M20 25v3"/></svg>`,
  hvac: `<svg width="34" height="34" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="16" cy="16" r="3"/><path d="M16 13c0-4 1-8-2-9s-4 4-2 6 4 3 4 3Z"/><path d="M19 16c4 0 8 1 9-2s-4-4-6-2-3 4-3 4Z"/><path d="M16 19c0 4-1 8 2 9s4-4 2-6-4-3-4-3Z"/><path d="M13 16c-4 0-8-1-9 2s4 4 6 2 3-4 3-4Z"/></svg>`,
  home: `<svg width="34" height="34" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 14 16 5l12 9"/><path d="M7 12.5V26h18V12.5"/><path d="M13 26v-7h6v7"/></svg>`,
};

const BASE = 'https://mramir101.github.io/kiapack-site';

const head = (title, desc, extra = '', slug = 'index.html') => `<!doctype html>
<html lang="fa" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap">
<link rel="stylesheet" href="assets/style.css?v=6">
<link rel="stylesheet" href="assets/motion.css?v=6">
<meta name="theme-color" content="#0A1730">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="assets/favicon.svg">
<link rel="canonical" href="${BASE}/${slug}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="کیاپک — کیا کارتن بسته‌نگار">
<meta property="og:locale" content="fa_IR">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${BASE}/${slug}">
<meta property="og:image" content="${BASE}/assets/img/hero-boxes.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${BASE}/assets/img/hero-boxes.jpg">${extra}
</head>
<body>
<a class="skip-link" href="#main">پرش به محتوای اصلی</a>
<div class="progress" aria-hidden="true"></div>

<div class="topbar">
  <div class="wrap">
    <span class="tagline">کیفیتی که دیده می‌شود، بسته‌بندی که ماندگار می‌ماند</span>
    <a href="${TEL}">${PHONE}</a>
  </div>
</div>
`;

const NAV = [
  ['index.html', 'خانه', 'home'],
  ['products.html', 'محصولات', 'products'],
  ['shop.html', 'فروشگاه', 'shop'],
  ['about.html', 'درباره ما', 'about'],
  ['custom.html', 'استعلام قیمت', 'custom'],
  ['login.html', 'ورود', 'login'],
];

const header = (active) => `
<header class="site-header">
  <div class="wrap">
    <a class="brand" href="index.html" aria-label="کیاپک — صفحه اصلی">
      <span class="mark">Kia<span>Pack</span></span>
      <span class="fa"><b>کیا کارتن بسته‌نگار</b><i>چاپ و بسته‌بندی · از ۱۳۷۸</i></span>
    </a>
    <nav class="nav" aria-label="ناوبری اصلی">
      ${NAV.map(([h, t, k]) => `<a href="${h}"${k === active ? ' class="on"' : ''}>${t}</a>`).join('\n      ')}
    </nav>
    <div class="tools">
      <a class="icon-btn" href="cart.html" aria-label="سبد خرید">${ICON.cart}<span class="cart-n">۰</span></a>
      <button class="icon-btn burger" type="button" data-burger aria-expanded="false" aria-label="منو">${ICON.burger}</button>
    </div>
  </div>
  <nav class="mnav" data-mnav aria-label="ناوبری موبایل">
    ${NAV.map(([h, t]) => `<a href="${h}">${t}</a>`).join('\n    ')}
  </nav>
</header>
`;

const footer = (active) => `
<footer class="site-footer">
  <div class="wrap">
    <div class="cols">
      <div class="c1">
        <span class="brand"><span class="mark">Kia<span>Pack</span></span></span>
        <p class="about"><b>شرکت چاپ و بسته‌بندی کیا کارتن بسته‌نگار</b><br>
        بیش از دو دهه تجربه در چاپ و تولید انواع بسته‌بندی، با ماشین‌آلات تمام‌اتومات و نیروی متخصص.</p>
        <div class="reg">
          <span>شماره ثبت: ۴۶۷۴۱۵</span>
          <span>شناسه ملی: ۱۴۰۰۴۷۰۰۲۹۵</span>
        </div>
      </div>
      <div>
        <h2>محصولات</h2>
        <ul>
          <li><a href="products.html#auto">جعبه خودرویی</a></li>
          <li><a href="products.html#industrial">جعبه صنعتی</a></li>
          <li><a href="products.html#food">جعبه غذایی و صادراتی</a></li>
          <li><a href="products.html#pharma">جعبه دارویی و بهداشتی</a></li>
        </ul>
      </div>
      <div>
        <h2>خدمات</h2>
        <ul>
          <li><a href="products.html#services">ساخت و طراحی قالب</a></li>
          <li><a href="products.html#services">ساخت ماکت</a></li>
          <li><a href="custom.html">طراحی از صفر</a></li>
          <li><a href="shop.html">فروشگاه تیراژ کم</a></li>
        </ul>
      </div>
      <div>
        <h2>تماس با ما</h2>
        <ul>
          <li class="row">${ICON.phone}<a href="${TEL}">${PHONE}</a></li>
          <li class="row">${ICON.globe}<a href="https://kiapackco.com">Kiapackco.com</a></li>
          <li class="row">${ICON.ig}<a href="${IG}" dir="ltr">Kiapack.co</a></li>
          <li class="row">${ICON.pin}<span>${ADDR}</span></li>
        </ul>
      </div>
    </div>
    <div class="legal">
      <span>کیا کارتن بسته‌نگار © ۱۴۰۵ — تمام حقوق محفوظ است.</span>
      <span class="disclaimer">نمونه‌ی طراحی سایت — قیمت‌ها نمونه‌اند و عکس‌ها موقت.</span>
    </div>
  </div>
</footer>

<div class="fab">
  <a class="wa" href="https://wa.me/982156901317" aria-label="واتساپ">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm5.5 14.1c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.6-1.1-4.3-3.8-4.5-4-.1-.2-1-1.4-1-2.6s.6-1.8.9-2c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.3 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.1.3.6 1.1 1.4 1.8 1 .9 1.8 1.1 2 1.2.3.1.4.1.6-.1l.8-1c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.2.4.3.1.1.1.6-.1 1.2Z"/></svg>
  </a>
  <a class="tel" href="${TEL}" aria-label="تماس تلفنی">
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z"/></svg>
  </a>
</div>

<nav class="tabbar" aria-label="ناوبری پایین">
  <a href="index.html"${active === 'home' ? ' class="on"' : ''}>
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/></svg>خانه</a>
  <a href="products.html"${active === 'products' ? ' class="on"' : ''}>
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="3.5" width="7" height="7"/><rect x="13.5" y="3.5" width="7" height="7"/><rect x="3.5" y="13.5" width="7" height="7"/><rect x="13.5" y="13.5" width="7" height="7"/></svg>محصولات</a>
  <a href="cart.html"${active === 'cart' ? ' class="on"' : ''}>
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 7h14l-1.4 8.5a2 2 0 0 1-2 1.7H9.3a2 2 0 0 1-2-1.6L5.4 4.6A1 1 0 0 0 4.4 4H3"/><circle cx="9.5" cy="20" r="1.2" fill="currentColor" stroke="none"/><circle cx="17.5" cy="20" r="1.2" fill="currentColor" stroke="none"/></svg>فروشگاه</a>
  <a href="custom.html"${active === 'custom' ? ' class="on"' : ''}>
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20V7.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2V20"/><path d="M4 20h16M9 11h6M9 15h4"/></svg>استعلام</a>
</nav>

<script src="assets/app.js?v=6" defer></script>
</body>
</html>
`;

/* ---------- shared blocks ------------------------------------------------ */

const CATS = [
  ['auto', CATICON.auto, 'جعبه خودرویی', 'قطعات یدکی و مجموعه‌های خط تولید'],
  ['industrial', CATICON.industrial, 'جعبه صنعتی', 'قطعات سنگین، ورق سه‌لایه و پنج‌لایه'],
  ['food', CATICON.food, 'غذایی، سردخانه‌ای و صادراتی', 'مقاوم به رطوبت و چیدمان بالا'],
  ['pharma', CATICON.pharma, 'دارویی و بهداشتی', 'چاپ دقیق و رعایت الزامات بهداشتی'],
  ['light', CATICON.light, 'روشنایی', 'با جداکننده و ضربه‌گیر داخلی'],
  ['tap', CATICON.tap, 'شیرآلات', 'محافظت از سطوح آبکاری‌شده'],
  ['hvac', CATICON.hvac, 'تهویه، سرمایش و گرمایش', 'ابعاد بزرگ با مقاومت فشاری بالا'],
  ['home', CATICON.home, 'لوازم خانه و آشپزخانه', 'چاپ تبلیغاتی و ویترینی'],
];

const catCards = (rev = true) => CATS.map(([id, ico, t, d], i) => `
        <a class="cat${rev ? ` rev rev-up d${i % 4}` : ''}" href="products.html#${id}">
          <span class="ico">${ico}</span>
          <b>${t}</b>
          <span>${d}</span>
        </a>`).join('');

const CLIENTS = [
  ['crouse.png', 'گروه صنعتی کروز'],
  ['golrang.png', 'گروه گلرنگ'],
  ['ezam.png', 'گروه صنعتی عظام'],
  ['laziz.png', 'صنایع غذایی آماده لذیذ'],
  [null, 'گروه صنعتی کلاریوبا']
];
const clientCards = () => CLIENTS.map(function (c, i) {
  const f = c[0], name = c[1], d = ' rev rev-up d' + (i % 4);
  return f
    ? `<div class="client${d}"><img src="assets/img/clients/${f}" alt="${name}" loading="lazy" width="440" height="200"></div>`
    : `<div class="client client-text${d}">${name}</div>`;
}).join('');

/* ---------- pages --------------------------------------------------------- */

const pages = {};

pages['index.html'] = {
  title: 'کیاپک — شرکت چاپ و بسته‌بندی کیا کارتن بسته‌نگار',
  desc: 'تولید انواع جعبه خودرویی، صنعتی، غذایی و صادراتی، دارویی، روشنایی، شیرآلات و لوازم خانگی. کارخانه چاپ و بسته‌بندی در شهرک صنعتی شمس‌آباد، از سال ۱۳۷۸.',
  active: 'home',
  body: `
<main id="main">

  <section class="hero ribbon">
    <div class="wrap">
      <div class="copy">
        <div class="eyebrow light">از سال ۱۳۷۸ · شهرک صنعتی شمس‌آباد</div>
        <h1>کیفیتی که دیده می‌شود،<br><span class="gold">بسته‌بندی که ماندگار می‌ماند</span></h1>
        <p class="lede">
          کارخانه چاپ و بسته‌بندی کیاپک، با بیش از دو دهه تجربه در چاپ و تولید انواع بسته‌بندی،
          با بهره‌گیری از ماشین‌آلات تمام‌اتومات و نیروی انسانی متخصص.
        </p>
        <div class="cta">
          <a class="btn btn-gold" href="custom.html">استعلام قیمت ${ICON.arrow}</a>
          <a class="btn btn-ghost" href="products.html">محصولات ما</a>
        </div>
        <div class="since">
          <div><b><span class="count" data-count="25" data-prefix="+">۰</span> سال</b><span>سابقه تولید</span></div>
          <div><b><span class="count" data-count="8">۰</span> خانواده</b><span>محصول صنعتی</span></div>
          <div><b>تمام‌اتومات</b><span>ماشین‌آلات ژاپنی</span></div>
        </div>
      </div>
      <figure class="hero-photo shot">
        <img src="assets/img/hero-boxes.jpg" alt="کارتن‌های مقوایی چیده‌شده در انبار کارخانه" width="1100" height="1300" data-parallax="18">
        <span class="plate"><b>۱۳۷۸</b>سال تأسیس</span>
      </figure>
    </div>
  </section>

  ${CONVEYOR}

  <section class="wrap section">
    <div class="head head-row rev rev-up">
      <div>
        <div class="eyebrow">محصولات ما</div>
        <h2>انواع جعبه، برای هر صنعت</h2>
      </div>
      <a href="products.html">همه محصولات ${ICON.arrow}</a>
    </div>
    <div class="cats">${catCards()}</div>
  </section>

  ${FOLD_SECTION}

  ${PLY_SECTION}

  <section class="navy on-navy">
    <div class="wrap section">
      <div class="split">
        <div class="c">
          <div class="eyebrow">ماشین‌آلات و تجهیزات</div>
          <h2 style="font-size:29px;color:#fff">خط تولید تمام‌اتومات</h2>
          <p style="color:#A9B6CD;margin-top:14px;line-height:2.1">
            تیراژ بالا وقتی اقتصادی است که خط تولید بایستد و کیفیت ثابت بماند. ماشین‌آلات ژاپنی
            تمام‌اتومات، همان چیزی است که تفاوت یک سفارش ۵٬۰۰۰ تایی را با ۵۰٬۰۰۰ تایی از بین می‌برد.
          </p>
          <ul class="gold-list" style="margin-top:22px">
            <li>ماشین‌آلات تمام اتومات ژاپنی</li>
            <li>لمینت تمام اتومات</li>
            <li>دایکات تمام اتومات</li>
            <li>جعبه چسبانی تمام اتومات</li>
            <li>سلفون، چاپ ۳ رنگ و منگنه</li>
          </ul>
        </div>
        <div class="g">
          <figure class="shot" style="margin:26px 0 0">
            <img src="assets/img/machinery.jpg" alt="خط تولید و ماشین‌آلات چاپ و بسته‌بندی" loading="lazy" width="1100" height="733">
            <figcaption>خط تولید کیاپک</figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>

  <section class="wrap section">
    <div class="head rev rev-up">
      <div class="eyebrow">خدمات</div>
      <h2>از قالب تا تحویل</h2>
      <p>کاری که بیشتر کارخانه‌ها به بیرون واگذار می‌کنند، اینجا زیر یک سقف انجام می‌شود.</p>
    </div>
    <div class="steps">
      <div class="step rev rev-up">
        <div class="t"><span class="n">۱</span><span class="ln"></span></div>
        <b>ساخت و طراحی قالب</b>
        <p>قالب اختصاصی برای ابعاد و شکل دقیق محصول شما.</p>
      </div>
      <div class="step rev rev-up d1">
        <div class="t"><span class="n">۲</span><span class="ln"></span></div>
        <b>ساخت و طراحی ماکت</b>
        <p>ماکت با همان متریالی که مد نظر شماست، پیش از تیراژ.</p>
      </div>
      <div class="step rev rev-up d2">
        <div class="t"><span class="n">۳</span><span class="ln"></span></div>
        <b>طراحی از صفر</b>
        <p>اگر طرح ندارید، گرافیک جعبه مطابق سلیقه شما آماده می‌شود.</p>
      </div>
      <div class="step rev rev-up d3">
        <div class="t"><span class="n">۴</span></div>
        <b>ارسال به سراسر کشور</b>
        <p>تحویل در محل، همراه با فاکتور رسمی.</p>
      </div>
    </div>
  </section>

  <section class="band-photo">
    <img src="assets/img/corrugated.jpg" alt="مقطع ورق کارتن کنگره‌ای" loading="lazy" width="1400" height="620">
    <div class="over">
      <div class="wrap">
        <div style="max-width:560px">
          <div class="eyebrow light">سه‌لایه یا پنج‌لایه</div>
          <h2 style="color:#fff;font-size:26px;line-height:1.45">ورق درست، نصف کیفیت جعبه است</h2>
          <p style="color:#C1CCDF;margin-top:12px;line-height:2">
            وزن محتویات، ارتفاع چیدمان در انبار و طول مسیر حمل — این سه، لایه‌بندی درست را تعیین می‌کنند.
            مشاوره‌ی تخصصی این انتخاب، بخشی از خدمات ماست.
          </p>
          <a class="btn btn-gold" href="custom.html" style="margin-top:20px">مشاوره بگیرید ${ICON.arrow}</a>
        </div>
      </div>
    </div>
  </section>

  <section class="navy-deep navy on-navy">
    <div class="wrap section">
      <div class="head rev rev-up">
        <div class="eyebrow">مشتریان ما</div>
        <h2 style="color:#fff">برندهایی که با ما کار می‌کنند</h2>
      </div>
      <div class="clients">
        ${clientCards()}
      </div>
    </div>
  </section>

  <section class="wrap section">
    <div class="head head-row rev rev-up">
      <div>
        <div class="eyebrow">تازه در کیاپک</div>
        <h2>فروشگاه تیراژ کم</h2>
        <p>حداقل سفارش کارخانه‌ای برای کسب‌وکارهای کوچک زیاد است. این خط جدید، همان کیفیت را از ۵۰ عدد می‌فروشد.</p>
      </div>
      <a href="shop.html">ورود به فروشگاه ${ICON.arrow}</a>
    </div>
    <div class="strip">
      <figure class="shot"><img src="assets/img/boxes-labelled.jpg" alt="جعبه‌های مقوایی آماده ارسال" loading="lazy" width="900" height="1350"></figure>
      <figure class="shot"><img src="assets/img/box-detail.jpg" alt="جزئیات جعبه مقوایی" loading="lazy" width="900" height="1016"></figure>
      <figure class="shot"><img src="assets/img/giftbox.jpg" alt="گیفت باکس" loading="lazy" width="900" height="600"></figure>
      <figure class="shot"><img src="assets/img/export-port.jpg" alt="بارگیری صادراتی" loading="lazy" width="900" height="600"></figure>
    </div>
  </section>

  <section style="background:var(--paper-2)">
    <div class="wrap section">
      <div class="head rev rev-up">
        <div class="eyebrow">سوال‌های پرتکرار</div>
        <h2>قبل از سفارش بدانید</h2>
      </div>
      <div class="faq">
        <details open>
          <summary>حداقل تیراژ سفارش چقدر است؟</summary>
          <p>برای تولید اختصاصی با قالب و چاپ برند شما، از ۱٬۰۰۰ عدد به بالا. هزینه‌ی قالب و راه‌اندازی چاپ ثابت است و بین کل تیراژ تقسیم می‌شود، بنابراین در تیراژ پایین سهم هر عدد بالا می‌رود. برای تیراژ کمتر، فروشگاه طرح‌های آماده از ۵۰ عدد در دسترس است.</p>
        </details>
        <details>
          <summary>ورق سه‌لایه بگیرم یا پنج‌لایه؟</summary>
          <p>سه‌لایه برای محصولات سبک تا متوسط و حمل داخل شهری کافی است. پنج‌لایه وقتی لازم می‌شود که وزن محتویات بالا باشد، جعبه‌ها در انبار روی هم چیده شوند، یا مسیر حمل طولانی و پرجابه‌جایی باشد. وزن واقعی محصول و ارتفاع چیدمان را به ما بگویید تا دقیق راهنمایی کنیم.</p>
        </details>
        <details>
          <summary>طرح آماده ندارم. شما طراحی می‌کنید؟</summary>
          <p>بله. طراحی از صفر مطابق سلیقه شما یکی از خدمات ماست. اگر فقط لوگو دارید، گرافیک کامل جعبه آماده و پیش از چاپ برای تأیید ارسال می‌شود.</p>
        </details>
        <details>
          <summary>قبل از تیراژ می‌توانم نمونه ببینم؟</summary>
          <p>بله، و توصیه می‌کنیم حتماً این کار را بکنید. ماکت با همان متریال مورد نظرتان ساخته می‌شود تا ابعاد، مقاومت و کیفیت چاپ را از نزدیک ببینید. محصول واقعی خود را داخلش بگذارید — مشکل احتمالی همان‌جا معلوم می‌شود، نه بعد از تولید انبوه.</p>
        </details>
        <details>
          <summary>ارسال چگونه است؟</summary>
          <p>ارسال به سراسر کشور انجام می‌شود. برای تیراژ بالا با باربری و برای سفارش‌های کوچک‌تر با پست و تیپاکس.</p>
        </details>
        <details>
          <summary>فاکتور رسمی صادر می‌کنید؟</summary>
          <p>بله. شرکت با شماره ثبت ۴۶۷۴۱۵ و شناسه ملی ۱۴۰۰۴۷۰۰۲۹۵ ثبت شده و برای خریدهای سازمانی فاکتور رسمی صادر می‌شود.</p>
        </details>
      </div>
    </div>
  </section>

</main>
`
};

pages['products.html'] = {
  title: 'محصولات — انواع جعبه صنعتی، خودرویی، غذایی و دارویی | کیاپک',
  desc: 'انواع جعبه خودرویی، صنعتی، غذایی سردخانه‌ای و صادراتی، دارویی و بهداشتی، روشنایی، شیرآلات، تهویه و لوازم خانگی — تولید کیا کارتن بسته‌نگار.',
  active: 'products',
  body: `
<main id="main">
  <div class="wrap">
    <nav class="crumb" aria-label="مسیر"><a href="index.html">خانه</a> / <b>محصولات</b></nav>
    <div class="phead">
      <h1>انواع جعبه و بسته‌بندی</h1>
      <p>هشت خانواده‌ی محصول، همه با قالب و چاپ اختصاصی و ورق متناسب با کاربرد.</p>
    </div>
  </div>

  <div class="wrap" style="padding-bottom:44px">
    <div class="cats">${catCards()}</div>
  </div>

  <section class="navy on-navy" id="services">
    <div class="wrap section">
      <div class="split">
        <div class="c">
          <div class="eyebrow">خدمات</div>
          <h2 style="color:#fff;font-size:29px">آنچه کنار تولید انجام می‌دهیم</h2>
          <ul class="gold-list" style="margin-top:22px">
            <li>ساخت و طراحی قالب</li>
            <li>ساخت و طراحی ماکت با متریال مد نظر مشتری</li>
            <li>طراحی از صفر مخصوص سلیقه شما</li>
            <li>ارسال به سراسر کشور</li>
            <li>مشاور تخصصی مطابق سلیقه شما</li>
            <li>صحافی، کارهای تبلیغاتی و گیفت باکس</li>
          </ul>
          <a class="btn btn-gold" href="custom.html" style="margin-top:26px">استعلام قیمت ${ICON.arrow}</a>
        </div>
        <div class="g">
          <div class="facts" style="margin-top:26px">
            <div class="fact"><span>سال تأسیس</span><b>۱۳۷۸</b></div>
            <div class="fact"><span>نوع فعالیت</span><b>چاپ و بسته‌بندی</b></div>
            <div class="fact"><span>مدیرعامل</span><b>کورش ثاقبی</b></div>
            <div class="fact"><span>نام شرکت</span><b>کیاپک</b></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="wrap section">
    <div class="head rev rev-up">
      <div class="eyebrow">ماشین‌آلات و تجهیزات</div>
      <h2>خط تولید</h2>
    </div>
    <div class="split">
      <div class="c">
        <ul class="gold-list">
          <li>ماشین‌آلات تمام اتومات ژاپنی</li>
          <li>لمینت تمام اتومات</li>
          <li>دایکات تمام اتومات</li>
          <li>جعبه چسبانی تمام اتومات</li>
          <li>سلفون</li>
          <li>چاپ ۳ رنگ</li>
          <li>منگنه</li>
        </ul>
      </div>
      <div class="g">
        <figure class="shot" style="margin:26px 0 0">
          <img src="assets/img/machinery.jpg" alt="ماشین‌آلات خط تولید" loading="lazy" width="1100" height="733">
        </figure>
      </div>
    </div>
  </section>

  ${PLY_SECTION}

  <section style="background:var(--paper-2)">
    <div class="wrap section">
      <div class="prose">
        <h3>ورق سه‌لایه، پنج‌لایه یا مقوای لمینتی؟</h3>
        <p>
          انتخاب اشتباه ورق، رایج‌ترین اشتباه در سفارش اول است. سه‌لایه برای محصولات سبک تا متوسط
          و حمل داخل شهری مناسب است. پنج‌لایه وقتی لازم می‌شود که وزن بالا باشد، جعبه‌ها در انبار
          روی هم چیده شوند یا مسیر حمل طولانی باشد. مقوای لمینتی وقتی انتخاب می‌شود که ظاهر جعبه
          بخشی از فروش است — ویترین فروشگاه، جعبه لوازم خانگی، گیفت باکس.
        </p>
        <h3>چرا ابعاد داخلی مهم‌تر از ابعاد بیرونی است</h3>
        <p>
          ابعاد را همیشه بر اساس محصول و ضربه‌گیر داخلی حساب کنید، نه بر اساس جعبه‌ای که قبلاً داشته‌اید.
          چند میلی‌متر خطا در ابعاد داخلی یعنی جابه‌جایی محصول در حمل، و جابه‌جایی یعنی آسیب.
        </p>
        <div class="tip">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9A7A2E" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 1 3.5 10.9c-.6.5-.9 1.1-.9 1.6H9.4c0-.5-.3-1.1-.9-1.6A6 6 0 0 1 12 3Z"/></svg>
          <p>پیش از تیراژ، ماکت بگیرید و محصول واقعی خودتان را داخلش بگذارید. یک ساعت وقت گذاشتن اینجا، از دوباره‌کاری روی ۱۰٬۰۰۰ جعبه جلوگیری می‌کند.</p>
        </div>
      </div>
    </div>
  </section>
</main>
`
};

pages['about.html'] = {
  title: 'درباره ما — کیا کارتن بسته‌نگار | کیاپک',
  desc: 'کارخانه چاپ و بسته‌بندی کیاپک، تأسیس ۱۳۷۸، شهرک صنعتی شمس‌آباد. بیش از دو دهه تجربه در تولید انواع بسته‌بندی صنعتی.',
  active: 'about',
  body: `
<main id="main">
  <div class="wrap">
    <nav class="crumb" aria-label="مسیر"><a href="index.html">خانه</a> / <b>درباره ما</b></nav>
  </div>

  <section class="wrap section">
    <div class="split">
      <div class="c">
        <div class="eyebrow">درباره ما</div>
        <h1 style="font-size:31px">بیش از دو دهه، پشت خط تولید</h1>
        <p style="font-size:15.5px;color:var(--ink-soft);margin-top:16px;line-height:2.2">
          کارخانه چاپ و بسته‌بندی کیاپک، با بیش از دو دهه تجربه در زمینه چاپ و تولید انواع بسته‌بندی،
          با بهره‌گیری از ماشین‌آلات پیشرفته و نیروی انسانی متخصص، همواره در جهت ارائه محصولاتی با
          کیفیت برتر و خدماتی متمایز به مشتریان خود گام برداشته است.
        </p>
      </div>
      <div class="g">
        <figure class="shot" style="margin-top:26px">
          <img src="assets/img/factory.jpg" alt="ساختمان کارخانه" loading="lazy" width="1200" height="760">
        </figure>
      </div>
    </div>
  </section>

  <section class="navy on-navy">
    <div class="wrap section">
      <div class="head rev rev-up">
        <div class="eyebrow">شناسنامه شرکت</div>
        <h2 style="color:#fff">اطلاعات ثبتی</h2>
      </div>
      <div class="facts">
        <div class="fact"><span>نام شرکت</span><b>کیاپک</b></div>
        <div class="fact"><span>مدیرعامل</span><b>کورش ثاقبی</b></div>
        <div class="fact"><span>نوع فعالیت</span><b>چاپ و بسته‌بندی</b></div>
        <div class="fact"><span>سال تأسیس</span><b>۱۳۷۸</b></div>
        <div class="fact"><span>شماره ثبت</span><b>۴۶۷۴۱۵</b></div>
        <div class="fact"><span>شناسه ملی</span><b>۱۴۰۰۴۷۰۰۲۹۵</b></div>
        <div class="fact"><span>تلفن</span><b>${PHONE}</b></div>
        <div class="fact"><span>نشانی</span><b style="font-size:13px;line-height:1.9">${ADDR}</b></div>
      </div>
    </div>
  </section>

  <section class="wrap section">
    <div class="head rev rev-up">
      <div class="eyebrow">مسیر ما</div>
      <h2>از ۱۳۷۸ تا امروز</h2>
    </div>
    ${TIMELINE}
  </section>

  <section class="wrap section" style="padding-top:0">
    <div class="head rev rev-up">
      <div class="eyebrow">مشتریان</div>
      <h2>برندهایی که با ما کار می‌کنند</h2>
    </div>
    <div class="clients">
      ${clientCards()}
    </div>
  </section>

  <section class="band-photo">
    <img src="assets/img/export-port.jpg" alt="بارگیری صادراتی" loading="lazy" width="900" height="600">
    <div class="over">
      <div class="wrap">
        <div style="max-width:520px">
          <div class="eyebrow light">صادرات</div>
          <h2 style="color:#fff;font-size:25px;line-height:1.45">بسته‌بندی سردخانه‌ای و صادراتی</h2>
          <p style="color:#C1CCDF;margin-top:12px;line-height:2">
            جعبه‌ای که قرار است مسیر طولانی و شرایط رطوبتی را تحمل کند، از همان مرحله‌ی انتخاب ورق فرق دارد.
          </p>
        </div>
      </div>
    </div>
  </section>
</main>
`
};

pages['custom.html'] = {
  title: 'استعلام قیمت و سفارش اختصاصی | کیاپک',
  desc: 'مشخصات جعبه را بفرستید تا قیمت دقیق اعلام شود. ساخت قالب، طراحی از صفر، ماکت و تولید اختصاصی — کیا کارتن بسته‌نگار.',
  active: 'custom',
  body: `
<main id="main">
  <div class="wrap">
    <nav class="crumb" aria-label="مسیر"><a href="index.html">خانه</a> / <b>استعلام قیمت</b></nav>
    <div class="phead">
      <h1>استعلام قیمت</h1>
      <p>قیمت جعبه به ابعاد، جنس ورق، روش چاپ و تیراژ بستگی دارد. مشخصات را بفرستید تا دقیق اعلام کنیم.</p>
    </div>
  </div>

  <div class="wrap" style="padding-bottom:50px">
    <div class="split">
      <div class="c">
        <div class="steps" style="grid-template-columns:minmax(0,1fr);gap:20px">
          <div class="step">
            <div class="t"><span class="n">۱</span><span class="ln"></span></div>
            <b>مشخصات را می‌فرستید</b>
            <p>ابعاد، تیراژ، نوع محصولی که داخلش قرار می‌گیرد و در صورت وجود، فایل طرح.</p>
          </div>
          <div class="step">
            <div class="t"><span class="n">۲</span><span class="ln"></span></div>
            <b>مشاوره و قیمت</b>
            <p>لایه‌بندی و ابعاد مناسب پیشنهاد می‌شود و قیمت دقیق اعلام می‌گردد.</p>
          </div>
          <div class="step">
            <div class="t"><span class="n">۳</span><span class="ln"></span></div>
            <b>ماکت و تأیید</b>
            <p>ماکت با متریال مورد نظر ساخته می‌شود تا پیش از تیراژ آن را ببینید.</p>
          </div>
          <div class="step">
            <div class="t"><span class="n">۴</span></div>
            <b>تولید و ارسال</b>
            <p>تولید در خط تمام‌اتومات و ارسال به سراسر کشور با فاکتور رسمی.</p>
          </div>
        </div>
        <div class="fact on-light" style="margin-top:26px">
          <span>تماس مستقیم</span>
          <b><a href="${TEL}" style="color:var(--ink)">${PHONE}</a></b>
        </div>
      </div>

      <div class="g">
        <form class="form-card" onsubmit="return false" style="margin-top:26px">
          <div class="form-row">
            <div class="field">
              <label for="q-name">نام و نام خانوادگی</label>
              <input id="q-name" name="name" type="text" placeholder="مثلاً علی رضایی" autocomplete="name">
            </div>
            <div class="field">
              <label for="q-phone">شماره تماس</label>
              <input id="q-phone" name="phone" type="tel" placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰" autocomplete="tel">
            </div>
          </div>
          <div class="field">
            <label for="q-co">نام شرکت یا برند</label>
            <input id="q-co" name="company" type="text" placeholder="اختیاری" autocomplete="organization">
          </div>
          <div class="field">
            <span class="lbl" id="q-cat-l">نوع جعبه</span>
            <div class="chips" role="group" aria-labelledby="q-cat-l">
              <span class="chip on">خودرویی</span><span class="chip">صنعتی</span>
              <span class="chip">غذایی و صادراتی</span><span class="chip">دارویی و بهداشتی</span>
              <span class="chip">روشنایی</span><span class="chip">شیرآلات</span>
              <span class="chip">تهویه و سرمایش</span><span class="chip">لوازم خانه</span>
              <span class="chip">گیفت باکس</span>
            </div>
          </div>
          <div class="form-row">
            <div class="field">
              <label for="q-qty">تیراژ</label>
              <select id="q-qty" name="qty">
                <option>۱٬۰۰۰ تا ۳٬۰۰۰ عدد</option>
                <option selected>۳٬۰۰۰ تا ۱۰٬۰۰۰ عدد</option>
                <option>۱۰٬۰۰۰ تا ۵۰٬۰۰۰ عدد</option>
                <option>بیش از ۵۰٬۰۰۰ عدد</option>
              </select>
            </div>
            <div class="field">
              <label for="q-sheet">جنس ورق</label>
              <select id="q-sheet" name="sheet">
                <option>سه‌لایه</option>
                <option>پنج‌لایه</option>
                <option>مقوای لمینتی</option>
                <option>نمی‌دانم — مشاوره می‌خواهم</option>
              </select>
            </div>
          </div>
          <div class="field">
            <label for="q-desc">ابعاد و توضیحات</label>
            <textarea id="q-desc" name="desc" placeholder="مثلاً: ۳۰×۲۰×۱۵ سانتی‌متر، برای قطعه فلزی ۴ کیلویی، چاپ دو رنگ"></textarea>
          </div>
          <div class="field">
            <label for="q-file">فایل طرح (اختیاری)</label>
            <input id="q-file" name="file" type="file">
          </div>
          <button class="btn btn-navy btn-block" type="submit">ارسال درخواست استعلام</button>
          <p class="note">پاسخ در کمتر از یک روز کاری</p>
        </form>
      </div>
    </div>
  </div>
</main>
`
};

/* ---------- retail shop + product ---------------------------------------- */

const SHOP = [
  ['کارتن پستی سه‌لایه', 'کد ۱۰۱ — ۳۰×۲۰×۱۵', '۱۸٬۹۰۰', 'boxes-labelled.jpg', 'پرفروش', 18900],
  ['کارتن پستی کوچک', 'کد ۱۰۲ — ۲۰×۱۵×۱۰', '۱۲٬۴۰۰', 'box-detail.jpg', '', 12400],
  ['جعبه لمینتی ویترینی', 'کد ۲۰۱ — ۲۵×۱۸×۸', '۳۴٬۰۰۰', 'giftbox.jpg', '', 34000],
  ['گیفت باکس مربع', 'کد ۲۰۲ — ۱۵×۱۵×۷', '۲۸٬۵۰۰', '', '', 28500],
  ['جعبه دایکاتی کشویی', 'کد ۲۰۳ — ۲۰×۱۲×۶', '۳۱٬۰۰۰', '', '', 31000],
  ['کارتن پنج‌لایه بزرگ', 'کد ۱۰۳ — ۵۰×۴۰×۳۰', '۴۶٬۰۰۰', '', '', 46000],
];

const BOXSVG = `<svg viewBox="0 0 170 150" fill="none" aria-hidden="true">
              <ellipse cx="85" cy="140" rx="52" ry="9" fill="#131A24" opacity=".10"/>
              <path d="M85 66 L140 38 L140 100 L85 128 Z" fill="#CBB292"/>
              <path d="M85 66 L30 38 L30 100 L85 128 Z" fill="#E3CDAE"/>
              <path d="M85 66 L30 38 L85 10 L140 38 Z" fill="#F0E2CD"/>
              <path d="M85 10 L85 66" stroke="#B69B78" stroke-width="1.4"/>
            </svg>`;

pages['shop.html'] = {
  title: 'فروشگاه — خرید کارتن و جعبه از ۵۰ عدد | کیاپک',
  desc: 'خرید آنلاین کارتن پستی، جعبه لمینتی و گیفت باکس از ۵۰ عدد، مستقیم از کارخانه. قیمت پلکانی و ارسال به سراسر کشور.',
  active: 'shop',
  body: `
<main id="main">
  <div class="wrap">
    <nav class="crumb" aria-label="مسیر"><a href="index.html">خانه</a> / <b>فروشگاه</b></nav>
    <div class="phead">
      <h1>فروشگاه تیراژ کم</h1>
      <p>طرح‌های آماده، از ۵۰ عدد — بدون حداقل سفارش کارخانه‌ای. برای تیراژ بالا و چاپ اختصاصی، <a href="custom.html">استعلام قیمت</a> بگیرید.</p>
    </div>
  </div>

  <div class="wrap" style="padding-bottom:50px">
    <div class="grid-products">
      ${SHOP.map(([n, m, p, img, badge, u], i) => `
      <div class="card rev rev-up d${i % 4}">
        <a class="art" href="product.html" aria-label="${n}">${badge ? `<span class="badge">${badge}</span>` : ''}${
        img ? `<img src="assets/img/${img}" alt="${n}" loading="lazy">` : BOXSVG}</a>
        <div class="body">
          <a href="product.html"><b>${n}</b></a>
          <span class="meta">${m}</span>
          <span class="price"><b>${p}</b><span>تومان / عدد</span></span>
          <button class="btn btn-navy btn-block" type="button" style="margin-top:12px;min-height:44px;font-size:14px"
            data-add data-name="${n}" data-opts="${m}" data-unit="${u}" data-qty="50"${img ? ` data-img="assets/img/${img}"` : ''}>
            افزودن ۵۰ عدد به سبد
          </button>
        </div>
      </div>`).join('')}
    </div>
  </div>
</main>
`
};

pages['product.html'] = {
  title: 'کارتن پستی سه‌لایه — کیاپک',
  desc: 'کارتن پستی سه‌لایه در سه اندازه، از ۵۰ عدد. اندازه و تیراژ را انتخاب کنید تا قیمت هر عدد زنده محاسبه شود.',
  active: 'product',
  body: `
<main id="main" data-product>
  <div class="wrap">
    <nav class="crumb" aria-label="مسیر"><a href="index.html">خانه</a> / <a href="shop.html">فروشگاه</a> / <b>کارتن پستی سه‌لایه</b></nav>
  </div>

  <div class="wrap section" style="padding-top:18px">
    <div class="cfg">
      <div>
        <div class="stage" data-stage><span class="chip-abs">پیش‌نمایش زنده</span></div>
        <p style="display:flex;align-items:center;gap:9px;margin-top:12px;font-size:12.5px;color:var(--muted)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9A7A2E" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>
          تصویر شماتیک است — ماکت فیزیکی پیش از تیراژ ارسال می‌شود.
        </p>
      </div>

      <div>
        <h1 style="font-size:27px">کارتن پستی سه‌لایه</h1>
        <p style="font-size:14px;color:var(--muted);margin-top:9px">کد ۱۰۱ — ورق سه‌لایه، مناسب پست و ارسال شهری</p>

        <div style="margin-top:26px">
          <div style="font-size:13.5px;font-weight:700;margin-bottom:11px">اندازه</div>
          <div class="opts" data-sizes>
            <button type="button" class="opt" data-size="s" aria-pressed="false">کوچک</button>
            <button type="button" class="opt on" data-size="m" aria-pressed="true">متوسط</button>
            <button type="button" class="opt" data-size="l" aria-pressed="false">بزرگ</button>
          </div>
          <p style="font-size:12.5px;color:var(--muted);margin-top:10px">ابعاد <b data-dims>—</b> — ظرفیت <b data-cap>—</b></p>
        </div>

        <div style="margin-top:26px">
          <div style="display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin-bottom:11px">
            <span style="font-size:13.5px;font-weight:700">جنس و رویه</span>
            <span style="font-size:12.5px;color:var(--muted)" data-finish-name>—</span>
          </div>
          <div class="swatches" data-finishes>
            <button type="button" class="swatch on" data-finish="kraft" aria-pressed="true" aria-label="کرافت ساده" style="background:linear-gradient(135deg,#E3CDAE 50%,#CBB292 50%)"></button>
            <button type="button" class="swatch" data-finish="white" aria-pressed="false" aria-label="سفید" style="background:linear-gradient(135deg,#FAFAFA 50%,#E6E6E6 50%)"></button>
            <button type="button" class="swatch" data-finish="print" aria-pressed="false" aria-label="چاپ‌دار" style="background:linear-gradient(135deg,#E3CDAE 50%,#0A1730 50%)"></button>
            <button type="button" class="swatch" data-finish="lam" aria-pressed="false" aria-label="لمینتی" style="background:linear-gradient(135deg,#0E1E3C 50%,#C9A24B 50%)"></button>
          </div>
        </div>

        <div style="margin-top:28px">
          <div style="font-size:16.5px;font-weight:900">تعداد را انتخاب کنید</div>
          <p style="font-size:12.5px;color:var(--muted);line-height:1.9;margin:6px 0 14px">
            هرچه تعداد بیشتر، قیمت هر عدد کمتر. حداقل سفارش ۵۰ عدد است.
          </p>
          <div class="tiers" data-tiers></div>
        </div>

        <div class="total-card">
          <div>
            <div class="u"><span data-unit>—</span> <span style="font-size:14px;font-weight:500">تومان</span></div>
            <div class="k">قیمت هر عدد — <span data-saving>—</span></div>
          </div>
          <div class="r">
            <b><span data-total>—</span> تومان</b>
            <span class="k">مبلغ کل <span data-qty>—</span></span>
          </div>
        </div>

        <div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap">
          <button class="btn btn-gold" type="button" style="flex:1 1 200px" data-add-configured>افزودن به سبد خرید</button>
          <a class="btn btn-outline" href="${TEL}">مشاوره تلفنی</a>
        </div>

        <a class="upsell" href="custom.html">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9A7A2E" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20V7.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2V20"/><path d="M4 20h16M9 11h6M9 15h4"/></svg>
          <span class="g"><b>تیراژ بالاتر با چاپ اختصاصی؟</b><span>از ۱٬۰۰۰ عدد، با قالب و طرح برند شما</span></span>
          ${ICON.arrow}
        </a>

        <div style="margin-top:26px">
          <div style="font-size:16.5px;font-weight:900;margin-bottom:12px">مشخصات</div>
          <div class="specs">
            <div class="r"><span class="k">جنس</span><span class="v">ورق کنگره‌ای سه‌لایه</span></div>
            <div class="r"><span class="k">ابعاد</span><span class="v" data-dims>—</span></div>
            <div class="r"><span class="k">ظرفیت</span><span class="v" data-cap>—</span></div>
            <div class="r"><span class="k">رویه</span><span class="v" data-finish-name>—</span></div>
            <div class="r"><span class="k">ارسال</span><span class="v">۳ تا ۵ روز کاری</span></div>
            <div class="r"><span class="k">فاکتور</span><span class="v">رسمی، در صورت درخواست</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
`
};

pages['cart.html'] = {
  title: 'سبد خرید | کیاپک',
  desc: 'سبد خرید فروشگاه کیاپک — کارتن و جعبه آماده از ۵۰ عدد.',
  active: 'cart',
  body: CART_BODY
};

pages['login.html'] = {
  title: 'ورود به حساب کاربری | کیاپک',
  desc: 'ورود به حساب کاربری کیاپک با شماره موبایل و کد تأیید.',
  active: 'login',
  body: LOGIN_BODY
};

pages['signup.html'] = {
  title: 'ثبت‌نام | کیاپک',
  desc: 'ساخت حساب کاربری در کیاپک — حساب شرکتی یا شخصی، با شماره موبایل.',
  active: 'login',
  body: SIGNUP_BODY
};

/* ---------- write --------------------------------------------------------- */

let n = 0;
const LD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'شرکت چاپ و بسته‌بندی کیا کارتن بسته‌نگار',
  alternateName: 'کیاپک',
  url: BASE,
  logo: BASE + '/assets/favicon.svg',
  foundingDate: '1999',
  telephone: '+98-21-56901317',
  sameAs: ['https://www.instagram.com/kiapack.co/'],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IR',
    addressRegion: 'تهران',
    streetAddress: 'شهرک صنعتی شمس‌آباد، بلوار استقلال، خیابان میخک ۸، پلاک ۴'
  }
});

for (const [file, p] of Object.entries(pages)) {
  const ld = file === 'index.html'
    ? String.fromCharCode(10) + '<script type="application/ld+json">' + LD + '</script>' : '';
  fs.writeFileSync(file, head(p.title, p.desc, ld, file) + header(p.active) + p.body + footer(p.active));
  n++;
}

/* 404 */
const NOT_FOUND = `
<main id="main">
  <section class="hero ribbon">
    <div class="wrap" style="display:block;text-align:center;padding-top:70px;padding-bottom:80px">
      <div class="eyebrow light" style="justify-content:center">خطای ۴۰۴</div>
      <h1 style="font-size:40px">این صفحه پیدا نشد</h1>
      <p class="lede" style="margin:16px auto 0">
        ممکن است نشانی را اشتباه وارد کرده باشید یا صفحه جابه‌جا شده باشد.
      </p>
      <div class="cta" style="justify-content:center">
        <a class="btn btn-gold" href="index.html">بازگشت به خانه</a>
        <a class="btn btn-ghost" href="products.html">دیدن محصولات</a>
      </div>
    </div>
  </section>
</main>
`;
fs.writeFileSync('404.html', head('صفحه پیدا نشد | کیاپک', 'صفحه مورد نظر پیدا نشد.', '', '404.html') + header('') + NOT_FOUND + footer(''));
n++;

/* sitemap + robots */
const urls = Object.keys(pages);
const NLC = String.fromCharCode(10);
fs.writeFileSync('sitemap.xml',
  '<?xml version="1.0" encoding="UTF-8"?>' + NLC
  + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + NLC
  + urls.map(u => '  <url><loc>' + BASE + '/' + u + '</loc><changefreq>monthly</changefreq></url>').join(NLC)
  + NLC + '</urlset>' + NLC);
fs.writeFileSync('robots.txt',
  'User-agent: *' + NLC + 'Allow: /' + NLC + 'Sitemap: ' + BASE + '/sitemap.xml' + NLC);

console.log('built ' + n + ' pages + 404, sitemap, robots');
