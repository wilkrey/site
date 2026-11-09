/* WILKREY® — интерактив без библиотек.
   Все эффекты уважают prefers-reduced-motion. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;

  /* ---------- Год в футере ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Шапка: состояние при прокрутке ---------- */
  var header = document.getElementById('header');
  var ticking = false;

  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 24);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  /* ---------- Мобильное меню ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  function isMenuOpen() {
    return !!burger && burger.getAttribute('aria-expanded') === 'true';
  }

  /* Open: focus moves to the first link, otherwise keyboard users cannot reach the menu.
     Close: if focus was inside the menu, return it to the burger, because a hidden
     element cannot keep focus. */
  function setMenu(open) {
    if (!burger || !nav) return;
    var focusInside = nav.contains(document.activeElement);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', window.wkT(open ? 'nav.close' : 'nav.open'));
    nav.classList.toggle('is-open', open);
    if (open) {
      var first = nav.querySelector('.nav__link');
      if (first) first.focus({ preventScroll: true });
    } else if (focusInside) {
      burger.focus({ preventScroll: true });
    }
  }

  if (burger && nav) {
    /* После смены языка подпись кнопки меню должна соответствовать состоянию меню */
    document.addEventListener('wk:langchange', function () {
      burger.setAttribute('aria-label', window.wkT(isMenuOpen() ? 'nav.close' : 'nav.open'));
    });

    burger.addEventListener('click', function () {
      setMenu(!isMenuOpen());
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isMenuOpen()) setMenu(false);
    });

    /* Moving to the desktop layout closes the panel (the header menu is always visible there) */
    var desktopQuery = window.matchMedia('(min-width: 961px)');
    var onLayoutChange = function (e) { if (e.matches) setMenu(false); };
    if (desktopQuery.addEventListener) desktopQuery.addEventListener('change', onLayoutChange);
    else desktopQuery.addListener(onLayoutChange);
  }

  /* In-page links: browsers clear focus on hash navigation when the target is not focusable,
     so focus is moved to the target section after the jump (keyboard and screen reader users stay in place). */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var id = link.getAttribute('href').slice(1);
    var target = id && document.getElementById(id);
    if (!target) return;
    setTimeout(function () {
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }, 0);
  });

  /* ---------- Подсветка активного раздела в навигации ---------- */
  var navLinks = document.querySelectorAll('.nav__link');
  var sectionIds = ['work', 'studio', 'services', 'process', 'contact'];

  if ('IntersectionObserver' in window && navLinks.length) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sectionIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });
  }

  /* ---------- Reveal при появлении в области просмотра ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  function staggerSiblings(parent) {
    /* Элементы одной группы появляются каскадом, а не все сразу */
    var kids = Array.prototype.filter.call(parent.children, function (c) {
      return c.classList.contains('reveal');
    });
    kids.forEach(function (kid, i) {
      kid.style.setProperty('--delay', (i * 0.09).toFixed(2) + 's');
    });
  }
  document.querySelectorAll('.principles, .svc-list, .steps').forEach(staggerSiblings);

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Ленивая загрузка живых превью кейсов ---------- */
  var frames = document.querySelectorAll('iframe[data-src]');

  function loadFrame(iframe) {
    if (iframe.dataset.loaded) return;
    iframe.src = iframe.dataset.src;
    iframe.dataset.loaded = 'true';
  }

  if ('IntersectionObserver' in window) {
    var frameObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        loadFrame(entry.target);
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '200px 0px' });
    frames.forEach(function (f) { frameObserver.observe(f); });
  } else {
    frames.forEach(loadFrame);
  }

  /* ---------- Процесс: линия заполняется по мере прокрутки ---------- */
  var track = document.getElementById('track');
  if (track) {
    if ('IntersectionObserver' in window && !reduceMotion) {
      var trackObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          track.classList.add('is-filled');
          obs.unobserve(track);
        });
      }, { threshold: 0.3 });
      trackObserver.observe(track);
    } else {
      track.classList.add('is-filled');
    }
  }

  /* ---------- Hero: линза откликается на курсор ---------- */
  var obj = document.getElementById('obj');
  var hero = document.getElementById('top');

  if (obj && hero && finePointer && !reduceMotion) {
    var maxTilt = 9;
    var raf = null;
    var target = { x: 0, y: 0 };

    hero.addEventListener('pointermove', function (e) {
      var rect = hero.getBoundingClientRect();
      var nx = (e.clientX - rect.left) / rect.width - 0.5;
      var ny = (e.clientY - rect.top) / rect.height - 0.5;
      target.x = nx;
      target.y = ny;
      if (!raf) raf = requestAnimationFrame(applyTilt);
    });

    hero.addEventListener('pointerleave', function () {
      target.x = 0;
      target.y = 0;
      if (!raf) raf = requestAnimationFrame(applyTilt);
    });

    function applyTilt() {
      obj.style.setProperty('--ry', (target.x * maxTilt).toFixed(2) + 'deg');
      obj.style.setProperty('--rx', (-target.y * maxTilt).toFixed(2) + 'deg');
      raf = null;
    }
  }

  /* ---------- Магнитные кнопки и блик на курсоре (только мышь) ----------
     Смещение пишется в свойство translate (не в transform) и сглаживается одним циклом
     requestAnimationFrame на кнопку. Цель меняется при каждом движении, поэтому выход и
     повторный вход курсора продолжают текущий путь, а не запускают новый переход. */
  if (finePointer && !reduceMotion) {
    var EASE = 0.18;      /* доля пути за кадр: чем больше, тем быстрее догоняет курсор */
    var SETTLE = 0.05;    /* порог, после которого считаем, что кнопка пришла на место */

    document.querySelectorAll('.btn').forEach(function (btn) {
      var cur = { x: 0, y: 0 };
      var goal = { x: 0, y: 0 };
      var raf = 0;

      function apply() {
        btn.style.translate = cur.x.toFixed(2) + 'px ' + cur.y.toFixed(2) + 'px';
      }

      function tick() {
        cur.x += (goal.x - cur.x) * EASE;
        cur.y += (goal.y - cur.y) * EASE;
        var settled = Math.abs(goal.x - cur.x) < SETTLE && Math.abs(goal.y - cur.y) < SETTLE;
        if (settled) { cur.x = goal.x; cur.y = goal.y; }
        apply();
        if (settled) {
          raf = 0;
          if (goal.x === 0 && goal.y === 0) btn.style.translate = '';
          return;
        }
        raf = requestAnimationFrame(tick);
      }

      function aim(x, y) {
        goal.x = x;
        goal.y = y;
        if (!raf) raf = requestAnimationFrame(tick);
      }

      btn.addEventListener('pointermove', function (e) {
        var r = btn.getBoundingClientRect();
        /* Centre without the current offset, so the button does not chase its own movement */
        var cx = r.left + r.width / 2 - cur.x;
        var cy = r.top + r.height / 2 - cur.y;
        btn.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        btn.style.setProperty('--my', (e.clientY - r.top) + 'px');
        aim((e.clientX - cx) * 0.12, (e.clientY - cy) * 0.2);
      });

      btn.addEventListener('pointerleave', function () { aim(0, 0); });
      btn.addEventListener('pointercancel', function () { aim(0, 0); });
    });
  }
})();

