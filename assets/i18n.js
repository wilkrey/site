/* WILKREY® — переклади UA / EN і перемикач мови (одна компактна кнопка з прапором, без меню).

   Як це працює:
   - data-i18n="ключ" — елемент отримує обидві мовні версії тексту (див. buildStacks);
   - data-i18n-attr="атрибут:ключ" — переклад потрапляє в атрибут (aria-label, title, placeholder);
   - словник DICT — єдине місце з текстами. Він статичний, без введення користувача,
     тому переклади вставляються через innerHTML (потрібні <br>, &nbsp;, <span class="accent">).

   Чому обидві версії тексту є в DOM одночасно:
   Коли мови мають різну довжину, заміна тексту змінює висоту й ширину блоків, і вся сторінка
   під ними зсувається. Тому кожен переклад стоїть в одній комірці grid: видима версія показується,
   невидима (visibility: hidden) займає місце. Розмір блоку = більша з двох версій, тож при
   перемиканні геометрія не змінюється. Перемикання — це лише зміна прозорості тексту.

   Мова: збережений вибір (localStorage) → інакше мова браузера (en → EN, решта → UA).
   Скрипт підключений синхронно в кінці <body>, до script.js, тож англійський текст
   застосовується під час розбору сторінки і без мерехтіння. */
