(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // Year
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  // Header state (passive scroll, one rAF per frame)
  const header = $("#header");
  let scheduled = false;
  const onScroll = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Scroll reveal, lazy iframe loading and process track: all via IntersectionObserver
  if ("IntersectionObserver" in window && !reduceMotion) {
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-visible");
        reveal.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    $$(".reveal, .step").forEach((el) => reveal.observe(el));

    const track = $("#track");
    if (track) {
      const tio = new IntersectionObserver((entries, o) => {
        entries.forEach((e) => { if (e.isIntersecting) { track.classList.add("is-active"); o.disconnect(); } });
      }, { threshold: 0.35 });
      tio.observe(track);
    }
  } else {
    $$(".reveal, .step").forEach((el) => el.classList.add("is-visible"));
    const track = $("#track");
    if (track) track.classList.add("is-active");
  }

  // Previews: load the real demo sites only when they come near the viewport
  const frames = $$("iframe[data-src]");
  const loadFrame = (f) => { if (!f.src) f.src = f.dataset.src; };
  if ("IntersectionObserver" in window) {
    const fio = new IntersectionObserver((entries, o) => {
      entries.forEach((e) => { if (e.isIntersecting) { loadFrame(e.target); o.unobserve(e.target); } });
    }, { rootMargin: "200px 0px" });
    frames.forEach((f) => fio.observe(f));
  } else {
    frames.forEach(loadFrame);
  }

  // Mobile menu
  const burger = $("#burger");
  const nav = $("#nav");
  const setMenu = (open) => {
    if (!burger || !nav) return;
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
    nav.classList.toggle("is-open", open);
    if (header) header.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  if (burger) burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  if (nav) $$("a", nav).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  window.matchMedia("(min-width: 961px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });

  // Hero object: gentle pointer response. rAF runs only while the value is still moving.
  const obj = $(".obj");
  if (obj && finePointer && !reduceMotion) {
    const target = { x: 0, y: 0 }, current = { x: 0, y: 0 };
    let running = false;
    const frame = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      obj.style.setProperty("--rx", `${(-14 + current.y).toFixed(2)}deg`);
      obj.style.setProperty("--ry", `${(28 + current.x).toFixed(2)}deg`);
      if (Math.abs(target.x - current.x) > 0.01 || Math.abs(target.y - current.y) > 0.01) {
        requestAnimationFrame(frame);
      } else {
        running = false;
      }
    };
    const kick = () => { if (!running) { running = true; requestAnimationFrame(frame); } };
    const hero = $("#top");
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 10;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * -8;
      kick();
    }, { passive: true });
    hero.addEventListener("pointerleave", () => { target.x = 0; target.y = 0; kick(); });
  }
})();
