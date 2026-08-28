/* کیاپک — interaction */
(function () {
  'use strict';

  var FA = '۰۱۲۳۴۵۶۷۸۹';
  function fa(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '٬')
                    .replace(/[0-9]/g, function (d) { return FA[Number(d)]; });
  }

  /* ---- mobile nav ---- */
  var burger = document.querySelector('[data-burger]');
  var mnav = document.querySelector('[data-mnav]');
  if (burger && mnav) {
    burger.addEventListener('click', function () {
      var open = mnav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---- chip groups ---- */
  document.querySelectorAll('.chips').forEach(function (group) {
    group.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      group.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('on'); });
      chip.classList.add('on');
    });
  });

  /* ---- scroll reveal ---- */
  var revs = document.querySelectorAll('.rev');
  if (revs.length) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      revs.forEach(function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      revs.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---- product configurator ---- */
  var root = document.querySelector('[data-product]');
  if (!root) return;

  var QTYS = [50, 100, 250, 500];
  var NOTES = ['شروع خرید', 'کسب‌وکار کوچک', 'فروشگاه', 'بهترین قیمت'];

  var SIZES = {
    s: { name: 'کوچک',  prices: [14900, 13600, 12100, 11200], dims: '۲۰×۱۵×۱۰ سانتی‌متر', cap: 'تا ۳ کیلوگرم', w: 96,  h: 74,  d: 34 },
    m: { name: 'متوسط', prices: [18900, 17300, 15400, 14200], dims: '۳۰×۲۰×۱۵ سانتی‌متر', cap: 'تا ۸ کیلوگرم', w: 118, h: 88,  d: 44 },
    l: { name: 'بزرگ',  prices: [24500, 22400, 19900, 18300], dims: '۵۰×۴۰×۳۰ سانتی‌متر', cap: 'تا ۲۰ کیلوگرم', w: 140, h: 104, d: 54 }
  };

  var FINISH = {
    kraft: { name: 'کرافت ساده',  top: '#F0E2CD', left: '#E3CDAE', right: '#CBB292', seam: '#B69B78' },
    white: { name: 'سفید',        top: '#FCFCFC', left: '#EFEFEF', right: '#DCDCDC', seam: '#C4C4C4' },
    print: { name: 'چاپ‌دار',      top: '#F0E2CD', left: '#E3CDAE', right: '#CBB292', seam: '#B69B78', band: '#0A1730' },
    lam:   { name: 'لمینتی براق', top: '#1C3157', left: '#0E1E3C', right: '#081428', seam: '#22355C', band: '#C9A24B' }
  };

  var state = { size: 'm', qty: 100, finish: 'kraft' };

  var $tiers = root.querySelector('[data-tiers]');
  var $sizes = root.querySelector('[data-sizes]');
  var $fin = root.querySelector('[data-finishes]');
  var $stage = root.querySelector('[data-stage]');
  var $dims = root.querySelectorAll('[data-dims]');
  var $cap = root.querySelectorAll('[data-cap]');
  var $fname = root.querySelectorAll('[data-finish-name]');
  var $unit = root.querySelectorAll('[data-unit]');
  var $qty = root.querySelectorAll('[data-qty]');
  var $total = root.querySelectorAll('[data-total]');
  var $save = root.querySelectorAll('[data-saving]');

  function boxSvg() {
    var f = FINISH[state.finish], s = SIZES[state.size];
    var cx = 110, by = 178, w = s.w, h = s.h, d = s.d;
    var top = by - h;
    // isometric box: top rhombus + two side faces
    var p = {
      tt: cx + ',' + (top - d),
      tr: (cx + w) + ',' + top,
      tb: cx + ',' + (top + d),
      tl: (cx - w) + ',' + top
    };
    var band = f.band
      ? '<rect x="' + (cx - w + 12) + '" y="' + (top + d + h * 0.30) + '" width="' + (w - 20) + '" height="' + (h * 0.19) + '" fill="' + f.band + '" opacity=".9"/>'
      : '';
    return '<svg viewBox="0 0 220 210" width="100%" height="100%" role="img" aria-label="پیش‌نمایش جعبه">'
      + '<ellipse cx="' + cx + '" cy="' + (by + 12) + '" rx="' + (w + 14) + '" ry="12" fill="#131A24" opacity=".13"/>'
      + '<path d="M' + p.tl + ' L' + p.tb + ' L' + cx + ',' + (top + d + h) + ' L' + (cx - w) + ',' + (top + h) + ' Z" fill="' + f.left + '"/>'
      + '<path d="M' + p.tb + ' L' + p.tr + ' L' + (cx + w) + ',' + (top + h) + ' L' + cx + ',' + (top + d + h) + ' Z" fill="' + f.right + '"/>'
      + '<path d="M' + p.tt + ' L' + p.tr + ' L' + p.tb + ' L' + p.tl + ' Z" fill="' + f.top + '"/>'
      + '<path d="M' + p.tt + ' L' + p.tb + '" stroke="' + f.seam + '" stroke-width="1.4"/>'
      + band
      + '</svg>';
  }

  function render() {
    var s = SIZES[state.size], prices = s.prices, base = prices[0];
    var i = QTYS.indexOf(state.qty);
    if (i < 0) { i = 1; state.qty = QTYS[1]; }
    var unit = prices[i];
    var saving = Math.round((1 - unit / base) * 100);

    $tiers.innerHTML = QTYS.map(function (q, k) {
      var on = q === state.qty;
      var cut = Math.round((1 - prices[k] / base) * 100);
      return '<button type="button" class="tier' + (on ? ' on' : '') + '" data-tier="' + q + '" aria-pressed="' + on + '">'
        + '<span class="l"><span class="dot" aria-hidden="true"></span>'
        + '<span><span class="q">' + fa(q) + ' عدد</span><span class="n">' + NOTES[k] + '</span></span></span>'
        + '<span style="text-align:left"><span class="u">' + fa(prices[k]) + ' <small>ت/عدد</small></span><br>'
        + '<span class="cut' + (cut > 0 ? '' : ' base') + '">' + (cut > 0 ? fa(cut) + '٪ ارزان‌تر' : 'قیمت پایه') + '</span></span>'
        + '</button>';
    }).join('');

    $sizes.querySelectorAll('[data-size]').forEach(function (b) {
      var on = b.getAttribute('data-size') === state.size;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    if ($fin) $fin.querySelectorAll('[data-finish]').forEach(function (b) {
      var on = b.getAttribute('data-finish') === state.finish;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    if ($stage) $stage.innerHTML = '<span class="chip-abs">پیش‌نمایش زنده</span>' + boxSvg();
    $dims.forEach(function (e) { e.textContent = s.dims; });
    $cap.forEach(function (e) { e.textContent = s.cap; });
    $fname.forEach(function (e) { e.textContent = FINISH[state.finish].name; });
    $unit.forEach(function (e) { e.textContent = fa(unit); });
    $qty.forEach(function (e) { e.textContent = fa(state.qty) + ' عدد'; });
    $total.forEach(function (e) { e.textContent = fa(unit * state.qty); });
    $save.forEach(function (e) {
      e.textContent = saving > 0 ? fa(saving) + '٪ ارزان‌تر از تیراژ پایه' : 'قیمت پایه';
    });
  }

  $tiers.addEventListener('click', function (e) {
    var b = e.target.closest('[data-tier]');
    if (b) { state.qty = Number(b.getAttribute('data-tier')); render(); }
  });
  $sizes.addEventListener('click', function (e) {
    var b = e.target.closest('[data-size]');
    if (b) { state.size = b.getAttribute('data-size'); render(); }
  });
  if ($fin) $fin.addEventListener('click', function (e) {
    var b = e.target.closest('[data-finish]');
    if (b) { state.finish = b.getAttribute('data-finish'); render(); }
  });

  render();
})();
