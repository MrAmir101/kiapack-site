/* Extra page bodies + the creative sections, kept apart so build.mjs stays readable. */

export const ICON_ARROW = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 6l-6 6 6 6"/></svg>`;

/* ---------- The fold section: a flat sheet becoming a box on scroll ------- */

export const FOLD_SECTION = `
  <section class="navy on-navy">
    <div class="wrap section">
      <div class="two-col">
        <div>
          <div class="eyebrow">از ورق تا جعبه</div>
          <h2 style="color:#fff;font-size:29px;line-height:1.42">یک ورق تخت، چهار خط تا،<br>و یک جعبه که می‌ایستد</h2>
          <p style="color:#A9B6CD;margin-top:16px;line-height:2.15">
            هر جعبه‌ای که تولید می‌کنیم از یک ورق تخت شروع می‌شود. جای خط تا، عمق دایکات و
            ترتیب چسب‌خوردن، همان چیزی است که تعیین می‌کند جعبه زیر وزن محصول بایستد یا تا شود.
          </p>
          <ul class="gold-list" style="margin-top:22px">
            <li>قالب اختصاصی برای ابعاد دقیق محصول</li>
            <li>دایکات تمام اتومات، بدون خطای دستی</li>
            <li>جعبه‌چسبانی اتومات برای درز یکنواخت</li>
          </ul>
          <a class="btn btn-gold" href="custom.html" style="margin-top:26px">قالب خودتان را سفارش دهید ${ICON_ARROW}</a>
        </div>
        <div class="fold-wrap">
          <div class="fold-stage" data-fold>
            <span class="fold-step" data-fold-step>ورق تخت</span>
          </div>
          <div class="fold-track" data-fold-track><i></i></div>
          <p style="color:#8B99B4;font-size:12.5px;margin-top:12px">صفحه را پایین بکشید تا ورق تا شود</p>
        </div>
      </div>
    </div>
  </section>
`;

/* ---------- The ply explorer: drag to compare 3-ply and 5-ply ------------- */

function flute(y, amp, step, width, color, sw) {
  let d = `M0,${y}`;
  for (let x = 0; x < width; x += step) {
    d += ` Q${x + step / 4},${y - amp} ${x + step / 2},${y} Q${x + (3 * step) / 4},${y + amp} ${x + step},${y}`;
  }
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${sw}"/>`;
}

const W = 600;
const LINER = '#C9A24B';
const BOARD = '#E3CDAE';

const ply3 = `
<svg viewBox="0 0 ${W} 300" class="base" role="img" aria-label="مقطع ورق سه‌لایه">
  <rect width="${W}" height="300" fill="#F5F6F8"/>
  <rect x="0" y="118" width="${W}" height="9" fill="${BOARD}"/>
  ${flute(150, 22, 46, W, BOARD, 8)}
  <rect x="0" y="173" width="${W}" height="9" fill="${BOARD}"/>
  <text x="${W - 24}" y="104" text-anchor="end" font-family="Vazirmatn,Tahoma" font-size="15" font-weight="700" fill="#47536A">لایه رویه</text>
  <text x="${W - 24}" y="212" text-anchor="end" font-family="Vazirmatn,Tahoma" font-size="15" font-weight="700" fill="#47536A">لایه زیرین</text>
  <text x="24" y="150" font-family="Vazirmatn,Tahoma" font-size="14" font-weight="700" fill="#9A7A2E">کنگره</text>
</svg>`;

const ply5 = `
<svg viewBox="0 0 ${W} 300" role="img" aria-label="مقطع ورق پنج‌لایه">
  <rect width="${W}" height="300" fill="#0E1E3C"/>
  <rect x="0" y="86" width="${W}" height="9" fill="${LINER}"/>
  ${flute(114, 17, 40, W, LINER, 7)}
  <rect x="0" y="136" width="${W}" height="9" fill="${LINER}"/>
  ${flute(166, 19, 46, W, LINER, 7)}
  <rect x="0" y="192" width="${W}" height="9" fill="${LINER}"/>
  <text x="${W - 24}" y="72" text-anchor="end" font-family="Vazirmatn,Tahoma" font-size="15" font-weight="700" fill="#C1CCDF">دو کنگره، سه لایه رویه</text>
  <text x="24" y="228" font-family="Vazirmatn,Tahoma" font-size="14" font-weight="700" fill="#E3C783">مقاومت فشاری بالاتر</text>
</svg>`;

