import { useEffect, useRef, useState } from 'react';
import { stats } from '../data';

function Counter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timer: ReturnType<typeof setInterval> | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          let current = 0;
          const step = Math.max(1, Math.ceil(target / 60));
          timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            setValue(current);
          }, 25);
          observer.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, [target]);

  return (
    <span ref={ref} className="stat__num">
      {value}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="stats">
      <div className="container stats__grid">
        {stats.map((stat) => (
          <div className="stat" data-reveal data-reveal-delay={stat.delay} key={stat.label}>
            {typeof stat.count === 'number' ? (
              <Counter target={stat.count} />
            ) : (
              <span className="stat__num">{stat.text}</span>
            )}
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