/* ---------- Форма заказа сайта (Web3Forms) ----------
   Успех показывается только после ответа сервиса с success: true.
   Без него (сеть, таймаут, ошибка сервиса, незаполненный ключ) — честное сообщение об ошибке. */
(function () {
  'use strict';

  var ENDPOINT = 'https://api.web3forms.com/submit';
  var PLACEHOLDER_KEY = 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY';
  var TIMEOUT_MS = 15000;
  var MAX_DESCRIPTION = 2000;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  var form = document.getElementById('order-form');
  if (!form) return;

  var submitBtn = document.getElementById('order-submit');
  var submitLabel = document.getElementById('order-submit-label');
  var statusEl = document.getElementById('order-status');
  var alertEl = document.getElementById('order-alert');
  var successEl = document.getElementById('order-success');
  var againBtn = document.getElementById('order-again');
  var accessInput = document.getElementById('order-access-key');
  var botcheck = form.querySelector('input[name="botcheck"]');
  var descInput = document.getElementById('order-description');
  var descLen = document.getElementById('order-description-len');

  var sending = false;
  /* Ключ текста видимой ошибки отправки: нужен, чтобы перевести её при смене языка */
  var alertKey = null;

  /* Тексты берутся из словаря при каждом обращении: после смены языка сообщения сразу на новом языке */
  var MSG = {
    required: {
      get name() { return window.wkT('err.name'); },
      get email() { return window.wkT('err.email'); },
      get emailInvalid() { return window.wkT('err.emailInvalid'); },
      get telegramInvalid() { return window.wkT('err.tg'); },
      get projectType() { return window.wkT('err.project'); },
      get description() { return window.wkT('err.desc'); },
      get descriptionLong() { return window.wkT('err.descLong').replace('{n}', String(MAX_DESCRIPTION)); }
    }
  };

  /* ---------- Счётчик описания ---------- */
  function updateCount() {
    if (descLen && descInput) descLen.textContent = String(descInput.value.length);
  }
  if (descInput) descInput.addEventListener('input', updateCount);
  updateCount();

  /* ---------- Валидация ---------- */
  function fieldInput(id) { return document.getElementById(id); }

  function radioInputs(name) {
    return Array.prototype.slice.call(form.querySelectorAll('input[name="' + name + '"]'));
  }

  /* Telegram username: optional; accepts '@name' and 'name'. Links and phone numbers are not accepted. */
  var TG_RE = /^@?[A-Za-z][A-Za-z0-9_]{3,30}[A-Za-z0-9]$/;

  var fields = {
    name: {
      target: function () { return [fieldInput('order-name')]; },
      error: 'order-name-err',
      check: function () {
        return fieldInput('order-name').value.trim() ? '' : MSG.required.name;
      }
    },
    email: {
      target: function () { return [fieldInput('order-email')]; },
      error: 'order-email-err',
      check: function () {
        var v = fieldInput('order-email').value.trim();
        if (!v) return MSG.required.email;
        if (!EMAIL_RE.test(v) || v.length > 254) return MSG.required.emailInvalid;
        return '';
      }
    },
    telegram: {
      target: function () { return [fieldInput('order-telegram')]; },
      error: 'order-telegram-err',
      check: function () {
        var v = fieldInput('order-telegram').value.trim();
        if (!v) return '';
        return TG_RE.test(v) ? '' : MSG.required.telegramInvalid;
      }
    },
    project_type: {
      target: function () { return radioInputs('project_type'); },
      error: 'order-project-err',
      check: function () {
        var checked = form.querySelector('input[name="project_type"]:checked');
        return checked ? '' : MSG.required.projectType;
      }
    },
    description: {
      target: function () { return [descInput]; },
      error: 'order-description-err',
      check: function () {
        var v = descInput.value.trim();
        if (!v) return MSG.required.description;
        if (v.length > MAX_DESCRIPTION) return MSG.required.descriptionLong;
        return '';
      }
    }
  };
  var order = ['name', 'email', 'telegram', 'project_type', 'description'];

  function applyField(key) {
    var f = fields[key];
    var msg = f.check();
    var errEl = document.getElementById(f.error);
    var targets = f.target();
    if (errEl) {
      errEl.textContent = msg;
      errEl.hidden = !msg;
    }
    targets.forEach(function (t) {
      if (msg) t.setAttribute('aria-invalid', 'true');
      else t.removeAttribute('aria-invalid');
    });
    return !msg;
  }

  /* Live update: once a field has been checked, keep its message in sync while typing */
  order.forEach(function (key) {
    var f = fields[key];
    f.target().forEach(function (t) {
      var evt = (t.type === 'radio') ? 'change' : 'input';
      t.addEventListener(evt, function () {
        var errEl = document.getElementById(f.error);
        if (errEl && !errEl.hidden) applyField(key);
      });
    });
  });

  function validateAll() {
    var firstBad = null;
    order.forEach(function (key) {
      if (!applyField(key) && !firstBad) firstBad = fields[key].target()[0];
    });
    if (firstBad) firstBad.focus();
    return !firstBad;
  }

  /* ---------- Состояния ---------- */
  function setBusy(on) {
    sending = on;
    submitBtn.disabled = on;
    form.setAttribute('aria-busy', on ? 'true' : 'false');
    /* wkStack: обидві мовні версії, видима — поточна; розмір кнопки не змінюється при перемиканні мови */
    submitLabel.innerHTML = window.wkStack(on ? 'form.sending' : 'order.submit');
    statusEl.innerHTML = on ? window.wkStack('form.sendingStatus') : '';
  }

  /* key — ключ словника; текст у двох мовах, видимий — поточний */
  function showAlert(key) {
    alertKey = key;
    alertEl.innerHTML = window.wkStack(key);
    alertEl.hidden = false;
    alertEl.focus();
  }

  function clearAlert() {
    alertKey = null;
    alertEl.textContent = '';
    alertEl.hidden = true;
  }

  function isConfigured() {
    var key = accessInput ? accessInput.value.trim() : '';
    return key !== '' && key !== PLACEHOLDER_KEY;
  }

  function collect() {
    var data = {};
    new FormData(form).forEach(function (value, key) {
      if (key === 'botcheck') return;
      data[key] = typeof value === 'string' ? value.trim() : value;
    });
    /* Telegram is optional: an empty value is not sent at all; a non-empty one is sent
       as a separate field in the form '@username'. */
    if (data.telegram === '') {
      delete data.telegram;
    } else if (typeof data.telegram === 'string') {
      data.telegram = '@' + data.telegram.replace(/^@/, '');
    }
    if (botcheck && botcheck.checked) data.botcheck = true;
    return data;
  }

  function onSuccess() {
    sending = false;
    submitBtn.disabled = false;
    submitLabel.innerHTML = window.wkStack('order.submit');
    form.setAttribute('aria-busy', 'false');
    statusEl.textContent = '';
    clearAlert();
    form.hidden = true;
    successEl.hidden = false;
    successEl.focus();
  }

  function onFailure(key) {
    setBusy(false);
    statusEl.textContent = '';
    showAlert(key);
  }

  /* ---------- Отправка ---------- */
  function send() {
    setBusy(true);
    clearAlert();

    var controller = (typeof AbortController !== 'undefined') ? new AbortController() : null;
    var timer = setTimeout(function () { if (controller) controller.abort(); }, TIMEOUT_MS);

    var options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(collect())
    };
    if (controller) options.signal = controller.signal;

    fetch(ENDPOINT, options)
      .then(function (res) {
        return res.text().then(function (text) {
          var json = null;
          try { json = JSON.parse(text); } catch (err) { json = null; }
          return { res: res, json: json };
        });
      })
      .then(function (r) {
        clearTimeout(timer);
        if (r.res.ok && r.json && r.json.success === true) {
          onSuccess();
        } else if (r.res.status === 429) {
          onFailure('err.rateLimit');
        } else {
          onFailure('err.service');
        }
      })
      .catch(function () {
        clearTimeout(timer);
        onFailure('err.network');
      });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (sending) return;
    clearAlert();
    if (!validateAll()) return;
    if (!isConfigured()) {
      showAlert('err.notConfigured');
      return;
    }
    send();
  });

  /* ---------- Смена языка: открытые тексты ошибок полей переводятся на новый язык ----------
     Кнопка, статус и общее сообщение об ошибке переключаются сами (см. wkStack в i18n.js). */
  document.addEventListener('wk:langchange', function () {
    order.forEach(function (key) {
      var errEl = document.getElementById(fields[key].error);
      if (errEl && !errEl.hidden) applyField(key);
    });
  });

  /* ---------- Отправить ещё одну заявку ---------- */
  if (againBtn) {
    againBtn.addEventListener('click', function () {
      form.reset();
      updateCount();
      order.forEach(function (key) {
        var f = fields[key];
        var errEl = document.getElementById(f.error);
        if (errEl) { errEl.textContent = ''; errEl.hidden = true; }
        f.target().forEach(function (t) { t.removeAttribute('aria-invalid'); });
      });
      clearAlert();
      successEl.hidden = true;
      form.hidden = false;
      document.getElementById('order-name').focus();
    });
  }
})();