export const PLY_SECTION = `
  <section style="background:var(--paper-2)">
    <div class="wrap section">
      <div class="head rev rev-up">
        <div class="eyebrow">مقایسه کنید</div>
        <h2>سه‌لایه یا پنج‌لایه؟</h2>
        <p>دستگیره را بکشید تا مقطع هر دو ورق را کنار هم ببینید. انتخاب درست، به وزن محصول، ارتفاع چیدمان در انبار و طول مسیر حمل بستگی دارد.</p>
      </div>

      <div class="ply rev rev-scale" data-ply role="slider" tabindex="0"
           aria-label="مقایسه ورق سه‌لایه و پنج‌لایه" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">
        ${ply3}
        <div class="over">${ply5}</div>
        <span class="handle" aria-hidden="true"></span>
        <span class="tag tag-a">سه‌لایه</span>
        <span class="tag tag-b">پنج‌لایه</span>
      </div>

      <div class="cats" style="margin-top:22px">
        <div class="cat rev rev-up">
          <b>سه‌لایه</b>
          <span>محصولات سبک تا متوسط، حمل داخل شهری، چیدمان کم‌ارتفاع در انبار.</span>
        </div>
        <div class="cat rev rev-up d1">
          <b>پنج‌لایه</b>
          <span>وزن بالا، چیدمان مرتفع، مسیر حمل طولانی و صادرات.</span>
        </div>
        <div class="cat rev rev-up d2">
          <b>مقوای لمینتی</b>
          <span>وقتی ظاهر جعبه بخشی از فروش است: ویترین، لوازم خانگی، گیفت باکس.</span>
        </div>
        <div class="cat rev rev-up d3">
          <b>مطمئن نیستید؟</b>
          <span>وزن محصول و ارتفاع چیدمان را بگویید؛ لایه‌بندی درست را پیشنهاد می‌کنیم.</span>
        </div>
      </div>
    </div>
  </section>
`;

/* ---------- The conveyor: product families sliding past ------------------- */

const boxGlyph = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M3 8 12 4l9 4-9 4Z"/><path d="M3 8v8l9 4 9-4V8"/><path d="M12 12v8"/></svg>`;

const CONVEY_ITEMS = [
  'جعبه خودرویی', 'جعبه صنعتی', 'غذایی و صادراتی', 'دارویی و بهداشتی',
  'روشنایی', 'شیرآلات', 'تهویه و سرمایش', 'لوازم خانه و آشپزخانه',
  'کارتن مادر', 'گیفت باکس', 'صحافی', 'کارهای تبلیغاتی'
];

export const CONVEYOR = `
  <div class="navy" style="padding:22px 0">
    <div class="conveyor">
      <div class="conveyor-track">
        ${[0, 1].map(() => CONVEY_ITEMS.map(t =>
          `<span class="conveyor-item">${boxGlyph}${t}</span>`).join('')).join('')}
      </div>
    </div>
  </div>
`;

/* ---------- Timeline for the about page ---------------------------------- */

export const TIMELINE = `
      <div class="timeline">
        <div class="tl-item rev rev-side">
          <span class="yr">۱۳۷۸</span>
          <b>تأسیس کارخانه</b>
          <p>شروع کار در حوزه چاپ و تولید بسته‌بندی مقوایی.</p>
        </div>
        <div class="tl-item rev rev-side d1">
          <span class="yr">دهه ۱۳۸۰</span>
          <b>ورود به بسته‌بندی صنعتی</b>
          <p>تولید جعبه برای قطعه‌سازان خودرو و صنایع، با تیراژ بالا و الزامات ابعادی دقیق.</p>
        </div>
        <div class="tl-item rev rev-side d2">
          <span class="yr">دهه ۱۳۹۰</span>
          <b>خط تولید تمام‌اتومات</b>
          <p>ماشین‌آلات ژاپنی، لمینت و دایکات تمام اتومات و جعبه‌چسبانی خودکار.</p>
        </div>
        <div class="tl-item rev rev-side d3">
          <span class="yr">امروز</span>
          <b>هشت خانواده محصول</b>
          <p>از جعبه خودرویی و دارویی تا سردخانه‌ای و صادراتی، برای گروه‌های صنعتی سراسر کشور.</p>
        </div>
      </div>
`;

/* ---------- Auth pages ---------------------------------------------------- */

