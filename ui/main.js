(function () {
  const body = document.body;
  const toggle = document.querySelector('.nav-toggle');
  const panel = document.querySelector('.nav-panel');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (toggle && panel) {
    toggle.addEventListener('click', () => {
      const open = body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-copy');
      const el = document.getElementById(id);
      if (!el) return;
      const text = el.textContent.trim();
      try {
        await navigator.clipboard.writeText(text);
        const prev = btn.textContent;
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = prev;
          btn.classList.remove('copied');
        }, 2000);
      } catch {
        btn.textContent = 'Failed';
        setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
      }
    });
  });

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const SECTION_ORDER = ['top', 'overview', 'start', 'apply', 'sample', 'citations', 'tracked'];
  const navSectionLinks = document.querySelectorAll('.nav-links a[data-section]');
  const siteHeader = document.querySelector('.site-header');

  function setActiveSection(id) {
    navSectionLinks.forEach((link) => {
      const active = link.dataset.section === id;
      link.classList.toggle('is-active', active);
      link.toggleAttribute('aria-current', active ? 'page' : false);
    });
  }

  let scrollTicking = false;
  function updateActiveSection() {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      const headerOffset = (siteHeader?.offsetHeight ?? 60) + 40;
      const y = window.scrollY + headerOffset;
      let current = SECTION_ORDER[0];
      for (const id of SECTION_ORDER) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActiveSection(current);
      siteHeader?.classList.toggle('is-scrolled', window.scrollY > 6);
      scrollTicking = false;
    });
  }

  window.addEventListener('scroll', updateActiveSection, { passive: true });
  window.addEventListener('resize', updateActiveSection, { passive: true });
  updateActiveSection();

  if (!prefersReduced && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    document.querySelectorAll('.reveal:not(.hero .reveal)').forEach((el) => {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
  }
})();
