/* animation.js — shared GSAP behaviours across all pages */
document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  /* Preloader */
  window.addEventListener('load', () => {
    const pre = document.getElementById('preloader');
    if (pre) setTimeout(() => pre.classList.add('done'), 500);
  });

  /* Generic scroll reveals */
  gsap.utils.toArray('.reveal-up').forEach((el) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });
  gsap.utils.toArray('.reveal-left').forEach((el) => {
    gsap.to(el, {
      opacity: 1, x: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });
  gsap.utils.toArray('.reveal-right').forEach((el) => {
    gsap.to(el, {
      opacity: 1, x: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });

  /* Staggered card groups */
  gsap.utils.toArray('.stagger-group').forEach((group) => {
    const items = group.querySelectorAll('.stagger-item');
    gsap.set(items, { opacity: 0, y: 40 });
    gsap.to(items, {
      opacity: 1, y: 0, duration: .8, stagger: .12, ease: 'power3.out',
      scrollTrigger: { trigger: group, start: 'top 85%' }
    });
  });

  /* Hero text reveal (per-line masked) */
  gsap.utils.toArray('.hero-reveal-line').forEach((line, i) => {
    gsap.from(line, {
      yPercent: 110, duration: 1.1, ease: 'power4.out', delay: .3 + i * .15
    });
  });
  gsap.utils.toArray('.hero-fade').forEach((el, i) => {
    gsap.from(el, { opacity: 0, y: 20, duration: 1, delay: .8 + i * .15, ease: 'power2.out' });
  });

  /* Counters */
  gsap.utils.toArray('.counter').forEach((el) => {
    const target = +el.dataset.count;
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target, duration: 2, ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.floor(obj.val).toLocaleString(); }
        });
      }
    });
  });

  /* Section tags / dim-lines fade */
  gsap.utils.toArray('.section-fade').forEach((el) => {
    gsap.from(el, {
      opacity: 0, y: 16, duration: .8, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 92%' }
    });
  });
});