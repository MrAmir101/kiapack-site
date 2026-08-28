/* کیاپک — interaction layer */
(function () {
  'use strict';

  var FA = '۰۱۲۳۴۵۶۷۸۹';
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function fa(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '٬')
                    .replace(/[0-9]/g, function (d) { return FA[Number(d)]; });
  }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function ease(t) { return 1 - Math.pow(1 - t, 3); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* ---------------------------------------------------------------- nav -- */

  var burger = $('[data-burger]'), mnav = $('[data-mnav]');
  if (burger && mnav) {
    burger.addEventListener('click', function () {
      var open = mnav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  $$('.chips').forEach(function (group) {
    group.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      $$('.chip', group).forEach(function (c) { c.classList.remove('on'); c.setAttribute('aria-pressed', 'false'); });
      chip.classList.add('on');
      chip.setAttribute('aria-pressed', 'true');
    });
  });

  /* ----------------------------------------------------- scroll progress -- */

  var bar = $('.progress');
  if (bar && !REDUCED) {
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = 'scaleX(' + (h > 0 ? clamp(window.scrollY / h, 0, 1) : 0) + ')';
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------------ reveals -- */

  var revs = $$('.rev');
  if (revs.length) {
    if (REDUCED || !('IntersectionObserver' in window)) {
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

  /* ----------------------------------------------------------- counters -- */

  var counters = $$('[data-count]');
  if (counters.length) {
    var run = function (el) {
      var target = Number(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      var prefix = el.getAttribute('data-prefix') || '';
      if (REDUCED) { el.textContent = prefix + fa(target) + suffix; return; }
      var t0 = null, dur = 1400;
      var step = function (ts) {
        if (t0 === null) t0 = ts;
        var p = clamp((ts - t0) / dur, 0, 1);
        el.textContent = prefix + fa(Math.round(target * ease(p))) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (!('IntersectionObserver' in window)) counters.forEach(run);
    else {
      var cio = new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          if (en.isIntersecting) { run(en.target); cio.unobserve(en.target); }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { cio.observe(el); });
    }
  }

  /* ----------------------------------------------------------- parallax -- */

  var par = $$('[data-parallax]');
  if (par.length && !REDUCED) {
    var pTick = false;
    var move = function () {
      if (pTick) return;
      pTick = true;
      requestAnimationFrame(function () {
        par.forEach(function (el) {
          var r = el.getBoundingClientRect();
          if (r.bottom < -80 || r.top > window.innerHeight + 80) return;
          var mid = r.top + r.height / 2 - window.innerHeight / 2;
          var amt = Number(el.getAttribute('data-parallax')) || 14;
          el.style.transform = 'translate3d(0,' + (-(mid / window.innerHeight) * amt).toFixed(2) + 'px,0)';
        });
        pTick = false;
      });
    };
    window.addEventListener('scroll', move, { passive: true });
    window.addEventListener('resize', move);
    move();
  }

  /* ------------------------------------------------- box fold animation -- */

  var fold = $('[data-fold]');
  if (fold) {
    // three faces, each four points: flat net -> folded isometric box
    var NET = {
      top:   [[105, 42], [295, 42], [295, 112], [105, 112]],
      left:  [[105, 112], [200, 112], [200, 242], [105, 242]],
      right: [[200, 112], [295, 112], [295, 242], [200, 242]]
    };
    var BOX = {
      top:   [[200, 58], [295, 100], [200, 142], [105, 100]],
      left:  [[105, 100], [200, 142], [200, 237], [105, 195]],
      right: [[200, 142], [295, 100], [295, 195], [200, 237]]
    };
    var faces = ['left', 'right', 'top'];
    var COL = { top: '#F0E2CD', left: '#E3CDAE', right: '#CBB292' };

    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 400 300');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'انیمیشن تا شدن ورق کارتن به جعبه');
    var shadow = document.createElementNS(svgNS, 'ellipse');
    shadow.setAttribute('cx', '200'); shadow.setAttribute('cy', '250');
    shadow.setAttribute('rx', '110'); shadow.setAttribute('ry', '12');
    shadow.setAttribute('fill', '#000'); shadow.setAttribute('opacity', '.28');
    svg.appendChild(shadow);
    var paths = {};
    faces.forEach(function (f) {
      var p = document.createElementNS(svgNS, 'path');
      p.setAttribute('fill', COL[f]);
      p.setAttribute('stroke', '#9A7A2E');
      p.setAttribute('stroke-width', '1.2');
      p.setAttribute('stroke-linejoin', 'round');
      svg.appendChild(p);
      paths[f] = p;
    });
    fold.appendChild(svg);

    var stepEl = $('[data-fold-step]');
    var trackEl = $('[data-fold-track] i');
    var STEPS = ['ورق تخت', 'خط تا', 'تا شدن', 'جعبه آماده'];

    var draw = function (t) {
      var e = ease(clamp(t, 0, 1));
      faces.forEach(function (f) {
        var d = NET[f].map(function (pt, i) {
          var to = BOX[f][i];
          return (pt[0] + (to[0] - pt[0]) * e).toFixed(1) + ',' + (pt[1] + (to[1] - pt[1]) * e).toFixed(1);
        });
        paths[f].setAttribute('d', 'M' + d.join(' L') + ' Z');
      });
      shadow.setAttribute('rx', (110 - 14 * e).toFixed(1));
      shadow.setAttribute('opacity', (0.10 + 0.20 * e).toFixed(2));
      if (stepEl) stepEl.textContent = STEPS[Math.min(3, Math.floor(clamp(t, 0, 0.999) * 4))];
      if (trackEl) trackEl.style.width = (clamp(t, 0, 1) * 100).toFixed(0) + '%';
    };

    if (REDUCED) {
      draw(1);
    } else {
      draw(0);
      var fTick = false;
      var onF = function () {
        if (fTick) return;
        fTick = true;
        requestAnimationFrame(function () {
          var r = fold.getBoundingClientRect();
          // fully flat when the block enters, fully folded once it is centred
          var span = window.innerHeight * 0.75;
          var t = (window.innerHeight - r.top - window.innerHeight * 0.25) / span;
          draw(t);
          fTick = false;
        });
      };
      window.addEventListener('scroll', onF, { passive: true });
      window.addEventListener('resize', onF);
      onF();
    }
  }

  /* ------------------------------------------------------- ply explorer -- */

  $$('[data-ply]').forEach(function (el) {
    var over = $('.over', el), handle = $('.handle', el);
    if (!over || !handle) return;
    var set = function (pct) {
      pct = clamp(pct, 6, 94);
      // RTL: clip the overlay from the right-hand side
      over.style.clipPath = 'inset(0 0 0 ' + (100 - pct) + '%)';
      handle.style.insetInlineStart = pct + '%';
      el.setAttribute('aria-valuenow', Math.round(pct));
    };
    var from = function (clientX) {
      var r = el.getBoundingClientRect();
      set(((clientX - r.left) / r.width) * 100);
    };
    var dragging = false;
    el.addEventListener('pointerdown', function (e) { dragging = true; el.setPointerCapture(e.pointerId); from(e.clientX); });
    el.addEventListener('pointermove', function (e) { if (dragging) from(e.clientX); });
    el.addEventListener('pointerup', function () { dragging = false; });
    el.addEventListener('pointercancel', function () { dragging = false; });
    el.addEventListener('keydown', function (e) {
      var cur = Number(el.getAttribute('aria-valuenow') || 50);
      if (e.key === 'ArrowLeft') { set(cur - 5); e.preventDefault(); }
      if (e.key === 'ArrowRight') { set(cur + 5); e.preventDefault(); }
    });
    set(50);
  });


  /* ------------------------------------------------------------- auth -- */

  var FAD = '۰۱۲۳۴۵۶۷۸۹';
  function faNum(n) { return String(n).replace(/[0-9]/g, function (d) { return FAD[Number(d)]; }); }
  function toEnDigits(v) {
    return v.replace(/[۰-۹]/g, function (d) { return String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)); })
            .replace(/[٠-٩]/g, function (d) { return String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)); });
  }

  $$('[data-phone]').forEach(function (inp) {
    var err = inp.closest('.field') ? $('[data-phone-err]', inp.closest('.field')) : null;
    inp.addEventListener('input', function () {
      var v = toEnDigits(inp.value).replace(/[^0-9]/g, '').slice(0, 11);
      inp.value = v;
      if (err) {
        var bad = v.length > 0 && !/^09\d{0,9}$/.test(v);
        err.textContent = bad ? 'شماره باید با ۰۹ شروع شود.' : '';
        err.style.color = bad ? '#B4232A' : '';
      }
    });
  });

  // company / individual toggle on the signup form
  var seg = $('[data-seg]');
  if (seg) {
    var coOnly = $('[data-co-only]');
    seg.addEventListener('click', function (e) {
      var b = e.target.closest('[data-acct]');
      if (!b) return;
      $$('[data-acct]', seg).forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on');
      if (coOnly) coOnly.classList.toggle('hide', b.getAttribute('data-acct') !== 'co');
    });
  }

  // two-step login: phone, then the four-digit code
  var step1 = $('[data-step="1"]'), step2 = $('[data-step="2"]');
  if (step1 && step2) {
    var sendBtn = $('[data-send]'), phoneIn = $('[data-phone]', step1);
    var echo = $('[data-phone-echo]'), timer = $('[data-timer]'), resend = $('[data-resend]');
    var dots = $$('[data-dot]'), otp = $('[data-otp]');
    var tick = null;

    var countdown = function () {
      var left = 60;
      if (timer) timer.textContent = '۰۰:' + faNum(left);
      if (resend) resend.disabled = true;
      clearInterval(tick);
      tick = setInterval(function () {
        left--;
        if (timer) timer.textContent = '۰۰:' + faNum(left < 10 ? '0' + left : left);
        if (left <= 0) {
          clearInterval(tick);
          if (resend) resend.disabled = false;
          if (timer) timer.textContent = '';
        }
      }, 1000);
    };

    var show = function (n) {
      step1.classList.toggle('hide', n !== 1);
      step2.classList.toggle('hide', n !== 2);
      dots.forEach(function (d, i) { d.classList.toggle('on', i < n); });
      if (n === 2) {
        countdown();
        var first = otp && otp.querySelector('input');
        if (first) first.focus();
      } else {
        clearInterval(tick);
        if (phoneIn) phoneIn.focus();
      }
    };

    if (sendBtn) sendBtn.addEventListener('click', function () {
      var v = phoneIn ? phoneIn.value : '';
      if (!/^09\d{9}$/.test(v)) {
        var err = phoneIn.closest('.field') ? $('[data-phone-err]', phoneIn.closest('.field')) : null;
        if (err) { err.textContent = 'شماره موبایل ۱۱ رقمی و با ۰۹ وارد شود.'; err.style.color = '#B4232A'; }
        phoneIn.focus();
        return;
      }
      if (echo) echo.textContent = faNum(v);
      show(2);
    });

    if (resend) resend.addEventListener('click', function () { if (!resend.disabled) countdown(); });
    var back = $('[data-back]');
    if (back) back.addEventListener('click', function (e) { e.preventDefault(); show(1); });

    // OTP boxes advance and go back on their own
    if (otp) {
      var boxes = $$('input', otp);
      boxes.forEach(function (b, i) {
        b.addEventListener('input', function () {
          b.value = toEnDigits(b.value).replace(/[^0-9]/g, '').slice(0, 1);
          if (b.value && boxes[i + 1]) boxes[i + 1].focus();
        });
        b.addEventListener('keydown', function (e) {
          if (e.key === 'Backspace' && !b.value && boxes[i - 1]) boxes[i - 1].focus();
        });
        b.addEventListener('paste', function (e) {
          var t = toEnDigits((e.clipboardData || window.clipboardData).getData('text')).replace(/[^0-9]/g, '');
          if (!t) return;
          e.preventDefault();
          boxes.forEach(function (x, k) { x.value = t[k] || ''; });
          (boxes[Math.min(t.length, boxes.length - 1)]).focus();
        });
      });
    }
  }

  /* --------------------------------------------------- box configurator -- */


  var root = $('[data-product]');
  if (!root) return;

  var QTYS = [50, 100, 250, 500];
  var NOTES = ['شروع خرید', 'کسب‌وکار کوچک', 'فروشگاه', 'بهترین قیمت'];

  var SIZES = {
    s: { name: 'کوچک',  prices: [14900, 13600, 12100, 11200], dims: '۲۰×۱۵×۱۰ سانتی‌متر', cap: 'تا ۳ کیلوگرم',  w: 96,  h: 74,  d: 34 },
    m: { name: 'متوسط', prices: [18900, 17300, 15400, 14200], dims: '۳۰×۲۰×۱۵ سانتی‌متر', cap: 'تا ۸ کیلوگرم',  w: 118, h: 88,  d: 44 },
    l: { name: 'بزرگ',  prices: [24500, 22400, 19900, 18300], dims: '۵۰×۴۰×۳۰ سانتی‌متر', cap: 'تا ۲۰ کیلوگرم', w: 140, h: 104, d: 54 }
  };

  var FINISH = {
    kraft: { name: 'کرافت ساده',   top: '#F0E2CD', left: '#E3CDAE', right: '#CBB292', seam: '#B69B78' },
    white: { name: 'سفید',         top: '#FCFCFC', left: '#EFEFEF', right: '#DCDCDC', seam: '#C4C4C4' },
    print: { name: 'چاپ‌دار',       top: '#F0E2CD', left: '#E3CDAE', right: '#CBB292', seam: '#B69B78', band: '#0A1730' },
    lam:   { name: 'لمینتی براق',  top: '#1C3157', left: '#0E1E3C', right: '#081428', seam: '#22355C', band: '#C9A24B' }
  };

  var state = { size: 'm', qty: 100, finish: 'kraft', spin: 0 };

  var $tiers = $('[data-tiers]', root), $sizes = $('[data-sizes]', root);
  var $fin = $('[data-finishes]', root), $stage = $('[data-stage]', root);
  var $dims = $$('[data-dims]', root), $cap = $$('[data-cap]', root);
  var $fname = $$('[data-finish-name]', root), $unit = $$('[data-unit]', root);
  var $qty = $$('[data-qty]', root), $total = $$('[data-total]', root), $save = $$('[data-saving]', root);

  function boxSvg() {
    var f = FINISH[state.finish], s = SIZES[state.size];
    // spin shifts the apparent depth, so dragging reads as turning the box
    var k = Math.cos(state.spin), sk = Math.sin(state.spin);
    var cx = 110, by = 178;
    var w = s.w * (0.72 + 0.28 * Math.abs(k));
    var h = s.h, d = s.d * (0.68 + 0.32 * Math.abs(k));
    var lean = sk * 16;
    var top = by - h;
    var mid = cx + lean;
    var band = f.band
      ? '<rect x="' + (cx - w + 12) + '" y="' + (top + d + h * 0.30) + '" width="' + (w - 22) + '" height="' + (h * 0.19).toFixed(1) + '" fill="' + f.band + '" opacity=".92"/>'
      : '';
    return '<svg viewBox="0 0 220 210" width="100%" height="100%" role="img" aria-label="پیش‌نمایش جعبه">'
      + '<ellipse cx="' + cx + '" cy="' + (by + 12) + '" rx="' + (w + 14).toFixed(1) + '" ry="12" fill="#131A24" opacity=".13"/>'
      + '<path d="M' + (cx - w) + ',' + top + ' L' + mid + ',' + (top + d) + ' L' + mid + ',' + (top + d + h) + ' L' + (cx - w) + ',' + (top + h) + ' Z" fill="' + f.left + '"/>'
      + '<path d="M' + mid + ',' + (top + d) + ' L' + (cx + w) + ',' + top + ' L' + (cx + w) + ',' + (top + h) + ' L' + mid + ',' + (top + d + h) + ' Z" fill="' + f.right + '"/>'
      + '<path d="M' + mid + ',' + (top - d) + ' L' + (cx + w) + ',' + top + ' L' + mid + ',' + (top + d) + ' L' + (cx - w) + ',' + top + ' Z" fill="' + f.top + '"/>'
      + '<path d="M' + mid + ',' + (top - d) + ' L' + mid + ',' + (top + d) + '" stroke="' + f.seam + '" stroke-width="1.3"/>'
      + band + '</svg>';
  }

  function render() {
    var s = SIZES[state.size], prices = s.prices, base = prices[0];
    var i = QTYS.indexOf(state.qty);
    if (i < 0) { i = 1; state.qty = QTYS[1]; }
    var unit = prices[i], saving = Math.round((1 - unit / base) * 100);

    $tiers.innerHTML = QTYS.map(function (q, k) {
      var on = q === state.qty, cut = Math.round((1 - prices[k] / base) * 100);
      return '<button type="button" class="tier' + (on ? ' on' : '') + '" data-tier="' + q + '" aria-pressed="' + on + '">'
        + '<span class="l"><span class="dot" aria-hidden="true"></span>'
        + '<span><span class="q">' + fa(q) + ' عدد</span><span class="n">' + NOTES[k] + '</span></span></span>'
        + '<span style="text-align:left"><span class="u">' + fa(prices[k]) + ' <small>ت/عدد</small></span><br>'
        + '<span class="cut' + (cut > 0 ? '' : ' base') + '">' + (cut > 0 ? fa(cut) + '٪ ارزان‌تر' : 'قیمت پایه') + '</span></span></button>';
    }).join('');

    $$('[data-size]', $sizes).forEach(function (b) {
      var on = b.getAttribute('data-size') === state.size;
      b.classList.toggle('on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    if ($fin) $$('[data-finish]', $fin).forEach(function (b) {
      var on = b.getAttribute('data-finish') === state.finish;
      b.classList.toggle('on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    if ($stage) $stage.innerHTML = '<span class="chip-abs">بکشید تا بچرخد</span>' + boxSvg();
    $dims.forEach(function (e) { e.textContent = s.dims; });
    $cap.forEach(function (e) { e.textContent = s.cap; });
    $fname.forEach(function (e) { e.textContent = FINISH[state.finish].name; });
    $unit.forEach(function (e) { e.textContent = fa(unit); });
    $qty.forEach(function (e) { e.textContent = fa(state.qty) + ' عدد'; });
    $total.forEach(function (e) { e.textContent = fa(unit * state.qty); });
    $save.forEach(function (e) { e.textContent = saving > 0 ? fa(saving) + '٪ ارزان‌تر از تیراژ پایه' : 'قیمت پایه'; });
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

  /* drag the stage to turn the box */
  if ($stage && !REDUCED) {
    var down = false, x0 = 0, s0 = 0;
    $stage.style.touchAction = 'pan-y';
    $stage.addEventListener('pointerdown', function (e) {
      down = true; x0 = e.clientX; s0 = state.spin;
      $stage.setPointerCapture(e.pointerId); $stage.style.cursor = 'grabbing';
    });
    $stage.addEventListener('pointermove', function (e) {
      if (!down) return;
      state.spin = clamp(s0 + (e.clientX - x0) / 150, -0.85, 0.85);
      render();
    });
    var stop = function () { down = false; $stage.style.cursor = 'grab'; };
    $stage.addEventListener('pointerup', stop);
    $stage.addEventListener('pointercancel', stop);
    $stage.style.cursor = 'grab';
  }

  render();
})();