/* ---------- Кастомный курсор (только точный указатель, без reduced-motion) ----------
   Небольшой шарик следует за мышью с плавным догоняющим движением, увеличивается над
   интерактивными элементами и сжимается при нажатии. Над полями ввода, iframe и вне окна
   возвращается системный курсор. Элемент не принимает события мыши. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;
  var canHover = window.matchMedia('(hover: hover)').matches;
  if (reduceMotion || !finePointer || !canHover) return;

  var root = document.documentElement;
  var dot = document.createElement('div');
  dot.className = 'cursor';
  dot.setAttribute('aria-hidden', 'true');
  document.body.appendChild(dot);
  root.classList.add('has-cursor');

  var INTERACTIVE = 'a[href], button:not([disabled]), label, summary, [role="button"]';
  var NATIVE = 'input, textarea, select, [contenteditable="true"]';

  var goal = { x: -100, y: -100 };
  var pos = { x: -100, y: -100 };
  var raf = 0;
  var shown = false;
  var placed = false;
  var overNative = false;

  function frame() {
    pos.x += (goal.x - pos.x) * 0.24;
    pos.y += (goal.y - pos.y) * 0.24;
    dot.style.translate = pos.x.toFixed(2) + 'px ' + pos.y.toFixed(2) + 'px';
    if (Math.abs(goal.x - pos.x) > 0.05 || Math.abs(goal.y - pos.y) > 0.05) {
      raf = requestAnimationFrame(frame);
    } else {
      raf = 0;
    }
  }

  function kick() {
    if (!raf) raf = requestAnimationFrame(frame);
  }

  function setNative(on) {
    overNative = on;
    root.classList.toggle('cursor-native', on);
    dot.classList.toggle('is-hidden', on);
  }

  function updateState(target) {
    if (!target || !target.closest) return;
    var native = target.closest(NATIVE);
    setNative(!!native);
    if (native) { dot.classList.remove('is-hover'); return; }
    dot.classList.toggle('is-hover', !!target.closest(INTERACTIVE));
  }

  document.addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
    goal.x = e.clientX;
    goal.y = e.clientY;
    if (!placed) {
      /* First appearance only: place the dot under the pointer without flying in from the corner */
      pos.x = goal.x;
      pos.y = goal.y;
      placed = true;
    }
    if (!shown) {
      shown = true;
      dot.classList.add('is-on');
    }
    updateState(e.target);
    kick();
  }, { passive: true });

  document.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'mouse' || e.pointerType === 'pen') dot.classList.add('is-down');
  }, { passive: true });
  document.addEventListener('pointerup', function () { dot.classList.remove('is-down'); }, { passive: true });
  document.addEventListener('pointercancel', function () { dot.classList.remove('is-down'); }, { passive: true });

  /* Pointer left the browser window: hide the dot and restore the system cursor */
  document.addEventListener('mouseout', function (e) {
    if (!e.relatedTarget && !e.toElement) {
      /* Hide only. Keep the position, so returning does not teleport the dot. */
      shown = false;
      dot.classList.remove('is-on', 'is-hover', 'is-down');
      setNative(false);
    }
  });

  /* Embedded previews (iframes) receive their own pointer events: show the system cursor there */
  document.querySelectorAll('iframe').forEach(function (frameEl) {
    frameEl.addEventListener('mouseenter', function () { setNative(true); dot.classList.remove('is-hover'); });
    frameEl.addEventListener('mouseleave', function () { setNative(false); });
  });
})();

