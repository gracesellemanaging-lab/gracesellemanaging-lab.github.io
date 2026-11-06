import { useEffect, useRef, useState, type CSSProperties } from 'react';

type DecorStyle = CSSProperties & {
  '--blob-o'?: string;
  '--blob-dur'?: string;
  '--blob-delay'?: string;
  '--blob-x'?: string;
  '--blob-y'?: string;
  '--ring-o'?: string;
  '--spk-size'?: string;
  '--spk-dur'?: string;
  '--spk-delay'?: string;
};

interface Decor {
  blobs: DecorStyle[];
  rings: DecorStyle[];
  sparkles: DecorStyle[];
}

function randomDecor(): Decor {
  const vw = typeof window === 'undefined' ? 1200 : window.innerWidth;

  const blobs: DecorStyle[] = Array.from({ length: vw < 620 ? 4 : 7 }, () => {
    const size = Math.round(70 + Math.random() * 190);
    return {
      width: size,
      height: size,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      '--blob-o': (0.12 + Math.random() * 0.18).toFixed(2),
      '--blob-dur': `${(16 + Math.random() * 14).toFixed(1)}s`,
      '--blob-delay': `${(Math.random() * -20).toFixed(1)}s`,
      '--blob-x': `${Math.round(-30 + Math.random() * 60)}px`,
      '--blob-y': `${Math.round(-40 + Math.random() * 80)}px`,
    };
  });

  const rings: DecorStyle[] = Array.from({ length: vw < 620 ? 2 : 4 }, () => {
    const size = Math.round(40 + Math.random() * 90);
    return {
      width: size,
      height: size,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      '--ring-o': (0.18 + Math.random() * 0.22).toFixed(2),
      '--blob-dur': `${(18 + Math.random() * 12).toFixed(1)}s`,
      '--blob-delay': `${(Math.random() * -20).toFixed(1)}s`,
    };
  });

  const sparkles: DecorStyle[] = Array.from({ length: vw < 620 ? 24 : 46 }, () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    '--spk-size': `${(2 + Math.random() * 2.5).toFixed(1)}px`,
    '--spk-dur': `${(2.2 + Math.random() * 3).toFixed(1)}s`,
    '--spk-delay': `${(Math.random() * -6).toFixed(1)}s`,
  }));

  return { blobs, rings, sparkles };
}

export function BackgroundDecor() {
  const [decor] = useState<Decor>(randomDecor);

  return (
    <div className="bg-decor" aria-hidden="true">
      {decor.blobs.map((style, index) => (
        <div key={`blob-${index}`} className="bg-decor__blob" style={style} />
      ))}
      {decor.rings.map((style, index) => (
        <div key={`ring-${index}`} className="bg-decor__ring" style={style} />
      ))}
      {decor.sparkles.map((style, index) => (
        <div key={`sparkle-${index}`} className="bg-decor__sparkle" style={style} />
      ))}
    </div>
  );
}

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = ref.current;
    if (!glow || window.matchMedia('(hover: none)').matches) return;

    let x = 0;
    let y = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 3;
    let frame = 0;

    const onMouseMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const follow = () => {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
      frame = requestAnimationFrame(follow);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    follow();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const scrolled = max > 0 ? (doc.scrollTop / max) * 100 : 0;
      if (ref.current) ref.current.style.width = `${scrolled}%`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div ref={ref} className="scroll-progress" />;
}

type Phase = 'visible' | 'hidden' | 'removed';

interface LoaderTiming {
  baseDelay: number;
  maxDelay: number;
}

function getLoaderTiming(): LoaderTiming {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let repeatView = false;
  try {
    repeatView = sessionStorage.getItem('portfolio_splash_seen') === '1';
  } catch {
    repeatView = false;
  }

  return {
    baseDelay: prefersReduced ? 400 : repeatView ? 900 : 1800,
    maxDelay: prefersReduced ? 900 : 3000,
  };
}

export function Loader() {
  const [phase, setPhase] = useState<Phase>('visible');
  const [timing] = useState<LoaderTiming>(getLoaderTiming);

  useEffect(() => {
    const { baseDelay, maxDelay } = timing;
    const start = performance.now();

    document.body.classList.add('is-loading');
    document.documentElement.style.scrollBehavior = 'auto';

    let hidden = false;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    let maxTimer: ReturnType<typeof setTimeout> | undefined;

    const hide = () => {
      if (hidden) return;
      hidden = true;
      setPhase('hidden');
      document.body.classList.remove('is-loading');
      document.documentElement.style.scrollBehavior = '';
      try {
        sessionStorage.setItem('portfolio_splash_seen', '1');
      } catch {
        /* ignore storage failures */
      }
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
    maxTimer = setTimeout(hide, maxDelay);

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) hide();
    };
    window.addEventListener('pageshow', onPageShow);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(maxTimer);
      window.removeEventListener('load', scheduleHide);
      window.removeEventListener('pageshow', onPageShow);
      document.body.classList.remove('is-loading');
      document.documentElement.style.scrollBehavior = '';
    };
  }, [timing]);

  useEffect(() => {
    if (phase !== 'hidden') return;
    const timer = setTimeout(() => setPhase('removed'), 700);
    return () => clearTimeout(timer);
  }, [phase]);

  if (phase === 'removed') return null;

  return (
    <div
      className={`loader${phase === 'hidden' ? ' is-hidden' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      style={{ '--splash-dur': `${timing.baseDelay}ms` } as CSSProperties}
    >
      <div className="splash-logo">
        Grace<span>s</span>elle
      </div>
      <div className="splash-sub">UI/UX Design Portfolio</div>
      <div
        className="splash-bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={100}
      >
        <div className="splash-bar-fill" />
      </div>
    </div>
  );
}
