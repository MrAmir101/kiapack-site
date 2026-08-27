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

  /* ---- product configurator ---- */
  var root = document.querySelector('[data-product]');
  if (!root) return;

  var QTYS = [50, 100, 250, 500];
  var NOTES = ['شروع خرید', 'مغازه‌ی کوچک', 'کافه‌ی کوچک', 'بهترین قیمت'];
  var SIZES = {
    4: { prices: [3400, 3150, 2800, 2500], dims: '۷ × ۸ سانتی‌متر' },
    8: { prices: [4200, 3900, 3450, 3100], dims: '۸ × ۱۱ سانتی‌متر' },
    12: { prices: [5100, 4750, 4200, 3800], dims: '۹ × ۱۳ سانتی‌متر' }
  };

  var state = { size: 8, qty: 100 };

  var tiersEl = root.querySelector('[data-tiers]');
  var sizesEl = root.querySelector('[data-sizes]');
  var dimsEl = root.querySelector('[data-dims]');
  var unitEls = root.querySelectorAll('[data-unit]');
  var qtyEls = root.querySelectorAll('[data-qty]');
  var totalEls = root.querySelectorAll('[data-total]');

  function render() {
    var prices = SIZES[state.size].prices;
    var base = prices[0];
    var idx = QTYS.indexOf(state.qty);
    if (idx < 0) { idx = 1; state.qty = QTYS[1]; }
    var unit = prices[idx];

    tiersEl.innerHTML = QTYS.map(function (q, i) {
      var on = q === state.qty;
      var saving = Math.round((1 - prices[i] / base) * 100);
      return '<button type="button" class="tier' + (on ? ' on' : '') + '" data-tier="' + q + '"' +
        ' aria-pressed="' + (on ? 'true' : 'false') + '">' +
        '<span class="left">' +
          '<span class="radio" aria-hidden="true"></span>' +
          '<span><span class="qty">' + fa(q) + ' عدد</span>' +
          '<span class="note">' + NOTES[i] + '</span></span>' +
        '</span>' +
        '<span class="right">' +
          '<span class="unit">' + fa(prices[i]) + ' <small>ت/عدد</small></span>' +
          '<span class="saving' + (saving > 0 ? '' : ' base') + '">' +
            (saving > 0 ? fa(saving) + '٪ ارزان‌تر' : 'قیمت پایه') +
          '</span>' +
        '</span>' +
      '</button>';
    }).join('');

    Array.prototype.forEach.call(sizesEl.querySelectorAll('[data-size]'), function (b) {
      var on = Number(b.getAttribute('data-size')) === state.size;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    if (dimsEl) dimsEl.textContent = SIZES[state.size].dims;
    Array.prototype.forEach.call(unitEls, function (el) { el.textContent = fa(unit) + ' تومان'; });
    Array.prototype.forEach.call(qtyEls, function (el) { el.textContent = fa(state.qty) + ' عدد'; });
    Array.prototype.forEach.call(totalEls, function (el) { el.textContent = fa(unit * state.qty); });
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

  render();
})();
