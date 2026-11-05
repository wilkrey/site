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

  function setMenu(open) {
    if (!burger || !nav) return;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      setMenu(burger.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
  }

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
