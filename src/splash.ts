export function initSplash() {
  const loader = document.getElementById('splash');
  if (!loader) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let repeatView = false;
  try {
    repeatView = sessionStorage.getItem('portfolio_splash_seen') === '1';
  } catch {
    repeatView = false;
  }

  const baseDelay = prefersReduced ? 400 : repeatView ? 900 : 1800;
  const maxDelay = prefersReduced ? 900 : 3000;
  const start = performance.now();

  document.body.classList.add('is-loading');
  document.documentElement.style.scrollBehavior = 'auto';

  let hidden = false;
  let hideTimer: ReturnType<typeof setTimeout> | undefined;

  const hide = () => {
    if (hidden) return;
    hidden = true;
    loader.classList.add('is-hidden');
    loader.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-loading');
    document.documentElement.style.scrollBehavior = '';
    try {
      sessionStorage.setItem('portfolio_splash_seen', '1');
    } catch {
      /* ignore storage failures */
    }
    setTimeout(() => loader.remove(), 700);
  };

  const scheduleHide = () => {
    const elapsed = performance.now() - start;
    hideTimer = setTimeout(hide, Math.max(0, baseDelay - elapsed + 80));
  };

  if (document.readyState === 'complete') {
    scheduleHide();
  } else {
    window.addEventListener('load', scheduleHide, { once: true });
  }
  setTimeout(hide, maxDelay);

  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      clearTimeout(hideTimer);
      hide();
    }
  });
}
