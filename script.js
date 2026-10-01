(() => {
  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const toast = document.querySelector('[data-toast]');

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(window.__siteToastTimer);
    window.__siteToastTimer = setTimeout(() => toast.classList.remove('show'), 3400);
  };

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('open', !expanded);
      document.body.style.overflow = !expanded ? 'hidden' : '';
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  document.querySelectorAll('[data-pending-link]').forEach((button) => {
    button.addEventListener('click', () => {
      const network = button.dataset.pendingLink || 'Ce réseau';
      showToast(`${network} : lien public à connecter dans la prochaine version.`);
    });
  });

  document.querySelectorAll('[data-contact-form]').forEach((form) => {
    const status = form.querySelector('[data-form-status]');
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const required = [...form.querySelectorAll('[required]')];
      const invalid = required.find((field) => !field.checkValidity());
      if (invalid) {
        invalid.focus();
        if (status) status.textContent = 'Merci de compléter correctement les champs obligatoires.';
        return;
      }

      if (status) status.textContent = 'Formulaire prêt — il reste à connecter ton adresse e-mail de réception.';
      showToast('Message validé. L’envoi réel sera activé dès que tu me donnes l’adresse e-mail.');
    });
  });
})();