export const LOGIN_BODY = `
<main id="main">
  <div class="auth">
    <aside class="auth-art">
      <img src="assets/img/hero-boxes.jpg" alt="" aria-hidden="true">
      <div class="in">
        <h2>حساب کاربری کیاپک</h2>
        <p>سفارش‌ها، استعلام‌ها و فایل‌های طرح شما، یکجا و در دسترس.</p>
        <ul class="pts">
          <li>پیگیری وضعیت تولید سفارش</li>
          <li>تاریخچه استعلام‌ها و قیمت‌های اعلام‌شده</li>
          <li>نگهداری فایل قالب و طرح برای سفارش بعدی</li>
          <li>درخواست فاکتور رسمی</li>
        </ul>
      </div>
    </aside>

    <div class="auth-form">
      <div class="auth-box">
        <div class="step-dots" aria-hidden="true"><i class="on" data-dot="1"></i><i data-dot="2"></i></div>

        <div data-step="1">
          <h1>ورود به حساب</h1>
          <p class="sub">شماره موبایل خود را وارد کنید. کد تأیید پیامک می‌شود.</p>
          <form onsubmit="return false">
            <div class="field tel-field">
              <label for="l-phone">شماره موبایل</label>
              <input id="l-phone" name="phone" type="tel" inputmode="numeric" autocomplete="tel"
                     placeholder="09120000000" maxlength="11" data-phone>
              <span class="note" style="text-align:right;margin-top:0" data-phone-err></span>
            </div>
            <button class="btn btn-navy btn-block" type="submit" data-send>دریافت کد تأیید</button>
          </form>
          <p class="auth-alt">حساب ندارید؟ <a href="signup.html">ثبت‌نام کنید</a></p>
        </div>

        <div data-step="2" class="hide">
          <h2 style="font-size:27px">کد تأیید</h2>
          <p class="sub">کد چهار رقمی پیامک‌شده به <b data-phone-echo>—</b> را وارد کنید.</p>
          <form onsubmit="return false">
            <div class="otp" data-otp>
              <input type="text" inputmode="numeric" maxlength="1" aria-label="رقم اول">
              <input type="text" inputmode="numeric" maxlength="1" aria-label="رقم دوم">
              <input type="text" inputmode="numeric" maxlength="1" aria-label="رقم سوم">
              <input type="text" inputmode="numeric" maxlength="1" aria-label="رقم چهارم">
            </div>
            <div class="otp-meta">
              <button type="button" data-resend disabled>ارسال مجدد کد</button>
              <span data-timer>۰۰:۶۰</span>
            </div>
            <button class="btn btn-gold btn-block" type="submit" style="margin-top:18px">ورود</button>
          </form>
          <p class="auth-alt"><a href="#" data-back>ویرایش شماره موبایل</a></p>
        </div>
      </div>
    </div>
  </div>
</main>
`;

export const SIGNUP_BODY = `
<main id="main">
  <div class="auth">
    <aside class="auth-art">
      <img src="assets/img/machinery.jpg" alt="" aria-hidden="true">
      <div class="in">
        <h2>ثبت‌نام در کیاپک</h2>
        <p>یک بار مشخصات را ثبت کنید؛ استعلام‌های بعدی در چند ثانیه ارسال می‌شود.</p>
        <ul class="pts">
          <li>استعلام سریع بدون پر کردن دوبارهٔ مشخصات</li>
          <li>ثبت فایل قالب و طرح روی حساب شما</li>
          <li>سابقهٔ سفارش‌ها برای تکرار تیراژ</li>
          <li>فاکتور رسمی برای خریدهای سازمانی</li>
        </ul>
      </div>
    </aside>

    <div class="auth-form">
      <div class="auth-box">
        <h1>ساخت حساب</h1>
        <p class="sub">برای شروع، نوع حساب را انتخاب کنید.</p>

        <div class="seg" role="group" aria-label="نوع حساب" data-seg style="margin-top:22px">
          <button type="button" class="on" data-acct="co">شرکتی</button>
          <button type="button" data-acct="ind">شخصی</button>
        </div>

        <form onsubmit="return false">
          <div class="field">
            <label for="s-name">نام و نام خانوادگی</label>
            <input id="s-name" name="name" type="text" autocomplete="name" placeholder="مثلاً علی رضایی">
          </div>

          <div data-co-only>
            <div class="field">
              <label for="s-co">نام شرکت</label>
              <input id="s-co" name="company" type="text" autocomplete="organization" placeholder="مثلاً گروه صنعتی نمونه">
            </div>
            <div class="field">
              <label for="s-eco">کد اقتصادی <span style="font-weight:400;color:var(--muted)">(اختیاری)</span></label>
              <input id="s-eco" name="eco" type="text" inputmode="numeric" placeholder="برای صدور فاکتور رسمی">
            </div>
          </div>

          <div class="field tel-field">
            <label for="s-phone">شماره موبایل</label>
            <input id="s-phone" name="phone" type="tel" inputmode="numeric" autocomplete="tel"
                   placeholder="09120000000" maxlength="11" data-phone>
            <span class="note" style="text-align:right;margin-top:0" data-phone-err></span>
          </div>

          <label class="consent">
            <input type="checkbox" checked>
            <span><a href="#">قوانین و شرایط استفاده</a> را می‌پذیرم و با دریافت پیامک اطلاع‌رسانی موافقم.</span>
          </label>

          <button class="btn btn-navy btn-block" type="submit" style="margin-top:20px">ادامه و دریافت کد تأیید</button>
        </form>

        <p class="auth-alt">حساب دارید؟ <a href="login.html">وارد شوید</a></p>
      </div>
    </div>
  </div>
</main>
`;


/* ---------- Cart page ------------------------------------------------------ */

export const CART_BODY = `
<main id="main" data-cart-page>
  <div class="wrap">
    <nav class="crumb" aria-label="مسیر"><a href="index.html">خانه</a> / <b>سبد خرید</b></nav>
    <div class="phead">
      <h1>سبد خرید</h1>
      <p>تعداد هر قلم مضربی از ۵۰ عدد است. برای تیراژ بالا و چاپ اختصاصی، <a href="custom.html">استعلام قیمت</a> بگیرید.</p>
    </div>
  </div>

  <div class="wrap" style="padding-bottom:56px">
    <div class="cart-cols">
      <div class="cart-list" data-cart-list></div>
      <div data-cart-summary></div>
    </div>
  </div>
</main>
`;
