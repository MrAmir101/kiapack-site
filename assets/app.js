/* Kiapack concept site — interaction */
(function () {
  'use strict';

  var FA = '۰۱۲۳۴۵۶۷۸۹';

  function fa(n) {
    return String(n)
      .replace(/\B(?=(\d{3})+(?!\d))/g, '٬')
      .replace(/[0-9]/g, function (d) { return FA[Number(d)]; });
  }

  /* ---- mobile navigation ---- */
  var toggle = document.querySelector('[data-nav-toggle]');
  var menu = document.querySelector('[data-mobile-nav]');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---- scroll reveal ---- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(reveals, function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      Array.prototype.forEach.call(reveals, function (el) { io.observe(el); });
    }
  }

  /* ---- product configurator ---- */
  var root = document.querySelector('[data-product]');
  if (!root) return;

  var QTYS = [50, 100, 250, 500];
  var NOTES = ['شروع خرید', 'مغازه‌ی کوچک', 'کافه‌ی کوچک', 'بهترین قیمت'];

  var SIZES = {
    4:  { prices: [6200, 5700, 5100, 4700], dims: '۷ × ۸ سانتی‌متر', ml: '۱۲۰ میلی‌لیتر', h: 78, w: 46 },
    8:  { prices: [7900, 7200, 6400, 5900], dims: '۸ × ۱۱ سانتی‌متر', ml: '۲۴۰ میلی‌لیتر', h: 100, w: 54 },
    12: { prices: [9400, 8600, 7700, 7100], dims: '۹ × ۱۳ سانتی‌متر', ml: '۳۶۰ میلی‌لیتر', h: 118, w: 60 }
  };

  var FINISHES = {
    kraft: { name: 'کرافت طبیعی', body: '#E3CDAE', shade: '#CBB292', lid: '#14181D', lidTop: '#2A333B', band: '#C9AE8C' },
    white: { name: 'سفید ساده',   body: '#FDFCFA', shade: '#E9E2D8', lid: '#14181D', lidTop: '#2A333B', band: '#EFE9E0' },
    cyan:  { name: 'فیروزه‌ای',    body: '#FDFCFA', shade: '#E9E2D8', lid: '#24B4E4', lidTop: '#4AC6EF', band: '#24B4E4' },
    ink:   { name: 'مشکی مات',     body: '#2A333B', shade: '#1D242B', lid: '#14181D', lidTop: '#3A444E', band: '#14181D' }
  };

  var state = { size: 8, qty: 100, finish: 'kraft' };

  var tiersEl = root.querySelector('[data-tiers]');
  var sizesEl = root.querySelector('[data-sizes]');
  var finishEl = root.querySelector('[data-finishes]');
  var stageEl = root.querySelector('[data-stage]');
  var dimsEl = root.querySelector('[data-dims]');
  var mlEl = root.querySelector('[data-ml]');
  var finishNameEl = root.querySelector('[data-finish-name]');
  var unitEls = root.querySelectorAll('[data-unit]');
  var qtyEls = root.querySelectorAll('[data-qty]');
  var totalEls = root.querySelectorAll('[data-total]');
  var saveEls = root.querySelectorAll('[data-saving]');

  function cupSvg() {
    var f = FINISHES[state.finish];
    var s = SIZES[state.size];
    var w = s.w, h = s.h;
    var cx = 100, baseY = 190;
    var topY = baseY - h;
    var topW = w, botW = w * 0.74;
    var lx = cx - topW, rx = cx + topW;
    var blx = cx - botW, brx = cx + botW;
    var ry = topW * 0.28;

    return '<svg viewBox="0 0 200 210" width="100%" height="100%" role="img" aria-label="پیش‌نمایش لیوان">'
      + '<ellipse cx="' + cx + '" cy="' + (baseY + 8) + '" rx="' + (botW + 16) + '" ry="10" fill="#14181D" opacity=".12"/>'
      + '<path d="M' + lx + ' ' + topY + ' H' + rx + ' L' + brx + ' ' + baseY + ' a' + botW + ' ' + (botW * 0.26) + ' 0 0 1 -' + (botW * 2) + ' 0 Z" fill="' + f.body + '"/>'
      + '<path d="M' + cx + ' ' + topY + ' H' + rx + ' L' + brx + ' ' + baseY + ' a' + botW + ' ' + (botW * 0.26) + ' 0 0 1 -' + botW + ' ' + (botW * 0.26) + ' Z" fill="' + f.shade + '"/>'
      + '<rect x="' + (lx + 6) + '" y="' + (topY + h * 0.34) + '" width="' + (topW * 2 - 12) + '" height="' + (h * 0.2) + '" fill="' + f.band + '" opacity=".55"/>'
      + '<ellipse cx="' + cx + '" cy="' + topY + '" rx="' + topW + '" ry="' + ry + '" fill="' + f.lid + '"/>'
      + '<ellipse cx="' + cx + '" cy="' + (topY - 3) + '" rx="' + (topW * 0.78) + '" ry="' + (ry * 0.74) + '" fill="' + f.lidTop + '"/>'
      + '</svg>';
  }

  function render() {
    var s = SIZES[state.size];
    var prices = s.prices;
    var base = prices[0];
    var idx = QTYS.indexOf(state.qty);
    if (idx < 0) { idx = 1; state.qty = QTYS[1]; }
    var unit = prices[idx];
    var saving = Math.round((1 - unit / base) * 100);

    tiersEl.innerHTML = QTYS.map(function (q, i) {
      var on = q === state.qty;
      var cut = Math.round((1 - prices[i] / base) * 100);
      return '<button type="button" class="tier' + (on ? ' on' : '') + '" data-tier="' + q + '"' +
        ' aria-pressed="' + (on ? 'true' : 'false') + '">' +
        '<span class="left">' +
          '<span class="radio" aria-hidden="true"></span>' +
          '<span><span class="qty">' + fa(q) + ' عدد</span>' +
          '<span class="note">' + NOTES[i] + '</span></span>' +
        '</span>' +
        '<span class="right">' +
          '<span class="unit">' + fa(prices[i]) + ' <small>ت/عدد</small></span>' +
          '<span class="saving' + (cut > 0 ? '' : ' base') + '">' +
            (cut > 0 ? fa(cut) + '٪ ارزان‌تر' : 'قیمت پایه') +
          '</span>' +
        '</span>' +
      '</button>';
    }).join('');

    Array.prototype.forEach.call(sizesEl.querySelectorAll('[data-size]'), function (b) {
      var on = Number(b.getAttribute('data-size')) === state.size;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    if (finishEl) {
      Array.prototype.forEach.call(finishEl.querySelectorAll('[data-finish]'), function (b) {
        var on = b.getAttribute('data-finish') === state.finish;
        b.classList.toggle('on', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }

    if (stageEl) stageEl.innerHTML = cupSvg();
    if (dimsEl) dimsEl.textContent = s.dims;
    if (mlEl) mlEl.textContent = s.ml;
    if (finishNameEl) finishNameEl.textContent = FINISHES[state.finish].name;

    Array.prototype.forEach.call(unitEls, function (el) { el.textContent = fa(unit); });
    Array.prototype.forEach.call(qtyEls, function (el) { el.textContent = fa(state.qty) + ' عدد'; });
    Array.prototype.forEach.call(totalEls, function (el) { el.textContent = fa(unit * state.qty); });
    Array.prototype.forEach.call(saveEls, function (el) {
      el.textContent = saving > 0 ? (fa(saving) + '٪ ارزان‌تر از تیراژ پایه') : 'قیمت پایه';
    });
  }

  tiersEl.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-tier]');
    if (!btn) return;
    state.qty = Number(btn.getAttribute('data-tier'));
    render();
  });

  sizesEl.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-size]');
    if (!btn) return;
    state.size = Number(btn.getAttribute('data-size'));
    render();
  });

  if (finishEl) {
    finishEl.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-finish]');
      if (!btn) return;
      state.finish = btn.getAttribute('data-finish');
      render();
    });
  }

  render();
})();
