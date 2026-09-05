/* main.js — global site behaviour used on every page */
document.addEventListener('DOMContentLoaded', () => {

  /* Sticky header background on scroll */
  const header = document.getElementById('site-header');
  const onScroll = () => {
    if (window.scrollY > 60) header.classList.add('scrolled');
    else header.classList.remove('scrolled');

    /* Back to top progress */
    const btt = document.getElementById('back-to-top');
    const circle = btt ? btt.querySelector('circle') : null;
    if (btt) {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const pct = height > 0 ? scrolled / height : 0;
      if (circle) circle.style.strokeDashoffset = 145 - (145 * pct);
      btt.classList.toggle('show', scrolled > 400);
    }
  };
  document.addEventListener('scroll', onScroll);
  onScroll();

  /* Back to top click */
  const btt = document.getElementById('back-to-top');
  if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* Mobile menu toggle */
  const menuBtn = document.getElementById('menu-toggle');
  const closeBtn = document.getElementById('menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
  }
  if (closeBtn && mobileMenu) {
    closeBtn.addEventListener('click', () => mobileMenu.classList.remove('open'));
  }
  document.querySelectorAll('#mobile-menu a:not([id])').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  /* Active nav highlight based on current page */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === path) link.classList.add('active');
  });

  /* Smooth-scroll for on-page anchor links */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          window.scrollTo({ top: target.offsetTop - 90, behavior: 'smooth' });
        }
      }
    });
  });

  /* ===== DESKTOP PRODUCTS DROPDOWN ===== */
  const dropdownBtn = document.getElementById('productsDropdownBtn');
  const dropdownMenu = document.getElementById('productsDropdownMenu');
  
  if (dropdownBtn && dropdownMenu) {
    dropdownBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const isOpen = dropdownMenu.classList.contains('visible');
      dropdownMenu.classList.toggle('opacity-0');
      dropdownMenu.classList.toggle('invisible');
      dropdownMenu.classList.toggle('opacity-100');
      dropdownMenu.classList.toggle('visible');
      
      const arrow = dropdownBtn.querySelector('svg');
      if (arrow) {
        arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
      }
    });

    document.addEventListener('click', (e) => {
      if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.add('opacity-0', 'invisible');
        dropdownMenu.classList.remove('opacity-100', 'visible');
        const arrow = dropdownBtn.querySelector('svg');
        if (arrow) {
          arrow.style.transform = 'rotate(0deg)';
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dropdownMenu.classList.contains('visible')) {
        dropdownMenu.classList.remove('opacity-100', 'visible');
        dropdownMenu.classList.add('opacity-0', 'invisible');
        const arrow = dropdownBtn.querySelector('svg');
        if (arrow) {
          arrow.style.transform = 'rotate(0deg)';
        }
      }
    });
  }

  /* ===== MOBILE PRODUCTS DROPDOWN ===== */
  const mobileProductsBtn = document.getElementById('mobileProductsBtn');
  const mobileProductsMenu = document.getElementById('mobileProductsMenu');
  
  if (mobileProductsBtn && mobileProductsMenu) {
    mobileProductsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const isOpen = mobileProductsMenu.style.maxHeight !== '0px' && mobileProductsMenu.style.maxHeight !== '';
      mobileProductsMenu.style.maxHeight = isOpen ? '0' : '300px';
      
      const arrow = mobileProductsBtn.querySelector('svg');
      if (arrow) {
        arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
      }
    });
  }
});