(function () {
  'use strict';

  var STORE_KEY = 'wk-lang';
  var LANGS = ['uk', 'en'];

  var DICT = {
    uk: {
      'a11y.skip': 'Перейти до основного вмісту',
      'a11y.logo': 'WILKREY, на головну',
      'a11y.mainNav': 'Головна навігація',
      'a11y.footerNav': 'Навігація у футері',
      'a11y.contacts': 'Контакти WILKREY',
      'a11y.newtab': ' (відкриється в новій вкладці)',
      'a11y.required': ' (обов’язкове)',

      'nav.work': 'Роботи',
      'nav.studio': 'Студія',
      'nav.services': 'Послуги',
      'nav.process': 'Процес',
      'nav.contact': 'Контакти',
      'nav.open': 'Відкрити меню',
      'nav.close': 'Закрити меню',
      'cta.order': 'Замовити сайт',

      'lang.toEnglish': 'Перемкнути на англійську',
      'lang.toUkrainian': 'Перемкнути на українську',

      'hero.tag': 'Цифрова студія&nbsp;/&nbsp;Дизайн&nbsp;·&nbsp;Розробка&nbsp;·&nbsp;Моушн',
      'hero.headline': 'Цифрові враження,<br>створені з точністю.',
      'hero.text': 'Ми створюємо сучасні цифрові продукти, що поєднують дизайн, технології та увагу до деталей.',
      'hero.cta': 'Переглянути роботи',
      'hero.scroll': 'Прокрутіть',

      'work.kicker': '01 — Обрані роботи',
      'work.title': 'Обрані концептуальні роботи.',
      'work.note': 'Незалежні концептуальні проєкти: ініціативні роботи WILKREY, створені для пошуку візуального напряму. Це не комерційні замовлення.',
      'work.view': 'Переглянути концепт',
      'work.noir.frame': 'Попередній перегляд концептуального сайту NOIR Café',
      'work.noir.kicker': 'Незалежний концептуальний проєкт · Спешелті-кавʼярня',
      'work.noir.text': 'Концептуальний сайт для преміальної спешелті-кавʼярні. Темна палітра, велика типографіка та повільний ритм прокрутки задають настрій місця.',
      'work.fleure.frame': 'Попередній перегляд концептуального сайту FLEURÉ',
      'work.fleure.kicker': 'Незалежний концептуальний проєкт · Квіткова студія',
      'work.fleure.text': 'Концептуальний сайт для сучасної квіткової студії. М’яка композиція, відкрита сітка та спокійні переходи допомагають обрати букет без зайвих відволікань.',

      'studio.kicker': '02 — Студія',
      'studio.statement': 'Ми віримо, що чудові цифрові враження <span class="accent">створюються навмисно.</span>',
      'studio.p1.h': 'Дизайн із метою',
      'studio.p1.t': 'Кожен екран починається з одного питання: яке завдання він вирішує?',
      'studio.p2.h': 'Увага до деталей',
      'studio.p2.t': 'Типографіка, ритм відступів і стани елементів перевіряються до найдрібніших деталей.',
      'studio.p3.h': 'Технології, що служать людям',
      'studio.p3.t': 'Інструменти обираються під завдання, а не під тренди.',
      'studio.p4.h': 'Швидкість і зручність',
      'studio.p4.t': 'Швидке завантаження та зрозуміла навігація важливіші за додаткові ефекти.',

      'svc.kicker': '03 — Послуги',
      'svc.title': 'Чотири напрями роботи.',
      'svc.1.h': 'Дизайн сайтів',
      'svc.1.t': 'Концепція, композиція сторінок і візуальна система, побудовані навколо бізнес-цілей.',
      'svc.2.h': 'Frontend-розробка',
      'svc.2.t': 'Чистий HTML, CSS і JavaScript без зайвих залежностей, із увагою до швидкості.',
      'svc.3.h': 'UI/UX-дизайн',
      'svc.3.t': 'Користувацькі сценарії, стани інтерфейсу та прототипи, які перевіряються до розробки.',
      'svc.4.h': 'Адаптивні цифрові рішення',
      'svc.4.t': 'Повноцінні композиції для мобільних, планшетів і десктопів, а не зменшені копії.',

      'process.kicker': '04 — Процес',
      'process.title': 'Від ідеї до запуску.',
      'step.1.h': 'Дослідження',
      'step.1.t': 'Цілі, аудиторія та вимоги. Ми точно визначаємо, що має робити сайт.',
      'step.2.h': 'Дизайн',
      'step.2.t': 'Композиція, типографіка та палітра. Візуальна мова узгоджується до початку коду.',
      'step.3.h': 'Розробка',
      'step.3.t': 'Побудова, анімації та адаптивна поведінка, перевірені на реальних пристроях.',
      'step.4.h': 'Запуск',
      'step.4.t': 'Публікація, перевірка посилань і продуктивності та передача вихідних файлів.',

      'contact.kicker': '05 — Контакти',
      'contact.title': 'Маєте задум?',
      'contact.lead': 'Перетворімо вашу ідею на щось значуще.',
      'contact.email': 'Email',
      'contact.telegram': 'Telegram',

      'order.kicker': '06 — Замовити сайт',
      'order.title': 'Створімо щось виняткове.',
      'order.lead': 'Коротко розкажіть про свій проєкт. Ми розглянемо заявку й відповімо на email.',
      'order.name.label': 'Імʼя',
      'order.name.ph': 'Наприклад, Оксана Коваль',
      'order.opt': 'необов’язково',
      'order.tg.hint': 'Вкажіть, якщо вам зручніше спілкуватися в Telegram',
      'order.company.label': 'Бізнес / компанія',
      'order.company.ph': 'Назва компанії або бренду',
      'order.type.legend': 'Тип проєкту',
      'order.type.1': 'Лендінг / сайт для бізнесу',
      'order.type.2': 'Інтернет-магазин',
      'order.type.3': 'Веб-застосунок / цифровий продукт',
      'order.type.4': 'UI/UX-дизайн',
      'order.type.5': 'Доопрацювання наявного сайту',
      'order.type.6': 'Інше',
      'order.desc.label': 'Опис проєкту',
      'order.desc.ph': 'Розкажіть про цілі сайту, аудиторію, бажані розділи й терміни',
      'order.budget.legend': 'Орієнтовний бюджет',
      'order.budget.1': 'До 3 000 грн',
      'order.budget.2': '3 000–5 000 грн',
      'order.budget.3': '5 000–10 000 грн',
      'order.budget.4': '10 000–20 000 грн',
      'order.budget.5': 'Понад 20 000 грн',
      'order.budget.6': 'Поки не визначився',
      'order.hp': 'Залиште це поле порожнім',
      'order.submit': 'Надіслати заявку',
      'order.sent.kicker': 'Заявку отримано',
      'order.sent.title': 'Дякуємо.',
      'order.sent.text': 'Деталі вашого проєкту отримано. Ми розглянемо їх і відповімо на email.',
      'order.again': 'Надіслати ще одну заявку',

      'form.sending': 'Надсилаємо…',
      'form.sendingStatus': 'Надсилаємо заявку…',
      'err.name': 'Будь ласка, введіть імʼя.',
      'err.email': 'Будь ласка, введіть email.',
      'err.emailInvalid': 'Будь ласка, введіть коректний email, наприклад name@example.com.',
      'err.tg': 'Вкажіть username Telegram: від 5 до 32 символів, латиниця, цифри та «_», наприклад @wilkrey.',
      'err.project': 'Будь ласка, оберіть тип проєкту.',
      'err.desc': 'Будь ласка, опишіть проєкт.',
      'err.descLong': 'Будь ласка, скоротіть опис до {n} символів.',
      'err.notConfigured': 'Форма ще не активна. Будь ласка, напишіть на hello.wilkrey@gmail.com.',
      'err.network': 'Не вдалося звʼязатися з сервером. Перевірте інтернет-з’єднання і спробуйте ще раз. Введені дані збережено.',
      'err.rateLimit': 'Забагато запитів поспіль. Будь ласка, зачекайте кілька хвилин і спробуйте знову.',
      'err.service': 'Заявку не надіслано. Спробуйте ще раз трохи пізніше. Введені дані збережено.',

      'footer.rights': 'WILKREY®. Усі права захищено.',

      'meta.title': 'WILKREY® — цифрова студія | Цифрові враження, створені з точністю',
      'meta.description': 'WILKREY® — преміальна цифрова студія. Дизайн сайтів, frontend-розробка, UI/UX і адаптивні цифрові продукти. Незалежні концептуальні проєкти: NOIR Café, FLEURÉ.',
      'meta.ogTitle': 'WILKREY® — цифрова студія',
      'meta.ogDesc': 'Цифрові враження, створені з точністю.',
      'meta.ogImageAlt': 'WILKREY® — цифрова студія. Цифрові враження, створені з точністю.'
    },

    en: {
      'a11y.skip': 'Skip to main content',
      'a11y.logo': 'WILKREY, home',
      'a11y.mainNav': 'Main navigation',
      'a11y.footerNav': 'Footer navigation',
      'a11y.contacts': 'WILKREY contacts',
      'a11y.newtab': ' (opens in a new tab)',
      'a11y.required': ' (required)',

      'nav.work': 'Work',
      'nav.studio': 'Studio',
      'nav.services': 'Services',
      'nav.process': 'Process',
      'nav.contact': 'Contact',
      'nav.open': 'Open menu',
      'nav.close': 'Close menu',
      'cta.order': 'Order a website',

      'lang.toEnglish': 'Switch to English',
      'lang.toUkrainian': 'Switch to Ukrainian',

      'hero.tag': 'Digital studio&nbsp;/&nbsp;Design&nbsp;·&nbsp;Development&nbsp;·&nbsp;Motion',
      'hero.headline': 'Digital impressions,<br>crafted with precision.',
      'hero.text': 'We create modern digital products that combine design, technology and attention to detail.',
      'hero.cta': 'View our work',
      'hero.scroll': 'Scroll',

      'work.kicker': '01 — Selected work',
      'work.title': 'Selected concept work.',
      'work.note': 'Independent concept projects: self-initiated WILKREY work created to explore a visual direction. These are not commercial commissions.',
      'work.view': 'View concept',
      'work.noir.frame': 'Preview of the NOIR Café concept website',
      'work.noir.kicker': 'Independent concept project · Specialty coffee shop',
      'work.noir.text': 'A concept website for a premium specialty coffee shop. A dark palette, large typography and a slow scroll rhythm set the mood of the place.',
      'work.fleure.frame': 'Preview of the FLEURÉ concept website',
      'work.fleure.kicker': 'Independent concept project · Flower studio',
      'work.fleure.text': 'A concept website for a modern flower studio. Soft composition, an open grid and calm transitions help you choose a bouquet without distractions.',

      'studio.kicker': '02 — Studio',
      'studio.statement': 'We believe remarkable digital experiences <span class="accent">are created deliberately.</span>',
      'studio.p1.h': 'Design with purpose',
      'studio.p1.t': 'Every screen starts with one question: what task does it solve?',
      'studio.p2.h': 'Attention to detail',
      'studio.p2.t': 'Typography, spacing rhythm and element states are checked down to the smallest detail.',
      'studio.p3.h': 'Technology that serves people',
      'studio.p3.t': 'Tools are chosen for the task, not for trends.',
      'studio.p4.h': 'Speed and usability',
      'studio.p4.t': 'Fast loading and clear navigation matter more than extra effects.',

      'svc.kicker': '03 — Services',
      'svc.title': 'Four areas of work.',
      'svc.1.h': 'Website design',
      'svc.1.t': 'Concept, page composition and a visual system built around business goals.',
      'svc.2.h': 'Frontend development',
      'svc.2.t': 'Clean HTML, CSS and JavaScript without unnecessary dependencies, with a focus on speed.',
      'svc.3.h': 'UI/UX design',
      'svc.3.t': 'User flows, interface states and prototypes, tested before development.',
      'svc.4.h': 'Responsive digital solutions',
      'svc.4.t': 'Fully designed layouts for mobile, tablet and desktop, not scaled-down copies.',

      'process.kicker': '04 — Process',
      'process.title': 'From idea to launch.',
      'step.1.h': 'Discovery',
      'step.1.t': 'Goals, audience and requirements. We define precisely what the site must do.',
      'step.2.h': 'Design',
      'step.2.t': 'Composition, typography and palette. The visual language is agreed before any code is written.',
      'step.3.h': 'Development',
      'step.3.t': 'Build, animations and responsive behavior, tested on real devices.',
      'step.4.h': 'Launch',
      'step.4.t': 'Publishing, checking links and performance, and handing over the source files.',

      'contact.kicker': '05 — Contact',
      'contact.title': 'Have an idea?',
      'contact.lead': 'Let’s turn your idea into something meaningful.',
      'contact.email': 'Email',
      'contact.telegram': 'Telegram',

      'order.kicker': '06 — Order a website',
      'order.title': 'Let’s create something exceptional.',
      'order.lead': 'Briefly tell us about your project. We’ll review your request and reply by email.',
      'order.name.label': 'Name',
      'order.name.ph': 'For example, Jane Smith',
      'order.opt': 'optional',
      'order.tg.hint': 'Add it if you prefer to chat on Telegram',
      'order.company.label': 'Business / company',
      'order.company.ph': 'Company or brand name',
      'order.type.legend': 'Project type',
      'order.type.1': 'Landing page / business website',
      'order.type.2': 'Online store',
      'order.type.3': 'Web application / digital product',
      'order.type.4': 'UI/UX design',
      'order.type.5': 'Improving an existing website',
      'order.type.6': 'Other',
      'order.desc.label': 'Project description',
      'order.desc.ph': 'Tell us about the site goals, audience, desired sections and deadlines',
      'order.budget.legend': 'Approximate budget',
      'order.budget.1': 'Up to 3,000 UAH',
      'order.budget.2': '3,000–5,000 UAH',
      'order.budget.3': '5,000–10,000 UAH',
      'order.budget.4': '10,000–20,000 UAH',
      'order.budget.5': 'Over 20,000 UAH',
      'order.budget.6': 'Not sure yet',
      'order.hp': 'Leave this field empty',
      'order.submit': 'Send request',
      'order.sent.kicker': 'Request received',
      'order.sent.title': 'Thank you.',
      'order.sent.text': 'We’ve received your project details. We’ll review them and reply by email.',
      'order.again': 'Send another request',

      'form.sending': 'Sending…',
      'form.sendingStatus': 'Sending your request…',
      'err.name': 'Please enter your name.',
      'err.email': 'Please enter your email.',
      'err.emailInvalid': 'Please enter a valid email, for example name@example.com.',
      'err.tg': 'Enter a Telegram username: 5 to 32 characters, Latin letters, digits and “_”, for example @wilkrey.',
      'err.project': 'Please choose a project type.',
      'err.desc': 'Please describe your project.',
      'err.descLong': 'Please shorten the description to {n} characters.',
      'err.notConfigured': 'The form is not active yet. Please write to hello.wilkrey@gmail.com.',
      'err.network': 'Could not reach the server. Check your internet connection and try again. Your details have been kept.',
      'err.rateLimit': 'Too many requests in a row. Please wait a few minutes and try again.',
      'err.service': 'The request was not sent. Please try again a little later. Your details have been kept.',

      'footer.rights': 'WILKREY®. All rights reserved.',

      'meta.title': 'WILKREY® — digital studio | Digital impressions, crafted with precision',
      'meta.description': 'WILKREY® — premium digital studio. Website design, frontend development, UI/UX and responsive digital products. Independent concept projects: NOIR Café, FLEURÉ.',
      'meta.ogTitle': 'WILKREY® — digital studio',
      'meta.ogDesc': 'Digital impressions, crafted with precision.',
      'meta.ogImageAlt': 'WILKREY® — digital studio. Digital impressions, crafted with precision.'
    }
  };

  var META_TAGS = [
    ['meta[name="description"]', 'content', 'meta.description'],
    ['meta[property="og:title"]', 'content', 'meta.ogTitle'],
    ['meta[property="og:description"]', 'content', 'meta.ogDesc'],
    ['meta[property="og:image:alt"]', 'content', 'meta.ogImageAlt'],
    ['meta[name="twitter:title"]', 'content', 'meta.ogTitle'],
    ['meta[name="twitter:description"]', 'content', 'meta.ogDesc']
  ];

  var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var canAnimate = typeof Element !== 'undefined' && typeof Element.prototype.animate === 'function';

  /* Анімація тільки прозорості й розмиття тексту. Ні translate, ні transform, ні зміни розміру:
     контейнери, секції й решта сторінки стоять на місці. */
  var OUT = [
    { opacity: 1, filter: 'blur(0px)' },
    { opacity: 0, filter: 'blur(2px)' }
  ];
  var IN = [
    { opacity: 0, filter: 'blur(3px)' },
    { opacity: 1, filter: 'blur(0px)' }
  ];
  var EASE_OUT = 'cubic-bezier(.2,.7,.1,1)';

  function readStored() {
    try {
      var v = window.localStorage.getItem(STORE_KEY);
      return LANGS.indexOf(v) !== -1 ? v : null;
    } catch (e) {
      return null;
    }
  }

  function writeStored(lang) {
    try {
      window.localStorage.setItem(STORE_KEY, lang);
    } catch (e) {
      /* Приватний режим: вибір діє до перезавантаження сторінки */
    }
  }

  function detectBrowserLang() {
    var list = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || ''];
    return /^en(-|$)/i.test(list[0] || '') ? 'en' : 'uk';
  }

  var current = readStored() || detectBrowserLang();
  var seq = 0;
  var running = [];

  function t(key) {
    var d = DICT[current];
    if (d && d[key] != null) return d[key];
    return DICT.uk[key] != null ? DICT.uk[key] : key;
  }
  window.wkT = t;

  /* HTML для динамічного тексту (кнопки, повідомлення): обидві мовні версії, видима — поточна.
     Використовується в script.js, щоб тексти, які вставляються скриптом, не ламали розмітку. */
  function stackHTML(key) {
    var uk = DICT.uk[key] != null ? DICT.uk[key] : key;
    var en = DICT.en[key] != null ? DICT.en[key] : key;
    return '<bdi class="i18n-stack"><bdi class="i18n-l" lang="uk">' + uk +
      '</bdi><bdi class="i18n-l" lang="en">' + en + '</bdi></bdi>';
  }
  window.wkStack = stackHTML;

  /* Один раз при завантаженні: кожен [data-i18n] отримує обидві версії в одній комірці grid */
  function buildStacks() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (DICT.uk[key] == null || DICT.en[key] == null) return;
      el.innerHTML = stackHTML(key);
    });
  }

  /* Атрибути, <title>, meta і мова документа. Видимість текстів задає CSS за html[lang]. */
  function applyPage(lang) {
    var d = DICT[lang];

    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var i = pair.indexOf(':');
        if (i < 1) return;
        var attr = pair.slice(0, i).trim();
        var v = d[pair.slice(i + 1).trim()];
        if (v != null) el.setAttribute(attr, v);
      });
    });

    document.documentElement.setAttribute('lang', lang);
    document.title = d['meta.title'];
    META_TAGS.forEach(function (m) {
      var el = document.querySelector(m[0]);
      if (el && d[m[2]] != null) el.setAttribute(m[1], d[m[2]]);
    });
    var locale = document.querySelector('meta[property="og:locale"]');
    if (locale) locale.setAttribute('content', lang === 'en' ? 'en_US' : 'uk_UA');
  }

  function syncButton() {
    var btn = document.getElementById('lang-switch');
    if (!btn) return;
    var label = t(current === 'uk' ? 'lang.toEnglish' : 'lang.toUkrainian');
    btn.setAttribute('aria-label', label);
    btn.setAttribute('title', label);
  }

  /* Прапор поточної мови. Атрибут hidden ставимо через toggleAttribute: свойство .hidden
     є не в усіх браузерах для SVG-елементів, тому присвоєння .hidden могло не спрацювати. */
  function syncFlag() {
    document.querySelectorAll('#lang-flag svg').forEach(function (svg) {
      svg.toggleAttribute('hidden', svg.getAttribute('data-lang') !== current);
    });
  }

  function flipFlag() {
    var wrap = document.getElementById('lang-flag');
    if (!wrap || reduceMotion || !canAnimate) {
      syncFlag();
      return;
    }
    var out = wrap.animate(
      [{ transform: 'rotateY(0deg)', opacity: 1 }, { transform: 'rotateY(90deg)', opacity: 0 }],
      { duration: 140, easing: 'ease-in' }
    );
    out.onfinish = function () {
      syncFlag();
      wrap.animate(
        [{ transform: 'rotateY(-90deg)', opacity: 0 }, { transform: 'rotateY(0deg)', opacity: 1 }],
        { duration: 260, easing: EASE_OUT }
      );
    };
  }

  function childOf(stack, lang) {
    return stack.querySelector('.i18n-l[lang="' + lang + '"]');
  }

  /* Видимі в окні блоки тексту. Анімуємо тільки їх; решта змінюється миттєво, без анімації. */
  function visibleStacks() {
    var h = window.innerHeight || document.documentElement.clientHeight;
    return Array.prototype.filter.call(document.querySelectorAll('.i18n-stack'), function (el) {
      var r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < h;
    });
  }

  function cancelRunning() {
    running.forEach(function (a) {
      try { a.cancel(); } catch (e) { /* уже завершена */ }
    });
    running = [];
  }

  function dispatchChange() {
    document.dispatchEvent(new CustomEvent('wk:langchange', { detail: { lang: current } }));
  }

  /* Перехід: поточний текст гасне → миттєве перемикання видимості → новий текст проявляється
     блоками зі стаггером. Геометрія не змінюється, бо обидві версії вже займають місце. */
  function setLanguage(lang) {
    if (lang === current) return;
    var prev = current;
    current = lang;
    writeStored(lang);
    syncButton();

    var my = ++seq;
    cancelRunning();

    var stacks = (reduceMotion || !canAnimate) ? [] : visibleStacks();
    if (!stacks.length) {
      applyPage(lang);
      dispatchChange();
      return;
    }

    var outs = stacks.map(function (s) {
      return childOf(s, prev).animate(OUT, { duration: 160, easing: 'ease-in', fill: 'forwards' });
    });
    running = outs;

    Promise.all(outs.map(function (a) { return a.finished; })).then(function () {
      if (my !== seq) return;
      /* Усе в одному завданні, між кроками немає кадру: мерехтіння не буде */
      var ins = stacks.map(function (s, i) {
        return childOf(s, lang).animate(IN, {
          duration: 460,
          delay: Math.min(i * 35, 320),
          easing: EASE_OUT,
          fill: 'backwards'
        });
      });
      applyPage(lang);
      outs.forEach(function (a) { a.cancel(); });
      running = ins;
      dispatchChange();
    }).catch(function () {
      /* Скасований перехід: нова дія вже веде анімацію */
    });
  }

  function init() {
    buildStacks();
    applyPage(current);
    syncButton();
    syncFlag();

    var btn = document.getElementById('lang-switch');
    if (!btn) return;
    btn.addEventListener('click', function () {
      setLanguage(current === 'uk' ? 'en' : 'uk');
      flipFlag();
    });
  }

  init();
})();
