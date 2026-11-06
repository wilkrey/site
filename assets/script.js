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
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
    if (open) {
      var first = nav.querySelector('.nav__link');
      if (first) first.focus({ preventScroll: true });
    } else if (focusInside) {
      burger.focus({ preventScroll: true });
    }
  }

  if (burger && nav) {
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

  /* ---------- Магнитные кнопки и блик на курсоре (только мышь) ---------- */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll('.btn').forEach(function (btn) {
      btn.addEventListener('pointermove', function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left;
        var y = e.clientY - r.top;
        btn.style.setProperty('--mx', x + 'px');
        btn.style.setProperty('--my', y + 'px');
        var dx = (e.clientX - (r.left + r.width / 2)) * 0.12;
        var dy = (e.clientY - (r.top + r.height / 2)) * 0.2;
        btn.style.transform = 'translate3d(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px,0)';
      });
      btn.addEventListener('pointerleave', function () {
        btn.style.transform = '';
      });
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

  var MSG = {
    required: {
      name: 'Please enter your name.',
      email: 'Please enter your email address.',
      emailInvalid: 'Please enter a valid email address, for example name@example.com.',
      projectType: 'Please choose a project type.',
      description: 'Please describe your project.',
      descriptionLong: 'Please keep the description under ' + MAX_DESCRIPTION + ' characters.'
    },
    notConfigured: 'This form is not active yet. Please write to hello.wilkrey@gmail.com instead.',
    network: 'We could not reach the server. Check your connection and try again. Your details are still filled in.',
    rateLimit: 'Too many requests right now. Please wait a few minutes and try again.',
    service: 'Your request was not sent. Please try again in a moment. Your details are still filled in.'
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
  var order = ['name', 'email', 'project_type', 'description'];

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
    submitLabel.textContent = on ? 'Sending…' : 'Send request';
    statusEl.textContent = on ? 'Sending your request…' : '';
  }

  function showAlert(message) {
    alertEl.textContent = message;
    alertEl.hidden = false;
    alertEl.focus();
  }

  function clearAlert() {
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
    if (botcheck && botcheck.checked) data.botcheck = true;
    return data;
  }

  function onSuccess() {
    sending = false;
    submitBtn.disabled = false;
    submitLabel.textContent = 'Send request';
    form.setAttribute('aria-busy', 'false');
    statusEl.textContent = '';
    clearAlert();
    form.hidden = true;
    successEl.hidden = false;
    successEl.focus();
  }

  function onFailure(message) {
    setBusy(false);
    statusEl.textContent = '';
    showAlert(message);
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
          onFailure(MSG.rateLimit);
        } else {
          onFailure(MSG.service);
        }
      })
      .catch(function () {
        clearTimeout(timer);
        onFailure(MSG.network);
      });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (sending) return;
    clearAlert();
    if (!validateAll()) return;
    if (!isConfigured()) {
      showAlert(MSG.notConfigured);
      return;
    }
    send();
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