/* ---------- Иллюстрации карточек услуг: параллакс от курсора ----------
   Курсор внутри карточки смещает слои иллюстрации (--px / --py в диапазоне -1..1).
   Значения сглаживаются одним циклом requestAnimationFrame на карточку и возвращаются
   к нулю при уходе курсора. Только точный указатель и без reduced-motion. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;
  if (reduceMotion || !finePointer) return;

  var EASE = 0.1;
  var SETTLE = 0.002;

  document.querySelectorAll('.svc').forEach(function (card) {
    if (!card.querySelector('.svc__art')) return;

    var cur = { x: 0, y: 0 };
    var goal = { x: 0, y: 0 };
    var raf = 0;

    function apply() {
      card.style.setProperty('--px', cur.x.toFixed(4));
      card.style.setProperty('--py', cur.y.toFixed(4));
    }

    function tick() {
      cur.x += (goal.x - cur.x) * EASE;
      cur.y += (goal.y - cur.y) * EASE;
      var settled = Math.abs(goal.x - cur.x) < SETTLE && Math.abs(goal.y - cur.y) < SETTLE;
      if (settled) { cur.x = goal.x; cur.y = goal.y; }
      apply();
      if (settled) {
        raf = 0;
        if (goal.x === 0 && goal.y === 0) card.style.removeProperty('--px'), card.style.removeProperty('--py');
        return;
      }
      raf = requestAnimationFrame(tick);
    }

    function aim(x, y) {
      goal.x = x;
      goal.y = y;
      if (!raf) raf = requestAnimationFrame(tick);
    }

    card.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      var r = card.getBoundingClientRect();
      var nx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
      var ny = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
      aim(nx, ny);
    });

    card.addEventListener('pointerleave', function () { aim(0, 0); });
  });
})();

/* ---------- Переход курсора между карточками услуг ----------
   Один акцент скользит по строкам вслед за курсором. Только точный указатель и без reduced-motion. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;
  if (reduceMotion || !finePointer) return;

  var list = document.querySelector('.svc-list');
  if (!list) return;

  var glide = document.createElement('li');
  glide.className = 'svc-glide';
  glide.setAttribute('aria-hidden', 'true');
  list.appendChild(glide);
  list.classList.add('has-glide');

  var active = null;

  function place(card) {
    glide.style.setProperty('--gy', card.offsetTop + 'px');
    glide.style.setProperty('--gh', card.offsetHeight + 'px');
  }

  list.querySelectorAll('.svc').forEach(function (card) {
    card.addEventListener('pointerenter', function (e) {
      if (e.pointerType !== 'mouse') return;
      active = card;
      place(card);
      glide.classList.add('is-on');
    });
  });

  list.addEventListener('pointerleave', function () {
    active = null;
    glide.classList.remove('is-on');
  });

  window.addEventListener('resize', function () { if (active) place(active); });
})();

/* ---------- Появление карточек услуг: строка открывается, когда до неё доходит прокрутка ----------
   Карточки полностью обрезаны до открытия (clip-path), а браузер не считает обрезанный элемент видимым,
   поэтому наблюдаем за самим списком и открываем карточки по очереди (задержки заданы через --delay). */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var list = document.querySelector('.svc-list');
  if (!list) return;
  var cards = list.querySelectorAll('.svc.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    cards.forEach(function (c) { c.classList.add('is-visible'); });
    return;
  }
  var obs = new IntersectionObserver(function (entries, o) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      cards.forEach(function (c) { c.classList.add('is-visible'); });
      o.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  obs.observe(list);
})();
